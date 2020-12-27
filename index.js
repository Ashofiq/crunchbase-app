const express = require("express");
const app = express();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const port = 3000;

// const dom = new JSDOM(``, {
//     url: "https://www.crunchbase.com/organization/twitter",
//     referrer: "https://google.com/",
//     contentType: "text/html",
//     includeNodeLocations: true,
//     storageQuota: 1000000000000
//   });

// console.log(dom.window.document.querySelector("#client-app-state").textContent);

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/:name", (req, res) => {
  const name = req.params.name;
  JSDOM.fromURL(
    "https://www.crunchbase.com/organization/" + name,
    "text/html"
  ).then((dom) => {
    res.send(
      dom.window.document
        .querySelector("#client-app-state")
        .text.replace(/\&q;/g, '"').replace("GET/v4/data/entities/organizations/"+ name +"field_ids=%5B%22identifier%22,%22layout_id%22,%22facet_ids%22,%22title%22,%22short_description%22,%22is_locked%22%5D&a;layout_mode=view_v2", "data")
    );
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
