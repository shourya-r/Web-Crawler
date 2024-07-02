import { JSDOM } from "jsdom";

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

export { normalizeURL, getURLsFromHTML };
