"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Requests {
    constructor() {
        this.createOrder = {
            products: "required|array",
            address: "required|string",
            city: "required|string",
            country: "required|string",
            postalCode: "required|string",
            phone: "required|number",
        };
        this.checkUuid = {
            id: "required|string|uuid",
        };
        this.updateState = {
            id: "required|string|uuid",
            state: "required|string",
        };
    }
}
exports.default = Requests;
