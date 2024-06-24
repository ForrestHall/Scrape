const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start() {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto("https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=4043629")
	await page.screenshot({path: "safer.png", fullPage: true})	
	const names = await page.evaluate(() => {
		return Array.from(document.querySelector("body.p.table.tbody.tr:nth-child(2).td.table.tbody.tr:nth-child(2).td.center:nth-child(3).table.tbody.tr:nth-child(11).td")).map(x => x.textContent)
	})
	await fs.writeFile("names.txt", names.join("\r\n"))
	await browser.close()
}

start()
