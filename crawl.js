import { JSDOM } from "jsdom";

async function crawlPage(currentURL, baseURL, pages) {
  const currentURLObj = new URL(currentURL);
  const baseURLObj = new URL(baseURL);
  // We only want to crawl our own website
  if (currentURLObj.hostname != baseURLObj.hostname) {
    return pages;
  }
  const normalisedCurrentURL = normalizeURL(currentURL);
  // if there are entries found for url then increment
  if (pages[normalisedCurrentURL] > 0) {
    pages[normalisedCurrentURL]++;
    return pages;
  } else {
    pages[normalisedCurrentURL] = 1;
  }
  console.log(`Actively crawling: ${normalisedCurrentURL}`);

  const htmlText = await parseHTML(currentURL);
  if (htmlText != "") {
    const nextURLs = getURLsFromHTML(htmlText, baseURL);
    for (const nextURL of nextURLs) {
      pages = await crawlPage(nextURL, baseURL, pages);
    }
  }
  return pages;
}

async function parseHTML(url) {
  try {
    const resp = await fetch(url);
    // if error status code
    if (resp.status > 399) {
      console.log(`Error occured : status code ${resp.status} on page ${url}`);
      return "";
    }
    // if html not foind
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Error occured : HTML not returned at ${url}`);
      return "";
    }
    // else return html
    const htmlBody = await resp.text();
    return htmlBody;
  } catch (err) {
    console.log(`Error occured : ${err.message} at ${url}`);
    return "";
  }
}

function normalizeURL(urlstring) {
  const urlObj = new URL(urlstring);
  const host = urlObj.hostname;
  let path = urlObj.pathname;
  if (path.length > 0 && path.at(-1) == "/") {
    path = path.substring(0, path.length - 1);
  }
  return host + path;
}

function getURLsFromHTML(htmlbody, baseURL) {
  const dom = new JSDOM(htmlbody);
  const anchors = [...dom.window.document.querySelectorAll("a")];
  const links = anchors.map((anchor) => {
    // relative
    if (anchor.href.at(0) === "/") {
      try {
        const urlObj = new URL(baseURL + anchor.href);
        return baseURL + anchor.href;
      } catch (err) {
        console.log(`Error with relative URL: ${err.message}`);
      }
    }
    // absolute
    else {
      try {
        const urlObj = new URL(anchor.href);
        return anchor.href;
      } catch (err) {
        console.log(`Error with absolute URL: ${err.message}`);
      }
    }
  });
  return links;
}

export { normalizeURL, getURLsFromHTML, crawlPage, parseHTML };
