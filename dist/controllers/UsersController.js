"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Users_1 = require("../enity/Users");
const Situations_1 = require("../enity/Situations");
const PaginationServices_1 = require("../services/PaginationServices");
const router = express_1.default.Router();
// Listar usuários
router.get("/users", async (req, res) => {
    try {
        const repo = data_source_1.AppDataSource.getRepository(Users_1.User);
        const page = Number(req.query.page) || 1;
        const limite = Number(req.query.limit) || 10;
        const result = await PaginationServices_1.PaginationServices.paginate(repo, page, limite, { id: "DESC" });
        res.status(200).json(result);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuários!" });
        return;
    }
});
// Visualizar usuário por ID
router.get("/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const repo = data_source_1.AppDataSource.getRepository(Users_1.User);
        const user = await repo.findOne({
            where: { id },
            relations: { situation: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado!" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuário!" });
        return;
    }
});
// Cadastrar usuário
router.post("/users", async (req, res) => {
    try {
        const data = req.body;
        const repo = data_source_1.AppDataSource.getRepository(Users_1.User);
        const situationRepo = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        if (data.situationId) {
            data.situation = { id: data.situationId };
        }
        else {
            let situation = await situationRepo.findOneBy({ id: 1 });
            if (!situation) {
                situation = await situationRepo.save(situationRepo.create({ nameSituatuions: "Ativo" }));
            }
            data.situation = situation;
        }
        const newUser = repo.create(data);
        await repo.save(newUser);
        res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            user: newUser,
        });
    }
    catch (error) {
        console.error("Erro no POST /users:", error);
        res.status(500).json({ message: "Erro ao cadastrar usuário!" });
    }
});
// Editar usuário
router.put("/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const repo = data_source_1.AppDataSource.getRepository(Users_1.User);
        const user = await repo.findOneBy({ id });
        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado!" });
            return;
        }
        if (data.situationId) {
            data.situation = { id: data.situationId };
        }
        repo.merge(user, data);
        const updatedUser = await repo.save(user);
        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: updatedUser,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar usuário!" });
        return;
    }
});
// Excluir usuário
router.delete("/users/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const repo = data_source_1.AppDataSource.getRepository(Users_1.User);
        const user = await repo.findOneBy({ id });
        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado!" });
            return;
        }
        await repo.remove(user);
        res.status(200).json({ message: "Usuário excluído com sucesso!" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir usuário!" });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=UsersController.js.map