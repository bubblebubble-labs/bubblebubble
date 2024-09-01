import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log('Received request to send to Slack');
    
    const slackWebhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;
    console.log('Slack Webhook URL:', slackWebhookUrl ? 'Set' : 'Not set');

    if (!slackWebhookUrl) {
      console.error('Slack Webhook URL is not defined');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    const { answers } = await req.json();
    console.log('Received answers:', answers);

    const surveyResults = Object.entries(answers).map(([key, value]) => ({
      question: key,
      answer: Array.isArray(value) ? value.join(', ') : value || '응답 없음'
    }));

    const message = {
      text: "🎉 새로운 설문 응답이 도착했습니다! 🎉",
      attachments: [
        {
          color: "#36a64f",
          title: "설문 응답",
          fields: surveyResults.map((result, index) => ({
            title: `Q${index + 1}: ${result.question}`,
            value: result.answer,
            short: false
          })),
        }
      ],
      footer: `응답 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`
    };

    console.log('Sending message to Slack:', JSON.stringify(message));

    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error(`Slack API responded with status: ${response.status}`);
      const responseText = await response.text();
      console.error('Slack API response:', responseText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Message sent to Slack successfully');
    return NextResponse.json({ message: '설문 결과가 Slack으로 전송되었습니다.' });
  } catch (error) {
    console.error('Error in sendToSlack route:', error);
    return NextResponse.json({ message: 'Slack으로 메시지 전송 중 오류 발생', error: (error as Error).message }, { status: 500 });
  }
}