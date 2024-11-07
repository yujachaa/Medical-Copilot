// app/api/generate-pdf/route.ts
import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Puppeteer 브라우저 시작
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // URL로 이동
    await page.goto(url, { waitUntil: 'networkidle0' });

    // PDF 생성
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '15mm',
        bottom: '10mm',
        left: '15mm',
      },
    });

    // 브라우저 닫기
    await browser.close();

    // PDF 파일 응답으로 전송
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="download.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
