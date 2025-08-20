import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: Cached;
}

async function dbConnect() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

  if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
  }

  if (global.mongoose.conn) return global.mongoose.conn;

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGODB_URI!);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default dbConnect;
