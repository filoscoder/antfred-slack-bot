import { App } from "@slack/bolt";
import { getHelpBlocks } from "../../blocks/help";

const SLASH_COMMANDS = [
  {
    commands: "`/form`",
    description: "📂 저장된 템플릿 폼(form) 보기 또는 작성하기 (최대 45개)",
  },
  {
    commands: "`/bug`",
    description: "🐞 버그 리포트(Bug Report)하기",
  },
  {
    commands: "`/cc`",
    description: "☕️ 종윤님(대표)과 커피챗 신청하기 (Coffee-Chat)",
  },
  {
    commands: "`/off`",
    description: "✈️ 휴가 신청하기 (메일로 전달)",
  },
  {
    commands: "`/help` or `/h`",
    description: "💡 Antfred가 할 수 있는 커멘드 보기",
  },
];

export const help = (appInstance: App) => {
  appInstance.command(
    /\b(help|h)/,
    async ({ ack, logger, respond, client }) => {
      try {
        await respond({
          response_type: "ephemeral",
          text: "💡 help",
          attachments: [
            {
              color: "warning",
              title: "\nAll commands",
              blocks: getHelpBlocks(SLASH_COMMANDS),
              fallback: "💡 help commands",
            },
          ],
        });

        await ack();
      } catch (error) {
        logger.error(error);
      }
    },
  );
};
