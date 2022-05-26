import { View } from "@slack/bolt";

type InitialValues = {
  reportUser: string;
  currentUser: string;
};

const DEPARTMENTS = ["개발", "연구", "프로덕트", "디자인", "운영", "경영"];
const deptOpts = DEPARTMENTS.map((curr) => ({
  text: {
    type: "plain_text",
    text: `${curr}팀`,
  },
  value: `${curr}팀`,
}));

export const getOffModal = ({ reportUser, currentUser }: InitialValues) =>
  ({
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
          text: "✈️ 휴가 신청서 (WIP)",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        block_id: "Approver",
        text: {
          type: "mrkdwn",
          text: "참조 대상",
        },
        accessory: {
          type: "users_select",
          action_id: "a_select",
          initial_user: reportUser,
          placeholder: {
            type: "plain_text",
            text: "참조 대상",
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
          action_id: "r_select",
          initial_user: currentUser,
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
          action_id: "d_select",
          focus_on_load: true,
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
          text: "시작",
        },
        accessory: {
          type: "datepicker",
          placeholder: {
            type: "plain_text",
            text: "시작일",
            emoji: true,
          },
          action_id: "s_date",
        },
      },
      {
        type: "section",
        block_id: "End",
        text: {
          type: "mrkdwn",
          text: "끝",
        },
        accessory: {
          type: "datepicker",
          placeholder: {
            type: "plain_text",
            text: "마감일",
            emoji: true,
          },
          action_id: "e_date",
        },
      },
      {
        type: "input",
        block_id: "Reason",
        element: {
          type: "plain_text_input",
          action_id: "r_input",
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
  } as View);
