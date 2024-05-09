"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionarProduto = void 0;
const readCSV_1 = require("../model/readCSV");
const serviceEstoque_1 = require("../service/serviceEstoque");
const filePath = './model/estoque.csv';
/*
export async function adicionarProduto(filePath: string, novoItem: Data){
    try {
        const inventarioAtual: Data[] = await readCSV(filePath);

        const nomesExistentes = new Set<string>();
        inventarioAtual.forEach(item => nomesExistentes.add(item.name));

        for (const item of novoItem) {
            if (nomesExistentes.has(item.name)) {
                throw new Error(`O item "${item.name}" já existe no inventário.`);
            }
        }

        await writeCSV(filePath, novoItem);
    } catch(error) {
        console.error('Erro ao adicionar um novo item ao estoque')
    }
}*/
function adicionarProduto(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let itemExistente = false;
            const inventarioAtual = yield (0, readCSV_1.readCSV)(filePath);
            for (let item of inventarioAtual) {
                if (item.name === data.name) {
                    let itemExistente = true;
                    throw new Error(`O item "${item.name}" já está no inventário.`);
                }
            }
            if (!itemExistente) {
                const service = new serviceEstoque_1.estoqueService();
                yield service.criar(data);
                console.log("Produto adicionado com sucesso.");
            }
        }
        catch (error) {
            console.log("Erro ao adicionar produto. ", error);
        }
    });
}
exports.adicionarProduto = adicionarProduto;
