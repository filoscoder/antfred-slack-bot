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
        text: "💾 폼 작성하기",
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
          text: "ex. Bug_report",
        },
      },
      label: {
        type: "plain_text",
        text: "템플릿 제목 (title)",
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
        text: "템플릿 내용 (content)",
        emoji: true,
      },
    },
  ],
} as View;

export const getFormList = (forms: Array<any>) => {
  const formSections = forms.reduce((prev, form) => {
    const { id, title, content, author } = form;
    // TODO: Add replacerFn for more escaped characters
    const escapedContent = content.replaceAll("\\n", "\n");
    prev.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `◆ *${title}* \n\n${escapedContent}\n\n _by <@${author.id}>_`,
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          emoji: true,
          text: "삭제",
        },
        style: "danger",
        action_id: "delete_form",
        value: id,
      },
    });
    return prev;
  }, []);
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "📂 저장된 템플릿 폼",
        emoji: true,
      },
    },
    {
      type: "divider",
    },
    ...formSections,
    {
      type: "divider",
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `💡 최대 45개 저장 가능. 현재: *${forms.length}*`,
        },
      ],
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "New Form",
          },
          style: "primary",
          action_id: "create_form",
        },
      ],
    },
  ] as Array<Block | KnownBlock>;
};
