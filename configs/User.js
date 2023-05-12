const users = [];

const addNewUser = function (payload = {}) {
  const found = users.reduce(function (accumulator, currValue) {
    if (currValue.phone !== payload.phone) accumulator.push(true);
    else accumulator.push(false);

    return accumulator;
  }, []);

  if (!found.includes(false)) {
    users.push(payload);
    return true;
  } else return false;
};

const getAllRegisterUser = function () {
  return users;
};

const getSpecificUser = function (phone) {
  const user = users.filter((element) => element.phone === phone && element);
  return user;
};

module.exports = { addNewUser, getAllRegisterUser, getSpecificUser };
