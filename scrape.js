
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.SCRAPE_URL || 'https://example.com';
  console.log("SCRAPE_URL env:",process.env.SCRAPE_URL);
  console.log("URL being scraped:",url);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/usr/bin/chromium' 
  });
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => ({
    title: document.title,
    heading: document.querySelector('h1,h2,h3,h4,h5,h6')?.innerText || 'No H1 Found'
  }));

  fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
