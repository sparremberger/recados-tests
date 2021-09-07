import request from "supertest";
import app from "../app";
import recadoRoutes from "../routes/recadoRoute";
import express from "express";
import { Recado } from "../db/entities/recados.entities";
import Database from "../db/connection";

//jest.mock("ioredis");
const redis = require('ioredis');

redis.createClient = jest
  .fn()
  .mockReturnValue({
    on: jest.fn(),
    quit: jest.fn(),
    get: jest.fn(),
  });

const makeRecadoDB = async (): Promise<Recado> =>
    Recado.create({
        recado: "any_recado",
        detalhes: "any_detalhes",
        uid: "any_uid",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
    }).save();

describe("GET /", () => {
    beforeAll(async () => {
        app.use(express.json());
        app.use("/api", recadoRoutes);
        await new Database().openConnection();
    });

    beforeEach(async () => {
        await Recado.clear();

        jest.resetAllMocks();
    });
    describe("ao receber um get no caminho /", () => {
        test("deve receber status 200", async () => {
            makeRecadoDB();
            const response = await request(app).get("/").send({});
            console.log(response);
            expect(response.statusCode).toBe(200);
        });
    });

    describe("ao receber um get no caminho /api/recados", () => {
        test("deve receber status 200", async () => {
            //const recado = await makeRecadoDB();
            //jest.spyOn(IORedis.prototype, "get").mockResolvedValue(null);
            const response = await request(app).get("/api/recados").send();
            console.log(response);
            expect(response.statusCode).toBe(200);
        });
    });

    describe("ao receber um POST no caminho /api/recados", () => {
        test("deve receber status 200", async () => {

            const response = await request(app).post("/api/recados").send({ "recado" : "Teste redis", "detalhes" : "Agora até o redis funciona!"});
            console.log(response);
            expect(response.statusCode).toBe(200);
        });
    });

    describe("ao receber um DELETE no caminho /api/recados", () => {
        test("deve receber status 200", async () => {
            makeRecadoDB();
            const response = await request(app).delete("/api/recados").send({ "id" : "any_uid"});
            console.log(response);
            expect(response.statusCode).toBe(200);
        });
    });

});

describe("Test connection", () => {
    describe("ao tentar conectar com o database sem uma conexão aberta", () => {
        test("deve receber um erro", async () => {
            const response = await Database.getConnection();
            expect(response).toThrow;
        });
    });

    describe("ao tentar obter uma conexão existente", () => {
        test("deve receber Database.connection", async () => {
            await new Database().openConnection();
            const response = await Database.getConnection();
            //await new Database().disconnectDatabase();
            expect(response).toBeTruthy;
        });
    });

    describe("ao tentar desconectar com o DB", () => {
        test("deve receber Database.connection", async () => {
            expect(new Database().disconnectDatabase()).toBeTruthy;
        });
    });
});


