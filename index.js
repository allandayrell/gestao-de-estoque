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
const controleEstoque_4 = require("./controller/controleEstoque");
const controleEstoque_5 = require("./controller/controleEstoque");
const controleEstoque_6 = require("./controller/controleEstoque");
const controleEstoque_7 = require("./controller/controleEstoque");
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
        console.log("Para adicionar produto, digite: 1;");
        console.log("Para remover produto, digite: 2;");
        console.log("Para litsar os produtos em estoque, digite: 3;");
        console.log("Para saber o valor total do estoque, digite: 4;");
        console.log("Para saber o peso total do estoque, digite: 5;");
        console.log("Para saber o valor médio dos itens do estoque, digite: 6;");
        console.log("Para saber o peso médio dos itens do estoque, digite: 7;");
        console.log("Para sair, digite: x.");
        console.log("--Digite sempre o nome com a primeira letra maiúscula e use ponto ao invés de virgula para valores.--");
        let operacao = parseInt(yield getInput("Digite uma opção: "));
        let primeiraOperacao = true;
        while (operacao !== 0) {
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
                    yield (0, controleEstoque_1.adicionarProduto)(novoItem).catch(error => console.error('Erro ao adicionar produto:', error));
                    break;
                case 2:
                    let item = yield getInput("Digite o nome do produto para ser removido: ");
                    let certeza = parseInt(yield getInput("Tem certeza que deseja remover o item? se sim digite 1: "));
                    if (certeza === 1) {
                        yield (0, controleEstoque_2.removerProduto)(item, filePath).catch(error => console.error('Erro ao remover item:', error));
                    }
                    break;
                case 3:
                    yield (0, controleEstoque_3.listarProdutos)(filePath).catch(error => console.error('Erro ao listar produtos:', error));
                    break;
                case 4:
                    let valorEstoque;
                    valorEstoque = yield (0, controleEstoque_4.valorTotal)(filePath).catch(error => console.error('Erro ao calcular valor total:', error));
                    console.log("Valor total calculado:", valorEstoque, "reais");
                    break;
                case 5:
                    let pesoEstoque;
                    pesoEstoque = yield (0, controleEstoque_5.pesoTotal)(filePath).catch(error => console.error('Erro ao calcular peso total:', error));
                    console.log("Valor total calculado:", pesoEstoque, "kg");
                    break;
                case 6:
                    let valorMedio;
                    valorMedio = yield (0, controleEstoque_6.mediaValores)(filePath).catch(error => console.error(error));
                    console.log("Valor total calculado:", valorMedio, "reais");
                    break;
                case 7:
                    let pesoMedio;
                    pesoMedio = yield (0, controleEstoque_7.mediaPeso)(filePath).catch(error => console.error(error));
                    console.log("Peso total calculado:", pesoMedio, "kg");
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
