function normalizeURL(urlstring) {
  const urlObj = new URL(urlstring);
  const host = urlObj.hostname;
  let path = urlObj.pathname;
  if (path.length > 0 && path.at(-1) == "/") {
    path = path.substring(0, path.length - 1);
  }
  return host + path;
}

export { normalizeURL };
