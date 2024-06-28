const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
  // usual browser startup:
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // use absolute paths
    //await page.goto("file://home/ec2-user/EXAMPLE/Scrape/data.html");  
    

    //  use relative paths: 
    await page.goto(`file:${path.join(__dirname, 'data.html')}`);
    
    const data = await page.evaluate(() => {
      const tds = document.body.innerText
      return tds
    });
  
    const dot = (data.match(/(?<=MC-).*?(?=<)/g) || []);//regEx to find DOT
    const mc = (data.match(/(?<=MC-).*?(?=<)/g) || []);//regEc to find MC-
    console.log(mc);
    //console.log(data);

    //console.log(filtered)

  



browser.close();
}

run();
