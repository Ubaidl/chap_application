import mongoose from 'mongoose'

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection failed', err);
    }
};
export default dbConnection;