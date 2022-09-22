"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterQuery = (filter, branch) => {
    let q = " ";
    if (filter == "branch") {
        q = ` WHERE branch = '${branch}' ORDER BY RANDOM() `;
    }
    else if (filter == "titlez") {
        q = ` ORDER BY title DESC `;
    }
    else if (filter == "titlea") {
        q = ` ORDER BY title ASC `;
    }
    else if (filter == "price+") {
        q = ` ORDER BY price DESC `;
    }
    else if (filter == "price-") {
        q = ` ORDER BY price ASC `;
    }
    else if (filter == "branch_price-") {
        q = ` WHERE branch = '${branch}' ORDER BY price ASC `;
    }
    else if (filter == "branch_price+") {
        q = ` WHERE branch = '${branch}' ORDER BY price DESC `;
    }
    else if (filter == "sale") {
        q = ` WHERE isonSale = 'true' ORDER BY RANDOM() `;
    }
    else if (filter == "branch_sale+") {
        q = ` WHERE isonSale = 'true' AND branch = '${branch}' ORDER BY salePrice DESC `;
    }
    else if (filter == "branch_sale-") {
        q = ` WHERE isonSale = 'true' AND branch = '${branch}' ORDER BY salePrice ASC `;
    }
    else if (filter == "random") {
        q = ` ORDER BY RANDOM() `;
    }
    else {
        q = ` `;
    }
    return q;
};
exports.default = filterQuery;
