import { createFormModal, getFormList } from "../../blocks/forms";

import { App } from "@slack/bolt";
import { Forms } from "../../db/models";

export const form = (appInstance: App) => {
  appInstance.command(/form|f/, async ({ body, say, ack, logger }) => {
    try {
      const { text } = body;
      const args = text.toLowerCase().split(" ");
      const firstArg = args.shift();
      if (firstArg) {
        await say({
          text: `The argument *${firstArg}* is not valid 😅\n\nPlease try one of these */forms [list, build]*`,
        });
        return await ack();
      }
      const forms = await Forms.find();
      await say({
        blocks: getFormList(forms),
        text: "!Form_list", // `text` field need to avoid warnings
      });

      await ack();
    } catch (error) {
      logger.error(error);
    }
  });

  appInstance.action("delete_form", async ({ ack, say, logger, action }) => {
    try {
      //@ts-ignore
      const formId = action?.value;
      const deleted = await Forms.findByIdAndDelete(formId);

      if (deleted) {
        await say({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `Form: *${deleted.title}* deleted successfully 🧻`,
              },
            },
          ],
        });
      }
      await ack();
    } catch (error) {
      logger.error(error);
    }
  });
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
      await Forms.create({
        title,
        content,
        author: user,
      });
      await client.chat.postMessage({
        channel: user.id,
        text: `Form: *${title}* created successfully 🎉`,
      });

      await ack();
    } catch (error) {
      logger.error(error);
    }
  });
};
