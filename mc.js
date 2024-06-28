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
    
    const pattern = new RegExp('/MC-/gm');

    const data = await page.evaluate(() => {
      const tds = document.body.innerText//Array.from(document.querySelectorAll('table tbody tr td'))
      return tds//.map(td => td.innerText)
    });
      
    /*var filtered = data.search(function (item) {
        return item.match(/MC/);
    });
    */
    const result = (data.match(/(?<=MC-).*?/g) || []);
    console.log(result);
    //console.log(filtered)

  



browser.close();
}

run();
