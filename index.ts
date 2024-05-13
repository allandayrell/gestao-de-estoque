import { Data }  from "./model/interfaceData";
import { adicionarProduto } from './controller/controleEstoque';
import { removerProduto } from './controller/controleEstoque';
import { listarProdutos } from './controller/controleEstoque';
const prompt = require('prompt-sync')({sigint: true});
import * as readline from 'readline';

const filePath = './model/estoque.csv';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getInput = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

const main = async () => {
    try {

        console.log("Para adicionar produto, digite: 1");
        console.log("Para remover produto, digite: 2");
        console.log("Para lisar os produtos em estoque, digite: 3");
        console.log("Para sair, digite: 4");
        console.log("Digite sempre o nome com a primeira letra maiúscula e use ponto ao invés de virgula.")

        let operacao: number = parseInt(await getInput("Digite uma opção: "));
        let primeiraOperacao = true;

        while(operacao !== 4){

            if(!primeiraOperacao){
                operacao = parseInt(await getInput("Digite uma opção: "));
            }

            switch (operacao) {
                case 1:
                    console.log("Digite as informações do Prouto:");
                    const novoItem: Data = {
                        name: '',
                        weight: 0,
                        value: 0,
                        amount: 0,
                        status: 1
                    };
                    
                    novoItem.name = await getInput("Digite o nome do produto: ");
                    novoItem.weight = parseFloat(await getInput("Digite o peso do produto em gramas: "));
                    novoItem.value = parseFloat(await getInput("Digite o valor do produto: "));
                    novoItem.amount = parseInt(await getInput("Digite a quantidade do produto: "));
                    await adicionarProduto(novoItem);

                    break;
                case 2:
                    let item = await getInput("Digite o nome do produto para ser removido: ");
                    let certeza = parseInt(await getInput("Tem certeza que deseja remover o item? se sim digite 1: "));
                    if(certeza === 1){
                        await removerProduto(item, filePath);
                    }
                    break;
                case 3: 
                    await listarProdutos(filePath);
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

    } catch (error) {
        console.error('Erro:', error);
    }

    return 1;
};

main();