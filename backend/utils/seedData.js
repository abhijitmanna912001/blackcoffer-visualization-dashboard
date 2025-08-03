import dotenv from "dotenv";
import fs from "fs";
import { connectDB } from "../config/db.js";
import DataEntry from "../models/DataEntry.js";

dotenv.config();

await connectDB();

try {
  const raw = fs.readFileSync("../jsondata.json", "utf-8");
  const data = JSON.parse(raw);

  await DataEntry.deleteMany({});
  await DataEntry.insertMany(data);

  console.log("✅ Data seeded successfully");
  process.exit(0);
} catch (err) {
  console.error("❌ Failed to seed data:", err.message);
  process.exit(1);
}
