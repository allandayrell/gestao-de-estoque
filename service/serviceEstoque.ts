import {readCSV } from '../model/readCSV';
import { writeCSV } from "../model/writeCSV";
import { Data }  from "../model/interfaceData";

const filePath = './model/estoque.csv';

export class estoqueService{
    async criar(data: Data){
        if(typeof data.name !== 'string' || isNaN(data.weight) || isNaN(data.value) || isNaN(data.amount)){
            throw new Error('Dados Inválidos para o Produto');
        }else{
            await writeCSV(filePath, [data]);
    
        }
    
    }

}
