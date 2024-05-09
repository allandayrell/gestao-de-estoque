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
const readCSV_1 = require("./model/readCSV");
const controleEstoque_1 = require("./controller/controleEstoque");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const novoItem = {
            name: 'Uva',
            weight: 0.350,
            value: 3.5,
            amount: 35
        };
        yield (0, controleEstoque_1.adicionarProduto)(novoItem);
        const data = yield (0, readCSV_1.readCSV)('./model/estoque.csv');
        console.log('Dados lidos:', data);
        //await writeCSV('./db/estoque.csv', data);
        //console.log('Dados escritos em output.csv');
    }
    catch (error) {
        console.error('Erro:', error);
    }
});
main();
