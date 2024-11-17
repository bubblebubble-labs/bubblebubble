'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useChatStore } from '../store/chatStore';
import { StreamStatus } from '../types/streamStatus';
import { Chat } from '../types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Toaster, toast } from "react-hot-toast";
import "../styles/Chat.css";
import { colors } from '../styles/colors'
import { useSurveyStore } from '../store/surveyStore';

const isLogAvailable = false;

const TTS_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
};

const VOICE_CHARACTERS = {
  FLORA: {
    speaker: 'nara',
    volume: 0,
    speed: -1,
    pitch: 1,
    emotion: 2,
    emotionStrength: 2,
    alpha: 1,
    endPitch: 1
  },
  TIMO: {
    speaker: 'ndonghyun',
    volume: 0,
    speed: 0,
    pitch: -1,
    emotion: 0,
    emotionStrength: 1,
    alpha: -1,
    endPitch: -1
  }
};

const ChatClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const summary = searchParams?.get('summary');
  const { 
    chatList, 
    setChatList, 
    chatStage, 
    setChatStage, 
    inputText, 
    setInputText 
  } = useChatStore();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [thumbsUpClicked, setThumbsUpClicked] = useState<{ [key: number]: boolean }>({});
  const [thumbsDownClicked, setThumbsDownClicked] = useState<{ [key: number]: boolean }>({});
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [lastEnterPress, setLastEnterPress] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { currentQuestion, answers, setAnswer, nextQuestion, prevQuestion } = useSurveyStore()


  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  useEffect(() => {
    if (summary) {
      setChatList([{ role: 'assistant', content: summary, character: 'timo' }]);
    }
  }, [summary, setChatList]);

  useEffect(() => {
    // chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSend = async (text?: string) => {
    const messageToSend = text || inputText;
    if (messageToSend.trim() === '' || chatStage !== StreamStatus.IDLE) return;
    setChatStage(StreamStatus.INPUTSUBMITTED);
    const newUserChat: Chat = { content: messageToSend, role: 'user', character: 'flora' };
    setChatList((prevList: Chat[]) => [...prevList, newUserChat]);
    setTimeout(() => {
      setInputText('');
      resetTextareaHeight();
    }, 100);

    try {
      // First request to v7
      abortControllerRef.current = new AbortController();
      let response = await fetch('http://211.188.55.96:8080/api/v7/chat/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...chatList,
            newUserChat
          ]
        }),
        signal: abortControllerRef.current.signal,
      });

      setChatStage(StreamStatus.ISRESPONSEFETCHED);

      // Process v7 response stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let v7Response = '';
      let v6Response = '';
      let isChatFetching = false;
      let logData = [];

      while (true) {
        const { done, value } = await reader?.read() || {};
        if (done) break;
        if (!isChatFetching) {
          isChatFetching = true;
          setChatStage(StreamStatus.ISFETCHING);
          setChatList((prevList: Chat[]) => [...prevList, { content: '', role: 'assistant', character: 'flora' }]);
        }
        const chunk = decoder.decode(value);
        const regex = /data:{"output":"(.+?)"}/g;
        const matches = Array.from(chunk.matchAll(regex));
        
        if (isLogAvailable) {
          logData.push({
            chunk: chunk,
            data: matches.map(match => match[1]).join('')
          });
        }
        
        if (matches.length > 0) {
          matches.forEach(match => {
            const output = match[1];
            v7Response += output;
          });
          
          setChatList((prevList: Chat[]) => {
            const newList = [...prevList];
            newList[newList.length - 1] = { content: v7Response, role: 'assistant', character: 'flora' };
            return newList;
          });
          // scrollToBottom();
        }
      }

      // After v7 is complete, add Timo's response
      setChatList((prevList: Chat[]) => [...prevList, { content: '', role: 'assistant', character: 'timo' }]);

      // Process v6 response stream
      response = await fetch('http://211.188.55.96:8080/api/v6/chat/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...chatList,
            newUserChat
          ]
        }),
        signal: abortControllerRef.current.signal,
      });

      const reader2 = response.body?.getReader();
      while (true) {
        const { done, value } = await reader2?.read() || {};
        if (done) break;
        const chunk = decoder.decode(value);
        const regex = /data:{"output":"(.+?)"}/g;
        const matches = Array.from(chunk.matchAll(regex));
        
        if (matches.length > 0) {
          matches.forEach(match => {
            const output = match[1];
            v6Response += output;
          });
          
          setChatList((prevList: Chat[]) => {
            const newList = [...prevList];
            newList[newList.length - 1] = { content: v6Response, role: 'assistant', character: 'timo' };
            return newList;
          });
        }
      }
      // Make a second request to v7
      const initialMessage = `저는 ${answers.age}살, ${answers.category}${answers.subcategory ? `, ${answers.subcategory}` : ''}${answers.subsubcategory ? `, ${answers.subsubcategory}` : ''} 피해를 입었습니다. ${messageToSend}`;
      const proofOfContentChat: Chat = { 
        content: `${initialMessage} 이 내용을 모두 포함하여, 세계 최고의 변호사가 작성한 것처럼 가해자에게 보낼 내용증명 초안을 전문적이고 법적으로 정확하게 작성해 주세요.`, 
        role: 'user', 
        character: 'flora'
      };
      setChatList((prevList: Chat[]) => [...prevList, { content: '', role: 'assistant', character: 'timo' }]);

      response = await fetch('http://211.188.55.96:8080/api/v8/chat/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...chatList,
            proofOfContentChat
          ]
        }),
        signal: abortControllerRef.current.signal,
      });

      const reader3 = response.body?.getReader();
      let secondV6Response = '';

      while (true) {
        const { done, value } = await reader3?.read() || {};
        if (done) break;
        const chunk = decoder.decode(value);
        const regex = /data:{"output":"(.+?)"}/g;
        const matches = Array.from(chunk.matchAll(regex));
        
        if (matches.length > 0) {
          matches.forEach(match => {
            const output = match[1];
            secondV6Response += output;
          });
          
          setChatList((prevList: Chat[]) => {
            const newList = [...prevList];
            newList[newList.length - 1] = { content: secondV6Response, role: 'assistant', character: 'timo' };
            return newList;
          });
        }
      }

      if (isLogAvailable) {
        const logContent = logData.map(row => `chunk: ${row.chunk}\ndata: ${row.data}\n\n`).join('');
        
        const blob = new Blob([logContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'chat.log';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error("Error fetching chat response:", error);
      }
    }
      setChatStage(StreamStatus.IDLE);
  };

  const handleStopRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setChatStage(StreamStatus.IDLE);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter') {
      const now = Date.now();
      if (lastEnterPress && now - lastEnterPress < 1000) {
        handleSend();
        setLastEnterPress(null);
      } else {
        setLastEnterPress(now);
      }
    }
  };

  const handleTextToSpeech = async (text: string, chatId: number, character: string) => {
    if (isPlaying[chatId]) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(prev => ({ ...prev, [chatId]: false }));
      return;
    }

    try {
      const voiceConfig = character === 'flora' ? VOICE_CHARACTERS.FLORA : VOICE_CHARACTERS.TIMO;
      
      const formData = new URLSearchParams();
      formData.append('speaker', voiceConfig.speaker);
      formData.append('text', text);
      formData.append('volume', voiceConfig.volume.toString());
      formData.append('speed', voiceConfig.speed.toString());
      formData.append('pitch', voiceConfig.pitch.toString());
      formData.append('emotion', voiceConfig.emotion.toString());
      formData.append('emotion-strength', voiceConfig.emotionStrength.toString());
      formData.append('format', 'wav');
      formData.append('sampling-rate', '8000');
      formData.append('alpha', voiceConfig.alpha.toString());
      formData.append('end-pitch', voiceConfig.endPitch.toString());

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) throw new Error('TTS request failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(prev => ({ ...prev, [chatId]: false }));
        URL.revokeObjectURL(audioUrl);
      };

      setIsPlaying(prev => ({ ...prev, [chatId]: true }));
      audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      toast.error('음성 변환에 실패했습니다.');
      setIsPlaying(prev => ({ ...prev, [chatId]: false }));
    }
  };

  const handleCopyText = useCallback((text: string, index: number) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedIndex(index);
        toast("클립보드에 복사되었습니다.", { icon: '✅' });
        setTimeout(() => setCopiedIndex(null), 2000);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedIndex(index);
        toast("클립보드에 복사되었습니다.", { icon: '✅' });
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (err) {
        console.error('텍스트 복사에 실패했습니다', err);
        toast("복사에 실패했습니다.", { icon: '❌' });
      }
      document.body.removeChild(textArea);
    }
  }, []);

  const handleFeedback = useCallback((chatId: number, isPositive: boolean) => {
    if (isPositive) {
      setThumbsUpClicked(prev => {
        if (prev[chatId]) {
          return { ...prev, [chatId]: false };
        }
        toast("피드백 감사합니다!", { icon: '✅' });
        setThumbsDownClicked(prev => ({ ...prev, [chatId]: false }));
        return { ...prev, [chatId]: true };
      });
    } else {
      setThumbsDownClicked(prev => {
        if (prev[chatId]) {
          return { ...prev, [chatId]: false };
        }
        toast("피드백 감사합니다!", { icon: '✅' });
        setThumbsUpClicked(prev => ({ ...prev, [chatId]: false }));
        return { ...prev, [chatId]: true };
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const isNearTop = scrollTop < 100;
        const isNearBottom = scrollTop + clientHeight > scrollHeight - 100;

        setShowScrollToTop(!isNearTop);
        setShowScrollToBottom(!isNearBottom);
      }
    };

    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  };

  const MemoizedImage = useMemo(() => React.memo<{ src: string; alt: string; width: number; height: number; className?: string }>(
    ({ src, alt, width, height, className }) => {
      return (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      );
    }
  ), []);

  const MemoizedFeedbackButton = useMemo(() => React.memo<{ onClick: () => void; icon: string; isActive: boolean }>(
    ({ onClick, icon, isActive }) => {
      return (
        <button
          onClick={onClick}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200`}
        >
          <MemoizedImage
            src={`/images/${icon}${isActive ? '_fill' : ''}.svg`}
            alt={icon}
            width={18}
            height={18}
            className={isActive ? '' : 'opacity-70'} // 비활성 상태일 때 약간 투명하게
          />
        </button>
      );
    }
  ), []);

  const MemoizedCopyButton = useMemo(() => React.memo<{ onClick: () => void }>(
    ({ onClick }) => {
      return (
        <button
          onClick={onClick}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200`}
        >
          <MemoizedImage
            src="/images/svg_copy.svg"
            alt="Copy"
            width={18}
            height={18}
            className="opacity-70" // 복사 버튼도 약간 투명하게
          />
        </button>
      );
    }
  ), []);

  const MemoizedTTSButton = useMemo(() => React.memo<{ onClick: () => void; isPlaying: boolean }>(
    ({ onClick, isPlaying }) => {
      return (
        <button
          onClick={onClick}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200`}
        >
          <MemoizedImage
            src={`/images/${isPlaying ? 'svg_stop_circle' : 'svg_volume'}.svg`}
            alt={isPlaying ? "Stop" : "Play"}
            width={18}
            height={18}
            className="opacity-70"
          />
        </button>
      );
    }
  ), []);

  useEffect(() => {
    const shouldSendInitialMessage = chatList.length === 0 && 
      answers.age && 
      answers.category && 
      !summary;

    if (shouldSendInitialMessage) {
      const initialMessage = `안녕하세요. 저는 ${answers.age}살이고, ${answers.category}${answers.subcategory ? `, ${answers.subcategory}` : ''}${answers.subsubcategory ? `, ${answers.subsubcategory}` : ''} 피해를 입었습니다. 이런 상황에서 제가 어떤 법적 조치를 취할 수 있는지, 그리고 앞으로 어떻게 대응해야 할지 조언을 구하고 싶습니다. 제가 받을 수 있는 지원이나 도움은 어떤 것들이 있을까요?`;
      setTimeout(() => {
        handleSend(initialMessage);
      }, 0);
    }
  }, [answers, chatList.length, summary]);

  const handleSpeechToText = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
          
          try {
            const response = await fetch('/api/speech-to-text', {
              method: 'POST',
              body: audioBlob,
            });

            const data = await response.json();
            if (data.text) {
              setInputText(data.text);
              handleSend(data.text);
            }
          } catch (error) {
            console.error('Speech to text error:', error);
            toast.error('음성 인식에 실패했습니다.');
          }
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Microphone access error:', error);
        toast.error('마이크 접근 권한이 필요합니다.');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#ABC1D1]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-4 flex items-center justify-between">
        <button onClick={() => router.push('/')} className="mr-4">
          <MemoizedImage src="/images/svg_back.svg" alt="Back" width={24} height={24} />
        </button>
      </div>

      {/* Chat area */}
      <div 
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 pb-[200px] relative"
      >
        <div className="max-w-[800px] mx-auto">
          {chatList.map((chat, index) => (
            <div key={index} className={`mb-4 ${chat.role === 'user' ? 'flex justify-end' : ''}`}>
              {chat.role === 'assistant' && (
                <div className="flex items-center mb-2">
                  <MemoizedImage
                    src={chat.character === 'flora' ? "/images/flora.png" : "/images/timo.png"}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full block mr-2"
                  />
                  <span className="text-sm font-semibold text-gray-600">
                    {chat.character === 'flora' ? '플로라' : '티모'}
                  </span>
                </div>
              )}
              <div 
                className={`p-3 rounded-lg ${
                  chat.role === 'user' 
                    ? 'text-black max-w-[70%] ml-auto shadow-md'
                    : 'bg-white text-gray-800 max-w-[80%] shadow-sm border border-gray-200'
                } select-text`}
                style={{
                  backgroundColor: chat.role === 'user' ? '#FFE000' : 'white',
                }}
              >
                {chat.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{chat.content}</p>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-purple-600" />
                      ),
                      li: ({ node, ...props }) => (
                        <li {...props} className="list-disc ml-5" />
                      ),
                      p: ({ node, children, ...props }) => {
                        // URL 패턴을 찾기 위한 정규식
                        const imageUrlPattern = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i;
                        
                        // children이 단일 문자열이고 이미지 URL인 경우
                        if (typeof children === 'string' && imageUrlPattern.test(children)) {
                          return (
                            <div className="my-2">
                              <img src={children} alt="Linked content" className="max-w-full rounded-lg" />
                            </div>
                          );
                        }
                        
                        // 일반적인 텍스트의 경우 기존 스타일 유지
                        return <p {...props} className="my-2 whitespace-pre-wrap">{children}</p>;
                      },
                      table: ({ node, ...props }) => (
                        <table {...props} className="border-collapse border border-gray-300 my-2 w-full" />
                      ),
                      thead: ({ node, ...props }) => (
                        <thead {...props} className="bg-gray-100" />
                      ),
                      tr: ({ node, ...props }) => (
                        <tr {...props} className="border-b border-gray-300" />
                      ),
                      th: ({ node, ...props }) => (
                        <th {...props} className="border border-gray-300 px-4 py-2 font-bold" />
                      ),
                      td: ({ node, ...props }) => (
                        <td {...props} className="border border-gray-300 px-4 py-2" />
                      ),
                      code: ({ node, ...props }) => (
                        <code {...props} className="bg-gray-100 p-1 rounded" />
                      ),
                      img: ({ node, ...props }) => (
                        <div className="my-2">
                          <img {...props} className="max-w-full rounded-lg" />
                        </div>
                      ),
                    }}
                  >
                    {chat.content
                      .replace(/\\n/g, '\n')
                      .replace(/\\u0026/g, '&') + 
                      (index === chatList.length - 1 && 
                       chat.role === 'assistant' && 
                       [StreamStatus.ISRESPONSEFETCHED, StreamStatus.ISFETCHING].includes(chatStage) 
                        ? ' ●' 
                        : ''
                      )
                    }
                  </ReactMarkdown>
                )}
              </div>
              {chat.role === 'assistant' && (
                <div className="mt-2">
                  <div className="inline-flex items-center bg-white rounded-lg border border-gray-300 p-1 space-x-1">
                    <MemoizedCopyButton
                      onClick={() => handleCopyText(chat.content, index)}
                    />
                    <MemoizedTTSButton
                      onClick={() => handleTextToSpeech(chat.content, index, chat.character)}
                      isPlaying={isPlaying[index]}
                    />
                    <MemoizedFeedbackButton
                      onClick={() => handleFeedback(index, true)}
                      icon="svg_thumbs_up"
                      isActive={thumbsUpClicked[index]}
                    />
                    <MemoizedFeedbackButton
                      onClick={() => handleFeedback(index, false)}
                      icon="svg_thumbs_down"
                      isActive={thumbsDownClicked[index]}
                    />
                  </div>
                </div>
              )}

            </div>
          ))}

          {[StreamStatus.INPUTSUBMITTED, StreamStatus.ISRESPONSEFETCHED, ].includes(chatStage) && (
            <div className="text-left">
              <div className="flex items-center mb-2">
                <MemoizedImage
                  src="/images/flora.png"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full block mr-2"
                />
                <span className="text-sm font-semibold text-gray-600">플로라</span>
              </div>
              {/* <div className="inline-block p-3 rounded-lg bg-white text-black"> */}
                 <>
                  <div className="h-6 bg-white/30 rounded w-3/4 mr-4 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-white/30 rounded w-3/4 mr-2 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-white/30 rounded w-3/4 mr-2 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-white/30 rounded w-3/4 mr-2 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-white/30 rounded w-1/2 mr-2 mb-2 animate-pulse"></div>
                </>
                {/* <span className="animate-pulse">●</span> */}
              {/* </div> */}
            </div>
          )}

          <div className='h-[50px]'></div>
        </div>

        {/* Scroll buttons */}
        <div className="fixed bottom-24 right-4 flex flex-col gap-2">
          {showScrollToTop && (
            <button
              onClick={scrollToTop}
              className="bg-white p-2 rounded-full shadow-md hover:bg-purple-300"
            >
              <MemoizedImage 
                src="/images/svg_arrow_up.svg" 
                alt="Scroll to top" 
                width={24} 
                height={24} 
                className="invert"
              />
            </button>
          )}
          {showScrollToBottom && (
            <button
              onClick={scrollToBottom}
              className="bg-white p-2 rounded-full shadow-md hover:bg-purple-300"
            >
              <MemoizedImage 
                src="/images/svg_arrow_down.svg" 
                alt="Scroll to bottom" 
                width={24} 
                height={24} 
                className="invert"
              />
            </button>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 fixed bottom-0 left-0 right-0 bg-white md:bg-transparent center z-30">
        <div className="mx-auto max-w-[800px]">
          <div className="flex items-center bg-gray-100 rounded-[26px]">
            <button className="p-2">
              <MemoizedImage src="/images/svg_plus.svg" alt="Add" width={24} height={24} />
            </button>
            <div className='w-full flex items-center'>
              <textarea
                ref={textareaRef}
                value={inputText}
                rows={1}
                onChange={(e) => {
                  setInputText(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={handleKeyPress}
                placeholder="메시지를 입력해주세요"
                className="flex-grow bg-transparent outline-none border-none resize-none overflow-hidden min-h-[24px] text-[#1F2937] mr-2 focus:ring-0 focus:outline-none"
                style={{ maxHeight: '120px' }}
              />
              <button
                onClick={handleSpeechToText}
                className="w-[32px] h-[32px] rounded-full flex items-center justify-center mr-2"
              >
                <MemoizedImage
                  src={isRecording ? "/images/svg_mic.svg" : "/images/svg_mic_off.svg"}
                  alt="microphone"
                  width={30}
                  height={30}
                  className={isRecording ? "animate-pulse" : ""}
                />
              </button>
              <button 
                onClick={() => chatStage === StreamStatus.IDLE ? handleSend() : handleStopRequest()}
                className="w-[32px] h-[32px] rounded-full flex items-center justify-center mr-2"
              >
                { [StreamStatus.INPUTSUBMITTED, StreamStatus.ISRESPONSEFETCHED, StreamStatus.ISFETCHING].includes(chatStage) ? (
                  <MemoizedImage src="/images/stop-circle.svg" alt="stop" width={32} height={32} />
                ) : (
                  <MemoizedImage src="/images/arrow-up-circle.svg" alt="send" width={32} height={32} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default ChatClient;