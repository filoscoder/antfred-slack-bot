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
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    const offHtmlPath = path.resolve(__dirname, `../../html/day_off.html`);
    const document = addVarsToHtml(offHtmlPath, htmlData);

    await page.setContent(document, { waitUntil: "networkidle2" });

    const pdfBuffer = await page.pdf({
      format: "A4",
    });

    await browser.close();

    return { filename, content: pdfBuffer };
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(error);
  }
};
