import { createFormModal, getFormList } from "../../blocks/forms";

import { App } from "@slack/bolt";
import { Forms } from "../../db/models";

export const form = (appInstance: App) => {
  appInstance.command(/\b(form|f)/, async ({ ack, logger, respond }) => {
    try {
      const forms = await Forms.find();
      await respond({
        response_type: "ephemeral",
        blocks: getFormList(forms),
        text: "Saved forms",
      });

      await ack();
    } catch (error) {
      logger.error(error);
    }
  });

  appInstance.action(
    "delete_form",
    async ({ ack, logger, action, client, body }) => {
      try {
        const { user } = body;
        //@ts-ignore
        const formId = action?.value;
        const deleted = await Forms.findByIdAndDelete(formId);

        if (deleted) {
          await client.chat.postEphemeral({
            channel: user.id,
            text: `Form deleted successfully 🧻`,
            blocks: [
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: `◾️ Deleted form: *${deleted.title}*`,
                  },
                ],
              },
            ],
            user: user.id,
          });
        }
        await ack();
      } catch (error) {
        logger.error(error);
      }
    },
  );
  appInstance.action("create_form", async ({ ack, body, logger, client }) => {
    try {
      await client.views.open({
        //@ts-ignore
        trigger_id: body.trigger_id,
        view: createFormModal,
      });
      await ack();
    } catch (error) {
      logger.error(error);
    }
  });

  appInstance.view("form_create", async ({ ack, body, logger, client }) => {
    try {
      const {
        user,
        view: {
          state: { values },
        },
      } = body;
      const title = values["title"]["title_input"].value?.trim();
      const content = values["content"]["content_input"].value;

      const created = await Forms.create({
        title,
        content,
        author: user,
      });

      if (created) {
        await client.chat.postEphemeral({
          channel: user.id,
          text: `Form created successfully 🎉`,
          blocks: [
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `◾️ Created form: *${created.title}*`,
                },
              ],
            },
            {
              type: "divider",
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: created.content,
              },
            },
          ],
          user: user.id,
        });
      }

      await ack();
    } catch (error) {
      logger.error(error);
    }
  });
};
