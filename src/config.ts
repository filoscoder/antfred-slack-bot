require("dotenv").config();

const CONFIG = {
  SETUP: {
    appToken: process.env.SLACK_APP_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    port: 3000,
  },
};

export default CONFIG;
