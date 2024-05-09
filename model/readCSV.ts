import { Data}  from "../model/interfaceData"
import fs from 'fs';
import csv from 'csv-parser';

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


