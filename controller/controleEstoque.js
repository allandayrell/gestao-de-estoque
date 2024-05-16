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
exports.valorTotal = exports.listarProdutos = exports.removerProduto = exports.adicionarProduto = void 0;
const readCSV_1 = require("../model/readCSV");
const writeCSV_1 = require("../model/writeCSV");
const serviceEstoque_1 = require("../service/serviceEstoque");
const filePath = './model/estoque.csv';
/*
export async function adicionarProduto(data: Data) {
    try {
        const inventarioAtual: Data[] = await readCSV(filePath);
        let itemEncontrado = false;

        for (let item of inventarioAtual) {
            if (item.name === data.name && item.status === 1) {
                throw new Error(`O item "${item.name}" já está no inventário.`);
            }
            if (item.name === data.name && item.status === 0) {
                item.status = 1;
                item.amount = data.amount;
                item.value = data.value;
                item.weight = data.weight;
                itemEncontrado = true;
                break; // Encerra o loop, pois já encontrou o item
            }
        }

        if (!itemEncontrado) {
            inventarioAtual.push(data);
        }

        await writeCSV(filePath, inventarioAtual);
        console.log("Produto adicionado com sucesso.");

    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
    }
}*/
function adicionarProduto(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inventarioAtual = yield (0, readCSV_1.readCSV)(filePath);
            const service = new serviceEstoque_1.estoqueService();
            let itemEncontrado = false;
            for (let item of inventarioAtual) {
                if (item.name === data.name && item.status === 1) {
                    throw new Error(`O item "${item.name}" já está no inventário.`);
                }
                if (item.name === data.name && item.status === 0) {
                    item.status = 1;
                    item.amount = data.amount;
                    item.value = data.value;
                    item.weight = data.weight;
                    itemEncontrado = true;
                    yield service.criar(item);
                    break;
                }
            }
            if (itemEncontrado == false) {
                yield service.criar(data);
            }
            yield (0, writeCSV_1.writeCSV)(filePath, []);
            yield (0, writeCSV_1.writeCSV)(filePath, inventarioAtual);
            console.log("Produto adicionado com sucesso.");
        }
        catch (error) {
            console.log("Erro ao adicionar produto. ", error);
        }
    });
}
exports.adicionarProduto = adicionarProduto;
function removerProduto(nomeProduto, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inventarioAtual = yield (0, readCSV_1.readCSV)(filePath);
            const service = new serviceEstoque_1.estoqueService();
            let itemEncontrado = false;
            for (let i = 0; i < inventarioAtual.length; i++) {
                const item = inventarioAtual[i];
                if (item.name === nomeProduto && item.status === 1) {
                    inventarioAtual[i].status = 0;
                    itemEncontrado = true;
                    yield (0, writeCSV_1.writeCSV)(filePath, []);
                    yield (0, writeCSV_1.writeCSV)(filePath, inventarioAtual);
                    break;
                }
            }
            if (itemEncontrado == false) {
                console.log("Produto não encontrado!");
            }
            console.log("Produto removido com sucesso.");
        }
        catch (error) {
            console.log("Erro ao remover produto. ", error);
        }
    });
}
exports.removerProduto = removerProduto;
function listarProdutos(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, readCSV_1.readCSV)(filePath);
        for (let i = 0; i < data.length; i++) {
            if (data[i].status !== 0) {
                console.log("Nome:", data[i].name, ". Peso: ", data[i].weight, ". Valor: ", data[i].value, ". Quantidade: ", data[i].amount);
            }
        }
    });
}
exports.listarProdutos = listarProdutos;
function valorTotal(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, readCSV_1.readCSV)(filePath);
            let total = 0;
            for (let i = 0; i < data.length; i++) {
                total += data[i].value * data[i].amount;
            }
            console.log("Valor total calculado:", total);
        }
        catch (error) {
            console.error("Erro ao calcular valor total:", error);
        }
    });
}
exports.valorTotal = valorTotal;
