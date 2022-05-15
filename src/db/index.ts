import mongoose from "mongoose";
import CONFIG from "../config";

export const dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${CONFIG.DB.USER}:${CONFIG.DB.PW}@${CONFIG.DB.CLUSTER}.wziyf.mongodb.net?retryWrites=true&w=majority`,
    );

    process.stdout.write(`✅ Connected to [${CONFIG.DB.CLUSTER}] DB\n`);
  } catch (error) {
    const errMsg = `❌ Error on DB connection: ${error}\n`;
    process.stdout.write(errMsg);
  }
};
