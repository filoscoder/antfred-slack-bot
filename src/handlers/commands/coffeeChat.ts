import { App } from "@slack/bolt";

const COFFEE_CHAT_LINK = "https://calendly.com/hydrogen-1/coffeechat";

export const coffeeChat = (appInstance: App) => {
  appInstance.command(/\b(cc)/, async ({ ack, logger, respond }) => {
    try {
      await respond({
        response_type: "ephemeral",
        text: "☕️ 커피챗 신청하기",
        attachments: [
          {
            color: "danger",
            title: "\n",
            fallback: "☕️ Coffee Chat 신청하기",
            blocks: [
              {
                type: "section",
                text: {
                  type: "plain_text",
                  emoji: true,
                  text: "☕️ Coffee Chat 🐜",
                },
              },
              {
                type: "divider",
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*<${COFFEE_CHAT_LINK}| 종윤님과 커피챗 신청하기>*\n\n‣ 주로 \`서울\` 오피스 출근\n‣ *목/금* \`대전\`에서 근무`,
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
                    text: "⚠️ 위 일정은 미팅 등에 따라 변경될 수 있으며, 변경될 경우 공지 드리겠습니다.",
                  },
                  {
                    type: "mrkdwn",
                    text: "✅ 커피챗 일정 변경이 필요할 때는 해당 팀원과 개별적으로 조율하겠습니다.",
                  },
                ],
              },
            ],
          },
        ],
      });

      await ack();
    } catch (error) {
      logger.error(error);
    }
  });
};
