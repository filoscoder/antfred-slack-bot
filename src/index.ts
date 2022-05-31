import * as commands from "./handlers/commands";

import { App } from "@slack/bolt";
import CONFIG from "./config";
import { dbConnection } from "./db";

const app = new App(CONFIG.SETUP);

commands.bug(app);
commands.form(app);
commands.help(app);
commands.off(app);
commands.coffeeChat(app);

(async () => {
  // Start the app
  await app.start();
  await dbConnection();
  process.stdout.write("⚡️ Antfred App is ready to help 🧐\n");
})();
