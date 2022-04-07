import mongoose from 'mongoose';
import Logger from '../../utils/logger';

const connect = async (): Promise<void> => {
  const dbUri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  //const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0-wczdf.mongodb.net/kwaba?retryWrites=true&w=majority`;

  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      Logger.info('Successfully connected to the database');
    })
    .catch((error) => {
      Logger.error('Error occurred while connecting to the database', error);
      process.exit(1);
    });
};

export default connect;
