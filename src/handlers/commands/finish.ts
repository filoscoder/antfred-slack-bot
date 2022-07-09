import { App } from "@slack/bolt";
import apiRequest from "../../api";

export const finish = (appInstance: App) => {
  appInstance.command(
    /\b(out|finish)/,
    async ({ body, respond, ack, logger }) => {
      try {
        const { user_id } = body;
        // TODO: Connect with WantedSpace API

        await apiRequest.post("/users.setPresence", {
          presence: "away",
        });
        await apiRequest.post("/users.profile.set", {
          user: user_id,
          profile: {
            status_text: "Off work",
            status_emoji: "❌",
          },
        });
        await respond({
          response_type: "ephemeral",
          text: `🫡 수고하셨습니다 <@${user_id}>님!`,
        });
        await ack();
      } catch (error) {
        logger.error(error);
      }
    },
  );
};
