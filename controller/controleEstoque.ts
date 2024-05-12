import {readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
import { Data }  from "../model/interfaceData";
import { estoqueService } from "../service/serviceEstoque";
import fs from 'fs';


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


export async function adicionarProduto(data:Data){
    try{
        const inventarioAtual: Data[] = await readCSV(filePath);
        const service = new estoqueService();
        let itemEncontrado = false;

        for(let item of inventarioAtual){
            if(item.name === data.name && item.status === 1){
                throw new Error(`O item "${item.name}" já está no inventário.`);
            }
            if(item.name === data.name && item.status === 0){
                item.status = 1;
                item.amount = data.amount;
                item.value = data.value;
                item.weight = data.weight;
                itemEncontrado = true;
                await service.criar(item);
                break;
            }
        }

        if(itemEncontrado == false){
            await service.criar(data);
        }
        console.log("Produto adicionado com sucesso.");
    
        
    }catch(error){
        console.log("Erro ao adicionar produto. ", error);
    }
}

/*
export async function removerProduto(nomeProduto: string){
    try {
        const service = new estoqueService();
        await service.remover(nomeProduto);
    } catch (error) {
        console.error('Erro ao remover item:', error);
    }
}
*/

export async function removerProduto(nomeItem: string, filePath: string): Promise<void> {
    const data = await readCSV(filePath);
    for(let i = 0; i < data.length; i++){
        if(data[i].name === nomeItem){
            data[i].status = 0;
        }
    }
}


/*
export async function removerProduto(nomeItem: string, filePath: string): Promise<void> {
    const service = new estoqueService();
    if (!await service.verificaItem(nomeItem, filePath)) {
        throw new Error(`Item "${nomeItem}" não encontrado no inventário.`);
    }

    const inventario = await readCSV(filePath);

    const novoInventario = [];

    for (const item of inventario) {
        if (item.name !== nomeItem) {
        novoInventario.push(item);
        }
    }
    await writeCSV(filePath, novoInventario);
}*/

export async function listarProdutos(filePath: string) {
    const data = await readCSV(filePath);
    for(let i = 0; i < data.length; i++) {
        if(data[i].status !== 0){
            console.log("Nome:",data[i].name,
                    ". Peso: ", data[i].weight,
                    ". Valor: ", data[i].value, 
                    ". Quantidade: ", data[i].amount);
        }
    }
}