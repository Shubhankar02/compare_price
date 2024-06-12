// src/app/api/amazon-search/route.ts
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

interface Result {
  title: string;
  price: string;
  link: string;
  image: string;
}

export async function POST(request: Request) {
  const { query } = await request.json();
  const startTime = Date.now();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`https://www.amazon.in/s?k=${encodeURIComponent(query)}`);

  const results: Result[] = await page.evaluate(() => {
    const items: Result[] = [];
    document.querySelectorAll('.s-main-slot .s-result-item').forEach(item  => {
      // @ts-ignore
      const title = item.querySelector('h2 a span')?.innerText || '';
      // @ts-ignore
      const price = item.querySelector('.a-price span')?.innerText || '';
      // @ts-ignore
      const link = item.querySelector('h2 a')?.href || '';
      const image = item.querySelector('.s-image')?.getAttribute('src') || '';

      if (title && price && link && image) {
        items.push({ title, price, link, image });
      }
    });
    return items.slice(0, 5); // Get top 5 items
  });

  await browser.close();

  const endTime = Date.now();
  const fetchTime = endTime - startTime;

  return NextResponse.json({ results, fetchTime });
}
