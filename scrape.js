/**
 * 查询http://books.toscrape.com/该网站点击某一产品抓取价格与名称
 */
const puppeteer = require("puppeteer");

let scrape = async () => {
  //Actual Scraping goes Here...
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://books.toscrape.com/");
  await page.waitFor(1000);

  await page.click(
    "#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img"
  );

  const result = await page.evaluate(() => {
    //return something
    let title = document.querySelector("h1").innerText;
    let price = document.querySelector(".price_color").innerText;
    return {
      title,
      price
    };
  });

  //Return a value
  browser.close();
  return result;
};

scrape().then(value => {
  console.log(value); //Success
});
