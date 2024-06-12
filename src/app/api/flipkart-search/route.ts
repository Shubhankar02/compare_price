// src/app/api/flipkart-search/route.ts
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

  await page.goto(`https://www.flipkart.com/search?q=${encodeURIComponent(query)}`);

  const results: Result[] = await page.evaluate(() => {
    const items: Result[] = [];
    document.querySelectorAll('._1AtVbE').forEach(item => {
      // @ts-ignore
      const title = item.querySelector('._4rR01T')?.innerText || '';
      // @ts-ignore
      const price = item.querySelector('._30jeq3')?.innerText || '';
      const linkElement = item.querySelector('a')?.href || '';
      const image = item.querySelector('img')?.getAttribute('src') || '';

      const link = linkElement.startsWith('/') ? `https://www.flipkart.com${linkElement}` : linkElement;

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
