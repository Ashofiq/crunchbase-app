const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

app.get("/", (req, res) => {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
    });

    const page = await browser.newPage();

    page.waitForNavigation({ waitUntil: "domcontentloaded" });
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    await page.goto("https://www.crunchbase.com/organization/amazon");

    const title = await page.$$eval("#client-app-state", (elements) => {
      return elements.map((item) =>
        item.textContent
          .replace(/\&q;/g, '"')
          .replace(
            "GET/v4/data/entities/organizations/amazonfield_ids=%5B%22identifier%22,%22layout_id%22,%22facet_ids%22,%22title%22,%22short_description%22,%22is_locked%22%5D&a;layout_mode=view_v2",
            "data"
          )
      );
    });
    let m = JSON.parse(title);
    let n = m.HttpState.data.text;

    res.send(n).json();

    await browser.close();
  })();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
