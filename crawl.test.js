import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl";

test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

test("normalizeURL removes trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

test("normalizeURL changes capitals to lowercase ", () => {
  const input = "https://bLog.bOOt.Dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

test("normalizeURL strips protocol", () => {
  const input = "http://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

test("getURLsFromHTML absolute", () => {
  const HTMLbody = `<html> 
        <body> 
            <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a> 
        </body> 
    </html>`;
  const baseURL = "https://blog.boot.dev";
  const expected = ["https://blog.boot.dev/"];
  const actual = getURLsFromHTML(HTMLbody, baseURL);
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const HTMLbody = `<html> 
          <body> 
              <a href="/path/"><span>Go to Boot.dev</span></a> 
          </body> 
      </html>`;
  const baseURL = "https://blog.boot.dev";
  const expected = ["https://blog.boot.dev/path/"];
  const actual = getURLsFromHTML(HTMLbody, baseURL);
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML multiple absolute", () => {
  const HTMLbody = `<html> 
            <body> 
                <a href="https://blog.boot.dev/path1/"><span>Go to Boot.dev</span></a>
                <a href="https://blog.boot.dev/path2/"><span>Go to Boot.dev</span></a>  
            </body> 
        </html>`;
  const baseURL = "https://blog.boot.dev";
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  const actual = getURLsFromHTML(HTMLbody, baseURL);
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML multiple relative", () => {
  const HTMLbody = `<html> 
              <body> 
                  <a href="/path1/"><span>Go to Boot.dev</span></a>
                  <a href="/path2/"><span>Go to Boot.dev</span></a>  
              </body> 
          </html>`;
  const baseURL = "https://blog.boot.dev";
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  const actual = getURLsFromHTML(HTMLbody, baseURL);
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML multiple absolute and relative", () => {
  const HTMLbody = `<html> 
                <body> 
                    <a href="/path1/"><span>Go to Boot.dev</span></a>
                    <a href="/path2/"><span>Go to Boot.dev</span></a> 
                    <a href="https://blog.boot.dev/path3/"><span>Go to Boot.dev</span></a>
                    <a href="https://blog.boot.dev/path4/"><span>Go to Boot.dev</span></a>   
                </body> 
            </html>`;
  const baseURL = "https://blog.boot.dev";
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
    "https://blog.boot.dev/path3/",
    "https://blog.boot.dev/path4/",
  ];
  const actual = getURLsFromHTML(HTMLbody, baseURL);
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const HTMLbody = `<html> 
            <body> 
                <a href="invalid"><span>Go to Boot.dev</span></a> 
            </body> 
        </html>`;
  const baseURL = "https://blog.boot.dev";
  const expected = [];
  const actual = getURLsFromHTML(HTMLbody, baseURL);
  expect(actual).toEqual(expected);
});
