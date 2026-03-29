import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    // Set cache headers for static assets
    const headers = {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': 'application/javascript',
    };

    return new NextResponse('/* Service Worker for Temple Website */', {
      headers,
    });
  } catch (error) {
    return new NextResponse('Service Worker error', { status: 500 });
  }
}
