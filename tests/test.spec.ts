const fs = require("fs");
describe("Extreme Portal - All Content Suite", async function () {
  it("Store all the hrefs in the text file", async function () {
    await browser.url(
      "https://extremeportal.force.com/ExtrSearch#t=All&sort=relevancy"
    );
    fs.writeFile("Output.txt", "", (err: any) => {
      if (err) throw err;
    });
    while (true) {
      let isRightArrowButtonPresent = await $(
        `.coveo-main-section [alt="Right Arrow"]`
      ).isDisplayed();
      let results = await $$(
        `.coveo-list-layout.CoveoResult .CoveoResultLink`
      ).map((ele) => ele.getAttribute("href"));
      for (let i = 0; i < results.length; i++) {
        fs.appendFile("Output.txt", `${results[i]}\n`, (err: any) => {
          if (err) {
            console.log("Error while appending file:", err);
          }
        });
      }
      if (!isRightArrowButtonPresent) break;
      await $(`.coveo-main-section [alt="Right Arrow"]`).click();
      await browser.pause(15000)
    }
  });
});
