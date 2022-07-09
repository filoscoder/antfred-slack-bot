import { App } from "@slack/bolt";
import apiRequest from "../../api";

export const start = (appInstance: App) => {
  appInstance.command(
    /\b(in|start)/,
    async ({ body, respond, ack, logger }) => {
      try {
        const { user_id } = body;
        // TODO: Connect with WantedSpace API

        await apiRequest.post("/users.setPresence", {
          presence: "auto",
        });
        await apiRequest.post("/users.profile.set", {
          user: user_id,
          profile: {
            status_text: "Working..",
            status_emoji: "💡",
          },
        });
        await respond({
          response_type: "ephemeral",
          text: `👋 안녕하세요 <@${user_id}>님!`,
        });
        await ack();
      } catch (error) {
        logger.error(error);
      }
    },
  );
};
