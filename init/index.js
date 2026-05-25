const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

main()
  .then(() => {
    console.log(`Database connected successfully...`);
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://localhost:27017/wanderlust");
}

const initDB = async () => {
  await listing.deleteMany({});
  initData.data = initData.data.map((el) => ({
    ...el,
    owner: "6a0beb3e6b1ae8792e871351",
  }));
  await listing.insertMany(initData.data);
  console.log("data was initialised");
};

initDB();
