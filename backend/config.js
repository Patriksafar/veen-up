const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  mongoConnect: `mongodb+srv://admin:${process.env.MONGODB_PWD}@cluster0-u47iv.mongodb.net/test?retryWrites=true&w=majority`
};
