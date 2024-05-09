import {readCSV } from './model/readCSV';
import { writeCSV } from './model/writeCSV';
import { Data }  from "./model/interfaceData";
import { adicionarProduto } from './controller/controleEstoque';

const main = async () => {
    try {
        const novoItem: Data = {
            name: 'Uva',
            weight: 0.350,
            value: 3.5,
            amount: 35
        };

        await adicionarProduto(novoItem);


        const data = await readCSV('./model/estoque.csv');
        console.log('Dados lidos:', data);

        //await writeCSV('./db/estoque.csv', data);
        //console.log('Dados escritos em output.csv');

    } catch (error) {
        console.error('Erro:', error);
    }
};

main();