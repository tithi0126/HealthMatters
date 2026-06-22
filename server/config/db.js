import mongoose from 'mongoose';

global.isDatabaseOffline = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/healthmatters');
    console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
    global.isDatabaseOffline = false;
  } catch (error) {
    console.warn('\n==================================================================');
    console.warn('[WARNING] Failed to connect to MongoDB server.');
    console.warn(`Error message: ${error.message}`);
    console.warn('The Health Matters Platform will operate in [OFFLINE / MOCK IN-MEMORY] mode.');
    console.warn('All database schemas are compiled and active, but submissions will be stored in-memory.');
    console.warn('==================================================================\n');
    global.isDatabaseOffline = true;
  }
};

export default connectDB;
