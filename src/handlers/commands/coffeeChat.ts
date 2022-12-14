import { App } from "@slack/bolt";

const COFFEE_CHAT_LINK = "https://calendly.com/hydrogen-1/coffeechat";

export const coffeeChat = (appInstance: App) => {
  appInstance.command(/\b(cc)/, async ({ ack, logger, respond }) => {
    try {
      await respond({
        response_type: "ephemeral",
        blocks: [
          {
            type: "section",
            text: {
              type: "plain_text",
              emoji: true,
              text: "โ๏ธ Coffee Chat ๐",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*<${COFFEE_CHAT_LINK}| ์ข์ค๋๊ณผ ์ปคํผ์ฑ ์ ์ฒญํ๊ธฐ>*\n\nโฃ ์ฃผ๋ก \`์์ธ\` ์คํผ์ค ์ถ๊ทผ\nโฃ *๋ชฉ/๊ธ* \`๋์ \`์์ ๊ทผ๋ฌด`,
            },
            accessory: {
              type: "image",
              image_url:
                "https://api.slack.com/img/blocks/bkb_template_images/notifications.png",
              alt_text: "calendar thumbnail",
            },
          },
          {
            type: "divider",
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "โ ๏ธ ์ ์ผ์ ์ ๋ฏธํ ๋ฑ์ ๋ฐ๋ผ ๋ณ๊ฒฝ๋  ์ ์์ผ๋ฉฐ, ๋ณ๊ฒฝ๋  ๊ฒฝ์ฐ ๊ณต์ง ๋๋ฆฌ๊ฒ ์ต๋๋ค.",
              },
              {
                type: "mrkdwn",
                text: "โ ์ปคํผ์ฑ ์ผ์  ๋ณ๊ฒฝ์ด ํ์ํ  ๋๋ ํด๋น ํ์๊ณผ ๊ฐ๋ณ์ ์ผ๋ก ์กฐ์จํ๊ฒ ์ต๋๋ค.",
              },
            ],
          },
        ],
        text: "โ๏ธ Coffee Chat ์ ์ฒญํ๊ธฐ",
      });

      await ack();
    } catch (error) {
      logger.error(error);
    }
  });
};
