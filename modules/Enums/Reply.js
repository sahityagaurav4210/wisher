const ReplyCodes = Object.freeze({
    OK: 200,
    CREATED: 201,
    UPDATED: 202,
    BADRESPONSE: 400,
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
    LARGEPAYLOAD: 413,
    NOTFOUND: 404,
    ERROR: 500,
    UNAVAILABLE: 503
});

module.exports = ReplyCodes;