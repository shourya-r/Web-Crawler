import { crawlPage, parseHTML } from "./crawl.js";
async function main() {
  // process.argv returns an array with all the CLI arguments
  if (process.argv.length < 3) {
    console.log("No website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Provide only one URL");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`Starting crawl at ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  console.log(pages);
}

main();
