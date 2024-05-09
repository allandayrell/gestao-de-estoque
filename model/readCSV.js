"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCSV = exports.readCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const readCSV = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const results = [];
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
});
exports.readCSV = readCSV;
const csv_writer_1 = require("csv-writer");
const writeCSV = (filePath, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
            path: filePath,
            header: [
                { id: 'name', title: 'NOME' },
                { id: 'weight', title: 'PESO' },
                { id: 'value', title: 'VALOR' },
                { id: 'amount', title: 'QUANTIDADE' },
            ],
            append: true,
        });
        yield csvWriter.writeRecords(data);
    }
    catch (error) {
        console.error('Erro ao escrever no arquivo CSV:', error);
    }
});
exports.writeCSV = writeCSV;
