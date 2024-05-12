import { Data}  from "../model/interfaceData"
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
              { id: 'status', title: 'STATUS'},
            ],
            append: true,
        });
        
        await csvWriter.writeRecords(data);
    }catch(error) {
        console.error('Erro ao escrever no arquivo CSV:', error);
    }
    
};

