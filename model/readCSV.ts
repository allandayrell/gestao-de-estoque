import { Data}  from "../model/interfaceData"
import fs from 'fs';
import csv from 'csv-parser';
import readline from 'readline';
/*
export const readCSV = async (filePath: string): Promise<Data[]> => {
    return new Promise((resolve, reject) => {
        const results: Data[] = [];
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: Data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
};*/

export const readCSV = async (filePath: string): Promise<Data[]> => {
    return new Promise((resolve, reject) => {
        const data: Data[] = [];

        const line = readline.createInterface({
            input: fs.createReadStream(filePath),
        });

        let firstLine = true;

        line.on("line", (lineData) => {
            let csv = lineData.split(",");

            if (firstLine) {
                firstLine = false;
                return;
            }

            const rowData: Data = {
                name: csv[0],
                weight: parseFloat(csv[1]),
                value: parseFloat(csv[2]),
                amount: parseInt(csv[3]),
                status: parseInt(csv[4]),
            };

            data.push(rowData);
        });

        line.on("close", () => {
            resolve(data);
        });

        line.on("error", (error) => {
            reject(error);
        });
    });
};