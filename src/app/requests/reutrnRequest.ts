import JsonReurn from "../interface/JsonReturn";

/* request return  */
const validReturn = (errors: string[]): JsonReurn => {
  return {
    status: "failed",
    message: "validation error",
    data: errors,
  };
};

export default validReturn;
