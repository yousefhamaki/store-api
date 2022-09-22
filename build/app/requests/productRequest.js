"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class productRequests {
    constructor() {
        this.create = {
            title: "required",
            describtion: "required",
            price: "required|number",
            salePrice: "required|number",
            isonsale: "required",
            branch: "required|string",
            images: "required|object",
            countinstroke: "required|number",
            features: "required|array",
        };
        this.editProduct = {
            id: "required|string|uuid",
            title: "required",
            describtion: "required",
            price: "required|number",
            salePrice: "required|number",
            isonsale: "required",
            branch: "required|string",
            images: "required|object",
            countinstroke: "required|number",
            features: "required|array",
        };
        this.getProducts = {
            filter: "required",
            branch: "required",
            limit: "required",
        };
        this.addFeature = {
            product_id: "required|string|uuid",
            feature: "required",
        };
        this.editFeature = {
            product_id: "required|string|uuid",
            id: "required|string|uuid",
            feature: "required",
        };
        this.checkUuid = {
            id: "required|string|uuid",
        };
    }
}
exports.default = productRequests;
