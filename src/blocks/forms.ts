import { Block, KnownBlock, View } from "@slack/bolt";

export const createFormModal = {
  type: "modal",
  callback_id: "form_create",
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
      block_id: "title",
      element: {
        type: "plain_text_input",
        action_id: "title_input",
        placeholder: {
          type: "plain_text",
          text: "제목을 입력해주세요",
        },
      },
      label: {
        type: "plain_text",
        text: "Title",
        emoji: true,
      },
    },
    {
      type: "input",
      block_id: "content",
      element: {
        type: "plain_text_input",
        multiline: true,
        action_id: "content_input",
        placeholder: {
          type: "plain_text",
          text: "내용을 입력해주세요",
        },
      },
      label: {
        type: "plain_text",
        text: "Content",
        emoji: true,
      },
    },
  ],
} as View;

export const getFormList = (forms: Array<any>) => {
  const formSections = forms.reduce((prev, form) => {
    const { id, title, author, content } = form;
    // TODO: Add replacerFn for more escaped characters
    const escapedContent = content.replaceAll("\\n", "\n");
    prev.push(
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `◾️ *${title}*`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: escapedContent,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "🗑",
          },
          style: "danger",
          action_id: "delete_form",
          value: id,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Author <@${author.id}>`,
          },
        ],
      },
      {
        type: "divider",
      },
    );
    return prev;
  }, []);
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "📂 Saved Forms",
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "Copy to use it:",
        },
      ],
    },
    {
      type: "divider",
    },
    ...formSections,
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Create New Form",
          },
          style: "primary",
          action_id: "create_form",
        },
      ],
    },
  ] as Array<Block | KnownBlock>;
};
