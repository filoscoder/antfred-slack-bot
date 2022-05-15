import { App } from "@slack/bolt";
import CONFIG from "./config";
import forms from "./handlers/forms";
import { dbConnection } from "./db";

const app = new App(CONFIG.SETUP);

forms(app);

(async () => {
  // Start the app
  await app.start();
  process.stdout.write("⚡️ Antfred App is running!");
  await dbConnection();
})();
