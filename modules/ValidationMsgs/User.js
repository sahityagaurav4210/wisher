const User = Object.freeze({
    name: {
        "any.required": "Name is required",
        "string.pattern.base": "Please enter name in valid format",
        "string.base": "Name must be of string type"
    },
    email: {
        "string.pattern.base": "Please enter email in valid format",
        "string.base": "Email must be of string type"
    },
    phone: {
        "any.required": "Phone is required",
        "number.base": "Phone must be of number type",
        "number.max": "Phone must be of 10 digits."
    },
    dob: {
        "any.required": "Date is required",
        "date.format": "Invalid DOB type.",
        "date.base": "Date must be of date type",
    }
});

module.exports = User;