const joi = require('joi');

const Rules = require('../Regex/User');
const Message = require('../ValidationMsgs/User');
const ReplyCodes = require('../Enums/Reply');

let rspMsg;

const registerNewUserValidator = function (request, reply, done) {
    const data = {
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
        dob: request.body.dob,
        ipAddress: request.body.ipAddress
    }

    const schema = joi.object({
        name: joi.string().regex(Rules.name).required().messages(Message.name),
        email: joi.string().regex(Rules.email).optional().messages(Message.email),
        phone: joi.number().required().messages(Message.phone),
        dob: joi.date().iso().required().messages(Message.dob),
        ipAddress: joi.string().regex(Rules.ipAddress).required().messages(Message.ipAddress)
    });
    const result = schema.validate(data);

    if (!result.error)
        done();
    else {
        rspMsg = {
            message: 'Invalid Payload',
            error: result.error.details[0].message
        }

        return reply.code(ReplyCodes.BADRESPONSE).send(rspMsg);
    }
}

const getRegisteredUsersValidator = function (request, reply, done) {
    const data = {
        phone: request.params.phoneNumber,
        ipAddress: request.query.ipAddress
    }

    const schema = joi.object({
        phone: joi.number().optional().messages(Message.phone),
        ipAddress: joi.string().regex(Rules.ipAddress).required().messages(Message.ipAddress)
    });
    const result = schema.validate(data);

    if (!result.error)
        return done();
    else {
        rspMsg = {
            message: 'Invalid Payload',
            error: result.error.details[0].message
        }
        return reply.code(ReplyCodes.BADRESPONSE).send(rspMsg);
    }
}

module.exports = { registerNewUserValidator, getRegisteredUsersValidator };