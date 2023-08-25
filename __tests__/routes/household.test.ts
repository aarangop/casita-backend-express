import app, {configureEnv, getDbUri} from "../../src/app";
import winston, {createLogger} from "winston";
import request from "supertest";
import mongoose from "mongoose";
import {IHousehold} from "../../src/models/household.model";

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

describe("GET /household", () => {
  it("responds with a list of households", async () => {
    const response = await request(app).get("/household");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  })
});

describe("POST /household", () => {
  it("responds with a household that contains its new id", async () => {
    const response = await request(app).post("/household").send({
      address: `Street ${Math.floor(Math.random() * 100)}`,
      city: "Some made up city",
      country: "Gondor"
    })
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject<IHousehold>(response.body)
  })
})
