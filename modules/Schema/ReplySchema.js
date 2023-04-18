const Types = Object.freeze({
  Array: 'array',
  Object: 'object',
  String: 'string',
  Int: 'integer'
});

const BadReq = Object.freeze({
  type: Types.Object,
  properties: {
    name: {
      type: Types.String
    },
    error: {
      type: Types.String
    },
    code: {
      type: Types.Int
    }
  }
});

const Created = Object.freeze({
  type: Types.Object,
  properties: {
    message: {
      type: Types.String
    },
    user: {
      type: Types.Object,
      properties: {
        id: {
          type: Types.Int
        },
        name: {
          type: Types.String
        },
        email: {
          type: Types.String
        },
        phone: {
          type: Types.Int
        },
        dob: {
          type: Types.String
        }
      }
    }
  }
});

class Schema {
  static get registerNewUserSchama() {
    return {
      response: {
        201: Created,
        400: BadReq
      }
    }
  }
}

module.exports = Schema;