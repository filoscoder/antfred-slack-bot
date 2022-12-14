import { App } from "@slack/bolt";
import { getHelpBlocks } from "../../blocks/help";

const SLASH_COMMANDS = [
  {
    commands: "`/form`",
    description: "๐ ์ ์ฅ๋ ํํ๋ฆฟ ํผ(form) ๋ณด๊ธฐ ๋๋ ์์ฑํ๊ธฐ (์ต๋ 45๊ฐ)",
  },
  {
    commands: "`/bug`",
    description: "๐ ๋ฒ๊ทธ ๋ฆฌํฌํธ(Bug Report)ํ๊ธฐ",
  },
  {
    commands: "`/cc`",
    description: "โ๏ธ ์ข์ค๋(๋ํ) ์ปคํผ์ฑ ์ ์ฒญํ๊ธฐ (Coffee-Chat)",
  },
  {
    commands: "`/off`",
    description: "โ๏ธ ํด๊ฐ ์ ์ฒญํ๊ธฐ (๋ฉ์ผ๋ก ์ ๋ฌ)",
  },
  {
    commands: "`/in` or `/start`",
    description: "๐ ์์ค<>Slack ์ถ๊ทผํ๊ธฐ",
  },
  {
    commands: "`/out` or `/finish`",
    description: "๐ ์์ค<>Slack ํด๊ทผํ๊ธฐ",
  },
  {
    commands: "`/help` or `/h`",
    description: "๐ก Antfred๊ฐ ํ  ์ ์๋ ์์ ๋ณด๊ธฐ",
  },
];

export const help = (appInstance: App) => {
  appInstance.command(
    /\b(help|h)/,
    async ({ ack, logger, respond, client }) => {
      try {
        await respond({
          response_type: "ephemeral",
          blocks: getHelpBlocks(SLASH_COMMANDS),
          text: "๐ก All commands",
        });

        await ack();
      } catch (error) {
        logger.error(error);
      }
    },
  );
};
