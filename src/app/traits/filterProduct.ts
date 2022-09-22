const filterQuery = (filter: string, branch: string): string => {
  let q = " ";
  if (filter == "branch") {
    //tested
    q = ` WHERE branch = '${branch}' ORDER BY RANDOM() `;
  } else if (filter == "titlez") {
    //tested
    q = ` ORDER BY title DESC `;
  } else if (filter == "titlea") {
    //tested
    q = ` ORDER BY title ASC `;
  } else if (filter == "price+") {
    //tested
    q = ` ORDER BY price DESC `;
  } else if (filter == "price-") {
    //tested
    q = ` ORDER BY price ASC `;
  } else if (filter == "branch_price-") {
    //tested
    q = ` WHERE branch = '${branch}' ORDER BY price ASC `;
  } else if (filter == "branch_price+") {
    //tested
    q = ` WHERE branch = '${branch}' ORDER BY price DESC `;
  } else if (filter == "sale") {
    //tested
    q = ` WHERE isonSale = 'true' ORDER BY RANDOM() `;
  } else if (filter == "branch_sale+") {
    //tested
    q = ` WHERE isonSale = 'true' AND branch = '${branch}' ORDER BY salePrice DESC `;
  } else if (filter == "branch_sale-") {
    //tested
    q = ` WHERE isonSale = 'true' AND branch = '${branch}' ORDER BY salePrice ASC `;
  } else if (filter == "random") {
    q = ` ORDER BY RANDOM() `;
  } else {
    q = ` `;
  }

  return q;
};

export default filterQuery;
