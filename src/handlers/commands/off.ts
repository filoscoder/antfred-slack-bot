import { addVarsToHtml, getKrToday } from "../../utils";

import { App } from "@slack/bolt";
import { Off } from "../../db/models";
import { generateOffPdf } from "../../helpers/pdf";
import { getOffModal } from "../../blocks/off";
import { sendEmail } from "../../helpers/email";

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
    const { user, view } = body;
    try {
      const {
        state: {
          values: {
            Approver,
            Reporter,
            Department,
            Start,
            End,
            Reason,
            Comment,
          },
        },
      } = view;
      // ! Check select action resolvers
      const approver = Approver["a_select"].selected_user || "";
      const reporter = Reporter["r_select"].selected_user || "";
      const department = Department["d_select"].selected_option?.value || "";
      const start = Start["s_date"].selected_date || "";
      const end = End["e_date"].selected_date || "";
      const reason = Reason["r_input"].value || "";
      const comment = Comment["c_input"].value || "";

      const created = await Off.create({
        approver,
        reporter,
        department,
        start,
        end,
        reason,
        comment,
        author: user,
      });

      if (created) {
        await ack();
        const { plainToday, krToday } = getKrToday();
        const { profile } = await client.users.profile.get({
          user: reporter,
        });

        const htmlData = {
          name: profile?.real_name || profile?.display_name || "",
          department,
          start,
          end,
          today: krToday,
          reason,
          comment,
        };

        const pdfAttachment = await generateOffPdf(
          `${plainToday}_off_${user.name}.pdf`,
          htmlData,
        );

        // TODO: get manager email programaticaly
        const managerEmail = "sodium@ant-inc.co";
        await sendEmail(
          `[?????? ??????] ${user.name}??? ??????????????????`,
          [managerEmail, profile?.email || ""],
          [pdfAttachment],
        );

        await client.chat.postEphemeral({
          channel: user.id,
          user: user.id,
          text: "?????? ?????? ?????? ??????",
          attachments: [
            {
              color: "good",
              title: "\n",
              text: "????????? ???????????? ??????????????????.\n?????? ?????? ??????????????????.",
              fallback: "?????? ?????? ?????? ??????",
              mrkdwn_in: ["text"],
            },
          ],
        });
        return;
      }
      throw new Error("Something went wrong");
    } catch (error) {
      logger.error(error);
      await client.chat.postEphemeral({
        channel: user.id,
        user: user.id,
        text: "?????? ?????? ?????? ??????",
        attachments: [
          {
            color: "danger",
            title: "\n",
            text: "?????? ????????? ??????????????????. ?????? ??????????????????.",
            fallback: "?????? ?????? ?????? ??????",
            mrkdwn_in: ["text"],
          },
        ],
      });
    }
  });

  appInstance.action(
    /\b(a_select|d_select|s_date|e_date)/,
    async ({ ack, logger, body }) => {
      try {
        // ? any logic to implement?

        await ack();
      } catch (error) {
        logger.error(error);
      }
    },
  );
  appInstance.action("r_select", async ({ ack, logger, body }) => {
    try {
      // @ts-ignore
      const { actions, user } = body;
      const selectedUser = actions[0].selected_user;
      const currentUser = user.id;

      if (currentUser === selectedUser) {
        await ack();
      }
    } catch (error) {
      logger.error(error);
    }
  });
};
