import { createFormModal, getFormList } from "../../blocks/forms";

import { App } from "@slack/bolt";
import { Forms } from "../../db/models";

export const form = (appInstance: App) => {
  appInstance.command(/form|f/, async ({ ack, logger, respond }) => {
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
    async ({ ack, respond, logger, action }) => {
      try {
        //@ts-ignore
        const formId = action?.value;
        const deleted = await Forms.findByIdAndDelete(formId);

        if (deleted) {
          await respond({
            response_type: "ephemeral",
            text: `Form: *${deleted.title}* deleted successfully 🧻`,
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

  appInstance.view("form_create", async ({ ack, body, logger, respond }) => {
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

      await respond({
        response_type: "ephemeral",
        text: `Form: *${title}* created successfully 🎉`,
      });

      await ack();
    } catch (error) {
      logger.error(error);
    }
  });
};
