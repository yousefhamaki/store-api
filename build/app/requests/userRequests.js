"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Requests {
    constructor() {
        this.createUser = {
            username: "required",
            firstname: "required",
            lastname: "required",
            email: "required",
            password: "required",
        };
        this.makeLogin = {
            email: "required",
            password: "required",
        };
        this.updateUserInfo = {
            email: "required",
            username: "required",
            firstname: "required",
            lastname: "required",
            id: "required|string|uuid",
        };
        this.changePass = {
            oldpass: "required",
            newpass: "required",
        };
        this.checkUuid = {
            id: "required|string|uuid",
        };
    }
}
exports.default = Requests;
