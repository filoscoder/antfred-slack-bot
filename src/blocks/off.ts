import { View } from "@slack/bolt";

const REPORT_TO = "C038Y42JRC6"; // 연주님
const DEPARTMENTS = ["개발", "기획", "디자인", "프로덕트"];
const deptOpts = DEPARTMENTS.map((curr) => ({
  text: {
    type: "plain_text",
    text: `${curr}팀`,
  },
  value: `${curr}팀`,
}));

export const offModal = {
  type: "modal",
  callback_id: "off",
  title: {
    type: "plain_text",
    text: "Antfred",
    emoji: true,
  },
  submit: {
    type: "plain_text",
    text: "신청",
    emoji: true,
  },
  close: {
    type: "plain_text",
    text: "취소",
    emoji: true,
  },
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🫥 휴가 신청서",
        emoji: true,
      },
    },
    {
      type: "section",
      block_id: "Approver",
      text: {
        type: "mrkdwn",
        text: "승인자",
      },
      accessory: {
        type: "users_select",
        action_id: "users_select",
        placeholder: {
          type: "plain_text",
          text: "승인자",
          emoji: true,
        },
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      block_id: "Reporter",
      text: {
        type: "mrkdwn",
        text: "신청인",
      },
      accessory: {
        type: "users_select",
        action_id: "users_select",
        placeholder: {
          type: "plain_text",
          text: "신청인",
          emoji: true,
        },
      },
    },
    {
      type: "section",
      block_id: "Department",
      text: {
        type: "mrkdwn",
        text: "소속",
      },
      accessory: {
        type: "static_select",
        action_id: "Department_select",
        placeholder: {
          type: "plain_text",
          text: "00팀",
          emoji: true,
        },
        options: deptOpts,
      },
    },
    {
      type: "section",
      block_id: "Start",
      text: {
        type: "mrkdwn",
        text: "휴가 시작",
      },
      accessory: {
        type: "datepicker",
        initial_date: "1990-04-28", // TODO: Date.now
        placeholder: {
          type: "plain_text",
          text: "날짜를 선택해주세요",
          emoji: true,
        },
        action_id: "start_date",
      },
    },
    {
      type: "section",
      block_id: "End",
      text: {
        type: "mrkdwn",
        text: "휴가 끝(포함)",
      },
      accessory: {
        type: "datepicker",
        placeholder: {
          type: "plain_text",
          text: "날짜를 선택해주세요",
          emoji: true,
        },
        action_id: "end_date",
      },
    },
    {
      type: "input",
      block_id: "Reason",
      element: {
        type: "plain_text_input",
        action_id: "reason_input",
        multiline: true,
        placeholder: {
          type: "plain_text",
          text: "ex. 개인 사유",
        },
      },
      label: {
        type: "plain_text",
        text: "사유",
        emoji: true,
      },
    },
  ],
} as View;
