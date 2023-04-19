const Queries = Object.freeze({
    CALL_USER_FUNCTION: 'SELECT * FROM registernewuser(:name,:email,:phone,:dob,:createdAt,:updatedAt);'
});

module.exports = Queries;