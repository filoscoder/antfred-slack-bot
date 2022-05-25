import { Block, KnownBlock } from "@slack/bolt";

export const getHelpBlocks = (slashCommands: Array<any>) => {
  const slashCommandsStr = slashCommands.reduce((prev, slash) => {
    const { commands, description } = slash;
    return prev + `⌙ ${commands}  : ${description}\n`;
  }, "");

  return [
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "사용 가능한 커멘드 🧐",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: slashCommandsStr,
        },
      ],
    },
  ] as Array<Block | KnownBlock>;
};
