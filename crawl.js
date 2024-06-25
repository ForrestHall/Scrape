const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start() {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto("https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=4043629")
	const names = await page.evaluate(() => {
		return Array.from(document.querySelectorAll(".querylabel")).map(x => x.textContent)
	})
	const value = await page.evaluate(() => {
		return Array.from(document.querySelectorAll(".queryfield")).map(x => x.textContent)
	})
	await fs.writeFile("names.txt", names.join("\r\n"))
	await browser.close()
}

start()
