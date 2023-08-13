import request from "supertest";
import app, {configureEnv, getDbUri} from "../../src/app"
import mongoose from "mongoose";
import winston, {createLogger} from "winston";

configureEnv();

const logger = createLogger({
    level: "info",
    transports: [new winston.transports.Console()]
})

beforeEach(async () => {
    await mongoose.connect(getDbUri()).then(() => logger.info("Connected to database"))
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe("GET /users", () => {
    it("responds with a list of users", async () => {
        const response = await request(app).get("/users");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    })
})

describe("POST /users/new_user", () => {
    it("responds with a json containing the user ID", async () => {
        const response = await request(app).post("/users/new_user").send({
            firstName: "Test",
            lastName: "User",
            email: "test@user.com",
            username: "testUser",
            password: "password",
            role: "test"
        });

        expect(response.status).toBe(201);
        expect(typeof response.body.id).toEqual("string");
    })
})