import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();
  const slackWebhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;

  if (!slackWebhookUrl) {
    console.error('Slack Webhook URL is not defined');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  const message = {
    text: "🎉 새로운 대기자 명단 등록이 있습니다! 🎉",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*새로운 대기자 등록*\n이메일: ${email}`
        }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `등록 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return NextResponse.json({ message: '대기자 명단 등록이 완료되었습니다.' });
  } catch (error) {
    console.error('Slack으로 메시지 전송 중 오류 발생:', error);
    return NextResponse.json({ message: 'Slack으로 메시지 전송 중 오류 발생' }, { status: 500 });
  }
}