import { Recado } from "../entities/recados.entities";

export default class RecadosRepository {
    async getRecados(): Promise<any> {
        const recados = await Recado.find();

        return recados.map((recado) => {
            return {
                uid: recado.uid,
                recado: recado.recado,
                detalhes: recado.detalhes,
            };
        });
    }
}
