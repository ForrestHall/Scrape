const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
  // usual browser startup:
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // use absolute paths like
    //await page.goto("file://home/ec2-user/EXAMPLE/Scrape/data.html");  
    

    //  use relative paths: 
    // below will select test.html that is in the same directory as the script
    await page.goto(`file:${path.join(__dirname, 'data.html')}`);
    //const numbers = await page.evaluate(() => {
    //const tds = Array.from(document.querySelectorAll('td'))
    //return tds.map(td => td.innerText)
    //console.log(tds)
    const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelector('table:nth-of-type(3)'))
    return tds.map(td => td.innerText)
    });

    console.log(data)
  


    browser.close();
}

run();
