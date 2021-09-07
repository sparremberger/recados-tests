import { Request, Response, Router } from "express";
import { Recado } from "../db/entities/recados.entities";
const Redis = require("ioredis");
const redis = new Redis();

const storeRecado = async (req: Request, res: Response) => {
    const { recado, detalhes } = req.body;
    console.log(req.body);

    const entity = await new Recado(recado, detalhes).save();
    // já põe no redis o recado logo de cara
    let redisRecado = {
        uid: entity.uid,
        data: {
            recado: entity.recado,
            detalhes: entity.detalhes,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        },
    };

    /*await redis.set(
        redisRecado.uid,
        JSON.stringify(redisRecado.data),
        "EX",
        43200
    );*/

    return res.status(200).json(entity); //entity
};

const getRecados = async (req: Request, res: Response) => {
    // verifica se existe no redis e puxa os dados de lá
    /*let keys = await redis.keys("*");
    let redisData: any = [];

    for (let i = 0; i < keys.length; i++) {
        let data = await redis.get(keys[i]);
        data = JSON.parse(data);
        redisData.push({
            recado: data.recado,
            detalhes: data.detalhes,
            uid: keys[i],
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }

    console.log(redisData);

    if (redisData.length > 0) {
        return res.status(200).json(redisData);
    }*/

    // não tendo no redis, busca no DB e insere no redis em seguida
    const recados = await Recado.find();
    /*  const toRedis: any = recados.map((recado: any) => {
        let rRecado = {};
        rRecado = {
            uid: recado.uid,
            data: {
                recado: recado.recado,
                detalhes: recado.detalhes,
                createdAt: recado.createdAt,
                updatedAt: recado.updatedAt,
            },
        };

        return rRecado;
    });

    for (let i = 0; i < toRedis.length; i++) {
        await redis.set(
            toRedis[i].uid,
            JSON.stringify(toRedis[i].data),
            "EX",
            43200
        );
    }*/

    return res.status(200).json(recados);
};

const delRecado = async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log(id);
    const recadoById = await Recado.delete(id);
    //let recadoRedis = await redis.del(id);
    return res.status(200).json(recadoById);
};

export { storeRecado, getRecados, delRecado };
