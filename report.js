function printReport(pages) {
  console.log("---------PRINTING THE REPORT---------");
  const sortedPages = sortPages(pages);
  for (const url in sortedPages) {
    console.log(`Found ${sortedPages[url]} internal links for ${url}`);
  }
}

function sortPages(pages) {
  const entries = Object.entries(pages);

  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

  const sortedPages = Object.fromEntries(sortedEntries);

  return sortedPages;
}

export { printReport };
