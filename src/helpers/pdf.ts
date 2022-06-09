import { addVarsToHtml } from "../utils";
import path from "path";
import puppeteer from "puppeteer";

type HtmlData = {
  name: string;
  department: string;
  start: string;
  end: string;
  today: string;
  reason: string;
  comment?: string;
};

export const generateOffPdf = async (filename: string, htmlData: HtmlData) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const offHtmlPath = path.resolve(__dirname, `../../html/휴가신청서.html`);
  const document = addVarsToHtml(offHtmlPath, htmlData);

  await page.goto("data:text/html;charset=UTF-8," + document, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
  });

  await browser.close();

  return { filename, content: pdfBuffer };
};
