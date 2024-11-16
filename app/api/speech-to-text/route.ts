import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const audioBlob = await request.blob();

  try {

    const response = await fetch('https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor', {
      method: 'POST',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID || 'isbs4fsm1a'    ,
        'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY || 'Q7XvNEmR4nptBcMPF0b53dzAQOeuElEnsh4EjZe6',
        'Content-Type': 'application/octet-stream',
      },
      body: audioBlob,
    });

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Speech to text error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Speech to text failed' }), 
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 