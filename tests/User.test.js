require("dotenv/config");

const fastify = require("fastify")();
const Schema = require("../modules/Schema/ReplySchema");

const {
  registerNewUserValidator,
  getRegisteredUsersValidator,
} = require("../modules/Validations/User");
const {
  addNewUser,
  getAllRegisterUser,
  getSpecificUser,
} = require("../configs/User");

describe("controllers.User.js", function () {
  beforeAll(async function () {
    fastify.post(
      "/user/register",
      {
        schema: Schema.registerNewUserSchama,
        preHandler: [registerNewUserValidator],
      },
      async function (request, reply) {
        if (addNewUser(request.body)) {
          return reply.code(201).send({
            message: "Registered successfuly",
            user: {
              name: "Ballu Sir",
              email: "ballu@gmail.com",
              dob: "2000-06-25",
              phone: 9646560935,
            },
          });
        } else {
          return reply.code(400).send({
            name: "RecordExistsException",
            error: "Specified user already exists",
            code: 400,
          });
        }
      }
    );

    fastify.get(
      "/user/register",
      { preHandler: [getRegisteredUsersValidator] },
      function (request, reply) {
        const users = getAllRegisterUser();

        return reply.code(200).send({
          message: "Request successful",
          matchedCount: users.length,
          record: users,
        });
      }
    );

    fastify.get(
      "/user/:phone",
      { preHandler: [getAllRegisterUser] },
      function (request, reply) {
        const user = getSpecificUser(request.params.phone);

        if (user && user.length) {
          return reply.code(200).send({
            message: "Request successful",
            matchedCount: 1,
            record: [
              {
                id: 1,
                name: "Gurbaksish Singh Virk",
                email: "gurbaksish.singh@digimantra.com",
                phone: "9646560935",
                dob: "1998-04-29T00:00:00.000Z",
              },
            ],
          });
        } else {
          return reply.code(404).send({
            code: 404,
            name: "RecordNotExistsException",
            error: "Phone 9646560930 does not exists",
          });
        }
      }
    );

    await fastify.listen({ port: 3000 });
  });

  afterAll(async function () {
    await fastify.close();
  });

  describe("POST /user/register", function () {
    it("should give 400 response on receiving in-complete payload", async function () {
      const req = {
        name: "Ballu Sir",
        email: "ballu@gmail.com",
        dob: "2000-06-25",
        ipAddress: "172.37.2.10",
      };

      const response = await fastify.inject({
        method: "POST",
        payload: req,
        url: "/user/register",
        headers: {
          "content-type": "application/json",
        },
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(
        JSON.stringify({
          error: "Phone is required",
          message: "Invalid Payload",
        })
      );
    });

    it("should return 201 when correct payload is passed", async function () {
      const req = {
        name: "Ballu Sir",
        email: "ballu@gmail.com",
        dob: "2000-06-25",
        phone: 9646560935,
        ipAddress: "172.37.2.10",
      };

      const response = await fastify.inject({
        method: "POST",
        payload: req,
        url: "/user/register",
        headers: {
          "content-type": "application/json",
        },
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(
        JSON.stringify({
          message: "Registered successfuly",
          user: {
            name: "Ballu Sir",
            email: "ballu@gmail.com",
            phone: 9646560935,
            dob: "2000-06-25",
          },
        })
      );
    });

    it("should reply 400 in case of same phone number", async function () {
      const req = {
        name: "Ballu Sir",
        email: "ballu@gmail.com",
        dob: "2000-06-25",
        phone: 9646560935,
        ipAddress: "172.37.2.10",
      };

      const response = await fastify.inject({
        method: "POST",
        payload: req,
        url: "/user/register",
        headers: {
          "content-type": "application/json",
        },
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(
        JSON.stringify({
          name: "RecordExistsException",
          error: "Specified user already exists",
          code: 400,
        })
      );
    });
  });

  describe("GET /user/register", function () {
    it("should give complete list of user", async function () {
      const response = await fastify.inject({
        method: "GET",
        url: "/user/register?ipAddress=172.37.2.10",
      });

      expect(response.statusCode).toBe(200);
    });

    it("should give 400 response on receiving incomplete payload", async function () {
      const response = await fastify.inject({
        method: "GET",
        url: "/user/register",
      });

      expect(response.statusCode).toBe(400);
    });

    it("should give a specific user detail", async function () {
      const response = await fastify.inject({
        method: "GET",
        url: "/user/register",
      });

      expect(response.statusCode).toBe(200);
    });
  });
});
