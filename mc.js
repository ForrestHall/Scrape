const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
  // usual browser startup:
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // we can use absolute paths like
    //await page.goto("file://home/ec2-user/EXAMPLE/Scrape/data.html");  
    

    //  use relative paths: 
    // below will select test.html that is in the same directory as the script
    await page.goto(`file:${path.join(__dirname, 'data.html')}`);
    const numbers = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('table tr th'))
    return tds.map(td => td.innerText)
    console.log(tds)

    });
    browser.close();
}

run();
