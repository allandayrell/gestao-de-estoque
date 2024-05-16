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

        await writeCSV(filePath, []);
        await writeCSV(filePath, inventarioAtual);
        console.log("Produto adicionado com sucesso.");
    
        
    }catch(error){
        console.log("Erro ao adicionar produto. ", error);
    }
}


export async function removerProduto(nomeProduto: string, filePath: string){
    try{
        const inventarioAtual: Data[] = await readCSV(filePath);
        const service = new estoqueService();
        let itemEncontrado = false;

        for(let i = 0; i < inventarioAtual.length; i++){
            const item = inventarioAtual[i];
            if(item.name === nomeProduto && item.status === 1){
                inventarioAtual[i].status = 0;
                itemEncontrado = true;
                await writeCSV(filePath, []);
                await writeCSV(filePath, inventarioAtual);
                break;
            }
        }

        if(itemEncontrado == false){
            console.log("Produto não encontrado!");
        }
        console.log("Produto removido com sucesso.");
    
        
    }catch(error){
        console.log("Erro ao remover produto. ", error);
    }
}


export async function listarProdutos(filePath: string) {
    try{
        const data = await readCSV(filePath);
        for(let i = 0; i < data.length; i++) {
            if(data[i].status !== 0){
                console.log("Nome:",data[i].name,
                        ". Peso: ", data[i].weight,
                        ". Valor: ", data[i].value, 
                        ". Quantidade: ", data[i].amount);
            }
        }
    }catch (error) {
        console.error("Erro ao listar produtos:", error);
    }
    
}

export async function valorTotal(filePath: string) {
    try {
        const data = await readCSV(filePath);
        let total = 0;

        for(let i = 0; i < data.length; i++) {
            total += data[i].value * data[i].amount;
        }
        return total;
    } catch (error) {
        console.error("Erro ao calcular valor total:", error);
    }
}

export async function pesoTotal(filePath: string) {
    try {
        const data = await readCSV(filePath);
        let total = 0;

        for(let i = 0; i < data.length; i++) {
            total += data[i].weight * data[i].amount;
        }
        total = total / 1000;
        return total;
    } catch (error) {
        console.error("Erro ao calcular peso total:", error);
    }
}

export async function mediaValores(filePath: string) {
    try{
        const data = await readCSV(filePath);
        let media = 0;
        let total = await valorTotal(filePath);
        let quantidade = 0;

        if (total === undefined) {
            throw new Error('Erro ao calcular valor total');
        }

        for(let i = 0; i < data.length; i++) {
            quantidade += data[i].amount;
        }

        if (quantidade === 0) {
            throw new Error('Não há itens no estoque para calcular a média');
        }

        media = total / quantidade;
        return media;
    }catch (error) {
        console.error("Erro ao calcular valor médio total:", error);
    }
}

export async function mediaPeso(filePath: string) {
    try{
        const data = await readCSV(filePath);
        let media = 0;
        let total = await pesoTotal(filePath);
        let quantidade = 0;

        if (total === undefined) {
            throw new Error('Erro ao calcular peso total');
        }

        for(let i = 0; i < data.length; i++) {
            quantidade += data[i].amount;
        }

        if (quantidade === 0) {
            throw new Error('Não há itens no estoque para calcular a média');
        }

        media = total / quantidade;
        return media;
    }catch (error) {
        console.error("Erro ao calcular peso médio total:", error);
    }
}