import express from "express";
import {
    storeRecado,
    getRecados,
    delRecado,
} from "../controllers/recadoController";

const router = express.Router();

router.route("/recados").post(storeRecado);
router.route("/recados").get(getRecados);
router.route("/recados").delete(delRecado);

export default router;
