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
const serviceEstoque_1 = require("./service/serviceEstoque");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const novoItem = [{
                name: 'Uva',
                weight: 0.350,
                value: '3.5',
                amount: 35
            }];
        yield (0, serviceEstoque_1.adicionarEstoque)('./db/estoque.csv', novoItem);
        const data = yield (0, readCSV_1.readCSV)('./db/estoque.csv');
        console.log('Dados lidos:', data);
        //await writeCSV('./db/estoque.csv', data);
        //console.log('Dados escritos em output.csv');
        const novoItem2 = [{
                name: 'abacate',
                weight: 0.350,
                value: '3.5',
                amount: 35
            }];
        //await adicionarEstoque('./db/estoque.csv', novoItem2);
        //const data2 = await readCSV('./db/estoque.csv');
        //console.log('Dados lidos:', data2);
    }
    catch (error) {
        console.error('Erro:', error);
    }
});
main();
