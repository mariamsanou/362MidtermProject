const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoString = process.env.MONGO_URI; 
        await mongoose.connect(mongoString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;