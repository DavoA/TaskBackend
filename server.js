const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const port = 3001;
const routes = require("./routes");

const mongodbHost = process.env.MONGO_HOST;
const mongodbPort = process.env.MONGO_PORT;
const mongodbUsername = process.env.MONGO_LOGIN;
const mongodbPassword = process.env.MONGO_PASSWORD;

const mongodbUrl = `mongodb://${mongodbUsername}:${mongodbPassword}@${mongodbHost}:${mongodbPort}/todos`;

main().catch((err) => console.log(err));

async function main(mongodbUrl) {
  await mongoose.connect(, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}
