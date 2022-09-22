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
Object.defineProperty(exports, "__esModule", { value: true });
const standard = {
    string: "ABCDEFGHIKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    hash: "!@#$%^&*()_+={}?><':;\"|/-",
};
const loop = (el, pass, type) => {
    const check = el.split("");
    for (let i = 0; i < check.length; i++) {
        const element = el[i];
        if (pass.split("").indexOf(element) > -1) {
            return type;
        }
    }
    return "";
};
function checkPass(pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const string = yield loop(standard.string, pass, "string");
        const number = yield loop(standard.number, pass, "number");
        const hash = yield loop(standard.hash, pass, "hash");
        const check = [string, number, hash];
        for (let index = 0; index < check.length; index++) {
            if (check[index] === "") {
                check.splice(index, 1);
            }
        }
        return check;
    });
}
exports.default = checkPass;
