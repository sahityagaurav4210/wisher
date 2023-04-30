require('dotenv/config');
const Bootup = require("./server");
const colors = require("colors");

colors.enable();

const start = async function () {
  try {
    const url = await Bootup.start();
    console.info(`Server is started and listening on url ${url}`.cyan);

    await Bootup.connect();
  } catch (error) {
    console.log(error);
  }
};

console.log('calling start method.');
console.log(process.env);
start();
