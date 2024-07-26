const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('mongoDb Connected')
  } catch (err) {
    console.log("Eror connecting to", err.message)
  }
};

module.exports = connectToMongoDB;
