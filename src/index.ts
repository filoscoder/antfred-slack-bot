import { App } from "@slack/bolt";
import CONFIG from "./config";

const app = new App(CONFIG.SETUP);

/* Add functionality here */
app.message("AD", async ({ message, say }) => {
  console.log(message);
  // say() sends a message to the channel where the event was triggered
  await say(`Amandaniel ❤️ 4ever!!!!`);
});

// Listen for an event from the Events API
// app.event(eventType, fn);

// Convenience method to listen to only `message` events using a string or RegExp
// app.message([pattern ,] fn);

// Listen for an action from a Block Kit element (buttons, select menus, date pickers, etc)
// app.action(actionId, fn);

// Listen for dialog submissions
// app.action({ callback_id: callbackId }, fn);

// Listen for a global or message shortcuts
// app.shortcut(callbackId, fn);

// Listen for slash commands
// app.command(commandName, fn);

// Listen for view_submission modal events
// app.view(callbackId, fn);

// Listen for options requests (from select menus with an external data source)
// app.options(actionId, fn);

(async () => {
  // Start the app
  await app.start();

  console.log("⚡️ Flash Forms is running!");
})();
