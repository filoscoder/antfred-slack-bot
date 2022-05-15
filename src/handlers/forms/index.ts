import { App } from "@slack/bolt";
import { buildModal, getFormList, withFormattedForm } from "../../blocks/forms";
import { Forms } from "../../db/models";

const forms = (appInstance: App) => {
  appInstance.command(/form|f/, async ({ body, say, client, ack, logger }) => {
    try {
      const { text } = body;
      const args = text.toLowerCase().split(" ");
      const firstArg = args.shift();
      const restArgs = args.join(" ");

      switch (firstArg) {
        case "list":
          const forms = await Forms.find();
          const mrkdwnNameList = forms.reduce((acc, curr) => {
            return `${acc}\n• ${`${curr.name}`} (by <@${curr.author.id}>)`;
          }, "") as string;
          await say({
            blocks: getFormList(mrkdwnNameList),
          });
          break;
        case "build":
          await client.views.open({
            trigger_id: body.trigger_id,
            view: buildModal,
          });
          break;

        case "use":
          const form = await Forms.findOne({ name: restArgs });
          if (form) {
            const { author, name, content } = form;
            await say({
              blocks: withFormattedForm(name, content, author?.id),
            });
            break;
          }
          await say({
            text: `Can't find form *${restArgs}* 🧐\n\nPlease check the form name with */forms list*`,
          });
          break;

        case "remove":
          const { deletedCount } = await Forms.deleteOne({ name: restArgs });
          if (deletedCount) {
            await say({
              text: `🗑 *${restArgs}* form removed succesfully!`,
            });
            break;
          }
          await say({
            text: `Can't find form *${restArgs}* 🧐\n\nPlease check the form name with */forms list*`,
          });
          break;

        default:
          await say({
            text: `The argument *${firstArg}* is not valid 😅\n\nPlease try one of these */forms [list, build, use]*`,
          });
          break;
      }
      await ack();
    } catch (error) {
      logger.error(error);
    }
  });

  appInstance.view("form_build", async ({ ack, body, logger, client }) => {
    const {
      user,
      view: {
        state: { values },
      },
    } = body;
    const formName = values["form_name"]["name_input"].value?.trim();
    const formContent = values["form_content"]["content_input"].value;
    await Forms.create({
      name: formName,
      content: formContent,
      author: user,
    });
    await client.chat.postMessage({
      channel: user.id,
      text: `🎉 *${formName}* form saved succesfully!`,
    });

    await ack();
    logger.info("Request approved 👍");
  });
};

export default forms;
