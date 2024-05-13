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
exports.readCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const readCSV = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const data = [];
        const line = readline_1.default.createInterface({
            input: fs_1.default.createReadStream(filePath),
        });
        let firstLine = true;
        line.on("line", (lineData) => {
            let csv = lineData.split(",");
            if (firstLine) {
                firstLine = false;
                return;
            }
            const rowData = {
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
});
exports.readCSV = readCSV;
