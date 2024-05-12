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
exports.estoqueService = void 0;
const readCSV_1 = require("../model/readCSV");
const writeCSV_1 = require("../model/writeCSV");
const filePath = './model/estoque.csv';
class estoqueService {
    criar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof data.name !== 'string' || isNaN(data.weight) || isNaN(data.value) || isNaN(data.amount)) {
                throw new Error('Dados Inválidos para o Produto');
            }
            else {
                yield (0, writeCSV_1.writeCSV)(filePath, [data]);
            }
        });
    }
    /*
        async remover(nomeProduto: string): Promise<void>{
            try {
                const inventarioAtual: Data[] = await readCSV(filePath);
                const indexToRemove = inventarioAtual.findIndex(item => item.name === nomeProduto);
        
                if (indexToRemove !== -1) {
                    inventarioAtual.splice(indexToRemove, 1);
                    await writeCSV(filePath, inventarioAtual);
                    console.log(`Item "${nomeProduto}" removido do inventário com sucesso.`);
                } else {
                    console.log(`O item "${nomeProduto}" não foi encontrado no inventário.`);
                }
            } catch (error) {
                console.error('Erro ao remover produto:', error);
            }
        }*/
    verificaItem(nomeItem, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventario = yield (0, readCSV_1.readCSV)(filePath);
            return inventario.some((item) => item.name === nomeItem);
        });
    }
}
exports.estoqueService = estoqueService;
