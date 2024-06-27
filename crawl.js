const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start() {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto("https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=4043629")
	const names = await page.evaluate(() => {
			return Array.from(document.querySelectorAll("table tr")).map(x => x.textContent)
			})
	const value = await page.evaluate(() => {
			return Array.from(document.querySelectorAll("table td")).map(x => x.textContent)
			})

	//const removeValue = ['State Carrier ID Number:,']
	//const cleanValue = value.filter(ele => !removeValue.includes(ele));
	const result = {};


 	names.forEach((name, idx) => result[name] = value[idx]);

 	//console.log(names)
	//console.log(value)
	//console.log(cleanValue)
	console.log(result)
	//const info = await page.$eval('table tbody', tbody => [...tbody.rows].map(r => [...r.cells].map(c => c.innerText)))
	//console.log(info)

	/*const result = await page.evaluate(() => {
  		const rows = document.querySelectorAll('querylabelbkg tr');
 		return Array.from(rows, row => {
    			const columns = row.querySelectorAll('.queryfield td');
    			return Array.from(columns, column => column.innerText);
 		 });
	});
*/
    const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('table tr td'))
    return tds.map(td => td.innerText)
  });

  //You will now have an array of strings
  //[ 'One', 'Two', 'Three', 'Four' ]
  //console.log(data);
  //One
  //console.log(data[0]);

  //console.log(result[1]);

	//await fs.writeFile("names.txt", names.join("\r\n"))
	await browser.close()
}

start()
