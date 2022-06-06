require("dotenv").config();

const CONFIG = {
  SETUP: {
    appToken: process.env.SLACK_APP_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    port: 3000,
  },
  DB: {
    USER: process.env.DB_USER,
    PW: process.env.DB_PW,
    CLUSTER: process.env.DB_USER,
  },
  AWS: {
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_KEY: process.env.SECRET_KEY
  }
};

export default CONFIG;
