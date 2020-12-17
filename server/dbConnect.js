import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) return;

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('mongodb connected...'))
    .catch(err => console.log(err));
}

export default dbConnect;