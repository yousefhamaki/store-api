"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Requests {
    constructor() {
        this.create = {
            name: "required",
            status: "required",
        };
        this.createChild = {
            name: "required",
            status: "required",
            main: "required",
        };
        this.changeRelation = {
            id: "required|string|uuid",
            main_id: "required",
        };
        this.changeName = {
            name: "required|string",
            id: "required|string|uuid",
        };
        this.changeState = {
            status: "required",
            id: "required|string|uuid",
        };
        this.checkUuid = {
            id: "required|string|uuid",
        };
    }
}
exports.default = Requests;
