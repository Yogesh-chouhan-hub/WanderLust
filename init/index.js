const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

main()
  .then(() => {
    console.log(`Database connected successfully...`);
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const initDB = async () => {
  await listing.deleteMany({});
  initData.data = initData.data.map((el) => ({
    ...el,
    owner: "6a1436ad23c69e51902bddc2",
  }));
  await listing.insertMany(initData.data);
  console.log("data was initialised");
};

initDB();
