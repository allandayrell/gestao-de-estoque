import {readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
import { Data }  from "../model/interfaceData";
import { estoqueService } from "../service/serviceEstoque";
import fs from 'fs';

const filePath = './model/estoque.csv';

/*
export async function adicionarProduto(filePath: string, novoItem: Data){
    try {
        const inventarioAtual: Data[] = await readCSV(filePath);

        const nomesExistentes = new Set<string>();
        inventarioAtual.forEach(item => nomesExistentes.add(item.name));

        for (const item of novoItem) {
            if (nomesExistentes.has(item.name)) {
                throw new Error(`O item "${item.name}" já existe no inventário.`);
            }
        }

        await writeCSV(filePath, novoItem);
    } catch(error) {
        console.error('Erro ao adicionar um novo item ao estoque')
    }
}*/

export async function adicionarProduto(data:Data){
    try{
        let itemExistente = false;
        const inventarioAtual: Data[] = await readCSV(filePath);
        for(let item of inventarioAtual){
            if(item.name === data.name){
                let itemExistente = true;
                throw new Error(`O item "${item.name}" já está no inventário.`);
            }
        }
        if(!itemExistente){
            const service = new estoqueService();
            await service.criar(data);
            console.log("Produto adicionado com sucesso.");
        }
        
    }catch(error){
        console.log("Erro ao adicionar produto. ", error);
    }
}

