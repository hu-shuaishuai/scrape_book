/**
 * 查询http://books.toscrape.com/网站当前页的价格和标题
 */
const puppeteer = require("puppeteer");
const Book = require("./models/book");
var db = require("./db");

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("http://books.toscrape.com/");

  const result = await page.evaluate(() => {
    let data = []; //保存数据
    let elements = document.querySelectorAll(".product_pod"); //查询所有的产品

    //遍历每个产品
    for (var element of elements) {
      let title = element.childNodes[5].innerText; //查询标题
      let price = element.childNodes[7].children[0].innerText; //查询价格

      data.push({ title, price });
    }

    return data;
  });

  browser.close();
  return result;
};

scrape().then(value => {
  //将抓去到的数据保存到数据库
  Book.collection.insertMany(value, (err, data) => {
    if (err) return console.log(err);
    console.log(data);
  });
});
