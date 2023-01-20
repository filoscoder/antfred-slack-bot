import CONFIG from "../config";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    mongoose.set({ strictQuery: false });
    await mongoose.connect(
      `mongodb+srv://${CONFIG.DB.USER}:${CONFIG.DB.PW}@${CONFIG.DB.CLUSTER}.wziyf.mongodb.net/${CONFIG.DB.CLUSTER}?retryWrites=true&w=majority`,
    );

    process.stdout.write(`✅ Connected to [${CONFIG.DB.CLUSTER}] DB\n`);
  } catch (error) {
    const errMsg = `❌ Error on DB connection: ${error}\n`;
    process.stdout.write(errMsg);
  }
};
