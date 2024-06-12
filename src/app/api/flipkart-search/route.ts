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

  const browser = await puppeteer.launch({ headless: false }); // Set headless to false for debugging
  const page = await browser.newPage();

  await page.goto(`https://www.flipkart.com/search?q=${encodeURIComponent(query)}`, {
    waitUntil: 'networkidle2'  // Ensures that the network is idle before scraping
  });

  const results: Result[] = await page.evaluate(() => {
    const items: Result[] = [];
    // Update selectors to match current Flipkart layout
    document.querySelectorAll('._1AtVbE .col-12-12').forEach(item => {
      // @ts-ignore
      const title = item.querySelector('._4rR01T')?.innerText || '';
      // @ts-ignore
      const price = item.querySelector('._30jeq3')?.innerText || '';
      // @ts-ignore
      const linkElement = item.querySelector('a._1fQZEK')?.href || '';
      const image = item.querySelector('img._396cs4._3exPp9')?.getAttribute('src') || '';

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
