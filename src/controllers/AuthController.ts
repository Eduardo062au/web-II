import express, { Request, Response } from "express";

const router = express.Router();

router.get("/a", (req: Request, res: Response) => {
    res.send("Bem-Vindo Pessoal!");
});

export default router;
