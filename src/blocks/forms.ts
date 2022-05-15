import { Block, KnownBlock, View } from "@slack/bolt";

export const buildModal = {
  type: "modal",
  callback_id: "form_build",
  title: {
    type: "plain_text",
    text: "Antfred",
    emoji: true,
  },
  submit: {
    type: "plain_text",
    text: "Save",
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
        text: "💾 Form Builder",
        emoji: true,
      },
    },
    {
      type: "divider",
    },
    {
      type: "input",
      block_id: "form_name",
      element: {
        type: "plain_text_input",
        action_id: "name_input",
      },
      label: {
        type: "plain_text",
        text: "Form name (need as indentifier)",
        emoji: true,
      },
    },
    {
      type: "input",
      block_id: "form_content",
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: "content_input",
      },
      label: {
        type: "plain_text",
        text: "Input your form",
        emoji: true,
      },
    },
  ],
} as View;

export const withFormattedForm = (
  name: string,
  rawContent: string,
  authorId: string,
) =>
  [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `📁 Form: ${name}`,
        emoji: true,
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${rawContent}`,
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
          text: `by <@${authorId}>`,
        },
      ],
    },
  ] as Array<Block | KnownBlock>;

export const getFormList = (list: string) =>
  [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "📂 Saved Forms",
        emoji: true,
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${list}`,
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
          text: "Use a form with `/forms use $form_name`\n\n> ex. */forms use bug_report*",
        },
      ],
    },
  ] as Array<Block | KnownBlock>;
