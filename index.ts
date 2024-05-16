import { Data }  from "./model/interfaceData";
import { adicionarProduto } from './controller/controleEstoque';
import { removerProduto } from './controller/controleEstoque';
import { listarProdutos } from './controller/controleEstoque';
import { valorTotal } from './controller/controleEstoque';
import { pesoTotal } from './controller/controleEstoque';
import { mediaValores } from './controller/controleEstoque';
import { mediaPeso } from './controller/controleEstoque';
import { totalItens } from './controller/controleEstoque';

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

        console.log("Para adicionar produto, digite: 1;");
        console.log("Para remover produto, digite: 2;");
        console.log("Para litsar os produtos em estoque, digite: 3;");
        console.log("Para saber o valor total do estoque, digite: 4;");
        console.log("Para saber o peso total do estoque, digite: 5;");
        console.log("Para saber o valor médio dos itens do estoque, digite: 6;");
        console.log("Para saber o peso médio dos itens do estoque, digite: 7;");
        console.log("Para saber a quantidade de itens (total) do estoque, digite: 8;");
        console.log("Para saber a quantidade de produtos (únicos) do estoque, digite: 9;");
        console.log("Para sair, digite: 0.");
        console.log("--Digite sempre o nome com a primeira letra maiúscula e use ponto ao invés de virgula para valores.--")

        let operacao: number = parseInt(await getInput("Digite uma opção: "));
        let primeiraOperacao = true;

        while(operacao !== 0){

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
                    await adicionarProduto(novoItem).catch(error => console.error('Erro ao adicionar produto:', error));

                    break;
                case 2:
                    let item = await getInput("Digite o nome do produto para ser removido: ");
                    let certeza = parseInt(await getInput("Tem certeza que deseja remover o item? se sim digite 1: "));
                    if(certeza === 1){
                        await removerProduto(item, filePath).catch(error => console.error('Erro ao remover item:', error));
                    }
                    break;
                case 3: 
                    await listarProdutos(filePath).catch(error => console.error('Erro ao listar produtos:', error));
                    break;
                case 4:
                    let valorEstoque;
                    valorEstoque = await valorTotal(filePath).catch(error => console.error('Erro ao calcular valor total:', error));
                    console.log("Valor total calculado:", valorEstoque, "reais");

                    break;
                case 5:
                    let pesoEstoque;
                    pesoEstoque = await pesoTotal(filePath).catch(error => console.error('Erro ao calcular peso total:', error));
                    console.log("Valor total calculado:", pesoEstoque, "kg");
                    break;
                case 6:
                    let valorMedio;
                    valorMedio = await mediaValores(filePath).catch(error => console.error(error));
                    console.log("Valor total calculado:", valorMedio, "reais");
                    break;
                case 7:
                    let pesoMedio;
                    pesoMedio = await mediaPeso(filePath).catch(error => console.error(error));
                    console.log("Peso total calculado:", pesoMedio, "kg");
                    break;
                case 8:
                    let qtdItens;
                    qtdItens = await totalItens(filePath).catch(error => console.error(error));
                    console.log("Quantidade de itens no total:", qtdItens, );
                    break;
                case 9:
                    
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