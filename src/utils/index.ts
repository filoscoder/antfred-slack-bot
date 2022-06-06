import fs from "fs";

export const addVarsToHtml = (filePath: string, vars: any) =>
  fs
    .readFileSync(filePath, "utf-8")
    .replace(/{{([^{{]+)}}/g, (_, key): string => vars[key]);

export const getKrToday = () => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: "Asia/Seoul",
    calendar: "korean",
  };

  const now = new Date();

  return {
    plainToday: now.toLocaleDateString("en-CA"),
    krToday: new Intl.DateTimeFormat("ko-KR", options).format(now),
  };
};
