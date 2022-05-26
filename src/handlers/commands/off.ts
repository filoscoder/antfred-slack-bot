import { App } from "@slack/bolt";
import { Off } from "../../db/models";
import { getOffModal } from "../../blocks/off";

export const off = (appInstance: App) => {
  appInstance.command(/\b(off)/, async ({ body, client, ack, logger }) => {
    try {
      const { user_id } = body;
      const initialValues = {
        reportUser: "U02EGR7957B",
        currentUser: user_id,
      };

      await client.views.open({
        //@ts-ignore
        trigger_id: body.trigger_id,
        view: getOffModal(initialValues),
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
          values: { Approver, Reporter, Department, Start, End, Reason },
        },
      } = view;
      // ! Check select action resolvers
      const approver = Approver["a_select"].selected_user;
      const reporter = Reporter["r_select"].selected_user;
      const department = Department["d_select"].selected_option?.value;
      const start = Start["s_date"].selected_date;
      const end = End["e_date"].selected_date;
      const reason = Reason["r_input"].value;

      const created = await Off.create({
        approver,
        reporter,
        department,
        start,
        end,
        reason,
        author: user,
      });

      if (created) {
        await client.chat.postEphemeral({
          channel: user.id,
          text: `Day off registered ✈️`,
          blocks: [
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `◾️ <@${approver}>님께 휴가 신청서 전달 완료!`,
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
  });
};
