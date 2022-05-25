import { Block, KnownBlock, View } from "@slack/bolt";

const INITIAL_CHANNEL = "C038Y42JRC6"; // #개발-bug_report
const BROWSERS = ["chrome", "safari", "edge", "firefox", "whale"];
const browserOpts = BROWSERS.map((curr) => ({
  text: {
    type: "plain_text",
    text: curr,
  },
  value: curr,
}));

export const bugReportModal = {
  type: "modal",
  callback_id: "bug",
  title: {
    type: "plain_text",
    text: "Antfred",
    emoji: true,
  },
  submit: {
    type: "plain_text",
    text: "Send",
    emoji: true,
  },
  close: {
    type: "plain_text",
    text: "Cancel",
    emoji: true,
  },
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🐞 Bug Report",
        emoji: true,
      },
    },
    {
      type: "section",
      block_id: "Channel",
      text: {
        type: "mrkdwn",
        text: "보고 채널",
      },
      accessory: {
        type: "channels_select",
        initial_channel: INITIAL_CHANNEL,
        action_id: "channel_select",
        placeholder: {
          type: "plain_text",
          text: "Select a channel...",
          emoji: true,
        },
      },
    },

    {
      type: "divider",
    },
    {
      type: "input",
      block_id: "Browser",
      element: {
        type: "static_select",
        action_id: "browser_option",
        initial_option: {
          text: {
            type: "plain_text",
            text: BROWSERS[0],
          },
          value: BROWSERS[0],
        },
        options: browserOpts,
      },
      label: {
        type: "plain_text",
        text: "1. 브라우저",
        emoji: true,
      },
    },
    {
      type: "input",
      block_id: "Url",
      element: {
        type: "plain_text_input",
        action_id: "url_input",
        placeholder: {
          type: "plain_text",
          text: "ex. https://staging-app.labnote.co/note/:id",
        },
      },
      label: {
        type: "plain_text",
        text: "2. 현재 페이지 주소",
        emoji: true,
      },
    },
    {
      type: "input",
      block_id: "Account",
      element: {
        type: "plain_text_input",
        action_id: "account_input",
        placeholder: {
          type: "plain_text",
          text: "ex. periodic_table@ant-inc.co",
        },
      },
      label: {
        type: "plain_text",
        text: "3. 사용중인 계정",
        emoji: true,
      },
    },
    {
      type: "input",
      block_id: "Reproduction",
      element: {
        type: "plain_text_input",
        action_id: "reproduction_input",
        multiline: true,
        placeholder: {
          type: "plain_text",
          text: "ex. 벤치에서 해당 프로덕트를 더블클릭",
        },
      },
      label: {
        type: "plain_text",
        text: "4. 버그재현 순서",
        emoji: true,
      },
    },
  ],
} as View;
