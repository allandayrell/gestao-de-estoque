"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const controleEstoque_1 = require("./controller/controleEstoque");
const controleEstoque_2 = require("./controller/controleEstoque");
const controleEstoque_3 = require("./controller/controleEstoque");
const prompt = require('prompt-sync')({ sigint: true });
const readline = __importStar(require("readline"));
const filePath = './model/estoque.csv';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const getInput = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
        const novoItem: Data = {
            name: 'Uva',
            weight: 0.350,
            value: 3.5,
            amount: 35,
            status: 1
        };
        */
        //
        //let item = 'Laranja';
        //await removerProduto(item, filePath); 
        //const data = await readCSV(filePath);
        //console.log('Dados lidos:', data);
        //await listarProdutos(filePath);
        console.log("Para adicionar produto, digite: 1");
        console.log("Para remover produto, digite: 2");
        console.log("Para lisar os produtos em estoque, digite: 3");
        console.log("Para sair, digite: 4");
        console.log("Digite sempre o nome com a primeira letra maiúscula e use ponto ao invés de virgula.");
        let operacao = parseInt(yield getInput("Digite uma opção: "));
        let primeiraOperacao = true;
        while (operacao !== 4) {
            if (!primeiraOperacao) {
                operacao = parseInt(yield getInput("Digite uma opção: "));
            }
            switch (operacao) {
                case 1:
                    console.log("Digite as informações do Prouto:");
                    const novoItem = {
                        name: '',
                        weight: 0,
                        value: 0,
                        amount: 0,
                        status: 1
                    };
                    novoItem.name = yield getInput("Digite o nome do produto: ");
                    novoItem.weight = parseFloat(yield getInput("Digite o peso do produto em gramas: "));
                    novoItem.value = parseFloat(yield getInput("Digite o valor do produto: "));
                    novoItem.amount = parseInt(yield getInput("Digite a quantidade do produto: "));
                    yield (0, controleEstoque_1.adicionarProduto)(novoItem);
                    break;
                case 2:
                    let item = yield getInput("Digite o nome do produto para ser removido: ");
                    let certeza = parseInt(yield getInput("Tem certeza que deseja remover o item? se sim digite 1: "));
                    if (certeza === 1) {
                        yield (0, controleEstoque_2.removerProduto)(item, filePath);
                    }
                    break;
                case 3:
                    yield (0, controleEstoque_3.listarProdutos)(filePath);
                    break;
                case 4:
                    operacao = 0;
                    break;
                default:
                    console.log("Operação Inválida!");
                    break;
            }
            primeiraOperacao = false;
        }
    }
    catch (error) {
        console.error('Erro:', error);
    }
    return 1;
});
main();
