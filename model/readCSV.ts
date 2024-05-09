export interface Data{
    name: string;
    weight: number;
    value: string;
    amount: number;
}

import fs from 'fs';
import csv from 'csv-parser';
import { appendFile } from 'fs/promises';

export const readCSV = async (filePath: string): Promise<Data[]> => {
    return new Promise((resolve, reject) => {
        const results: Data[] = [];
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: Data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
};

import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';


export const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
    try{
        const csvWriter = createCsvWriter({
            path: filePath,
            header: [
              { id: 'name', title: 'NOME' },
              { id: 'weight', title: 'PESO' },
              { id: 'value', title: 'VALOR' },
              { id: 'amount', title: 'QUANTIDADE' },
            ],
            append: true,
        });
        
        await csvWriter.writeRecords(data);
    }catch(error) {
        console.error('Erro ao escrever no arquivo CSV:', error);
    }
    
};


