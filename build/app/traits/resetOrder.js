"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resetOrder = (order) => {
    const result = {
        products: [],
    };
    result.address = order[0].address;
    result.country = order[0].country;
    result.id = order[0].order_id;
    result.user_id = order[0].user_id;
    result.phone = order[0].phone;
    result.postalcode = order[0].postalcode;
    result.status = order[0].status;
    for (let index = 0; index < order.length; index++) {
        const element = order[index].products[0];
        result.products[index] = element;
    }
    return result;
};
exports.default = resetOrder;
