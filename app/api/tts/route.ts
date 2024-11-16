import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
  }

  try {
    const response = await fetch('https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID || 'isbs4fsm1a',
        'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY || 'Q7XvNEmR4nptBcMPF0b53dzAQOeuElEnsh4EjZe6',
      },
      body: await request.text(),
    });

    if (!response.ok) throw new Error('TTS request failed');

    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(Buffer.from(audioBuffer), {
      status: 200,
      headers: { 'Content-Type': 'audio/wav',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
       },
    });
  } catch (error) {
    console.error('TTS error:', error);
    return new NextResponse(JSON.stringify({ message: 'TTS request failed' }), { status: 500 });
  }
} 