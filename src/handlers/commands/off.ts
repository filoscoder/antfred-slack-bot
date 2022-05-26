import { App } from "@slack/bolt";
import { BugReports } from "../../db/models";
import { offModal } from "../../blocks/off";

export const off = (appInstance: App) => {
  appInstance.command(/\b(off)/, async (event) => {
    const { body, client, ack, logger } = event;
    try {
      await client.views.open({
        //@ts-ignore
        trigger_id: body.trigger_id,
        view: offModal,
      });

      await ack();
    } catch (error) {
      logger.error(error);
    }
  });

  appInstance.view("off", async ({ ack, body, logger, client }) => {
    try {
      const { user, view } = body;
      const {
        state: {
          values: { Channel, Browser, Url, Account, Reproduction },
        },
      } = view;
      const channel = Channel["channel_select"].selected_channel || user.id;
      const browser = Browser["browser_option"].selected_option?.value;
      const url = Url["url_input"].value;
      const account = Account["account_input"].value;
      const reproduction = Reproduction["reproduction_input"].value;

      await BugReports.create({
        channel,
        browser,
        url,
        account,
        reproduction,
        author: user,
      });

      await client.chat.postMessage({
        channel,
        text: `🚨 <@${user.id}>\n\n‣ 1. *사용중인 환경* : ${browser}\n‣ 2. *페이지 주소* : ${url}\n‣ 3. *사용중인 계정* : ${account}\n‣ 4. *버그 재현* : ${reproduction}`,
      });

      await ack();
    } catch (error) {
      logger.error(error);
    }
  });
};
