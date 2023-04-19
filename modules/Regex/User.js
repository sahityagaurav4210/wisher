const Rules = {
    name: new RegExp(/(^[A-Za-z\s]{3,}$)/),
    email: new RegExp(/(^[a-zA-Z0-9\.\-\_]{3,}[\@]{1}[a-z]{5,})(.com$|.in$|.co.in$|.net$)/),
}

module.exports = Rules;