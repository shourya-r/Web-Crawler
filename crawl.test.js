import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl";

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
