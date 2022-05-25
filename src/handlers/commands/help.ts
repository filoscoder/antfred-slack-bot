import { getHelpBlocks } from "../../blocks/help";

import { App } from "@slack/bolt";

const SLASH_COMMANDS = [
  {
    commands: "`/form` or `/f`",
    description: "저장된 폼(form) 보기 또는 작성하기",
  },
  {
    commands: "`/bug`",
    description: "버그 리포트(Bug Report)하기",
  },
  {
    commands: "`/help` or `/h`",
    description: "Antfred가 할 수 있는 모든 작업 표시",
  },
];

export const help = (appInstance: App) => {
  appInstance.command(/help|h/, async (event) => {
    const { body, say, ack, logger } = event;
    try {
      await say({
        blocks: getHelpBlocks(SLASH_COMMANDS),
        text: "!Form_list", // `text` field need to avoid warnings
      });

      await ack();
    } catch (error) {
      logger.error(error);
    }
  });
};
