require('dotenv/config');

const Bootup = require('./server');
const colors = require('colors');

colors.enable();


const start = async function () {
  try {
    const url = await Bootup.start();
    await Bootup.connect();

    console.info(`Server is started and listening on url ${url}`);
  } catch (error) {
    console.log(error);
  }
}

start();