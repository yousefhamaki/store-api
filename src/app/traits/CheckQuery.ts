function checkIfValidUUID(str: string) {
  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
}

function QueryCheck(
  query: {
    [key: string]: string | qs.ParsedQs | string[] | qs.ParsedQs[];
  },
  params: { [key: string]: string }
): string[] {
  const result: string[] = [];
  for (const key in params) {
    const stand: string[] = params[key].split("|");
    if (stand.indexOf("required") > -1) {
      if (query[key] === undefined) {
        result[result.length] = "oops! " + key + " is Required";
      }
    }
    if (query[key]) {
      if (stand.indexOf("number") > -1) {
        if (isNaN(Number(query[key]))) {
          result[result.length] = "oh! oh " + key + " must be number";
        }
      }

      if (stand.indexOf("array") > -1) {
        if (!Array.isArray(query[key])) {
          result[result.length] = "oh! oh " + key + " must be array";
        }
      }

      if (stand.indexOf("object") > -1) {
        if (
          typeof query[key] !== "object" ||
          Array.isArray(query[key]) ||
          query[key] === null
        ) {
          result[result.length] = "oh! oh " + key + " must be object";
        }
      }

      if (stand.indexOf("string") > -1) {
        if (typeof query[key] !== "string") {
          result[result.length] = "oh! oh " + key + " must be string";
        }
      }

      if (stand.indexOf("uuid") > -1) {
        if (!checkIfValidUUID(query[key] as string)) {
          result[result.length] = "oh! oh " + key + " must be a valid uuid";
        }
      }

      // if (stand.indexOf("max") > -1) {
      //   const max = stand[stand.indexOf("max") + 1];
      //   if (query[key].length !== undefined) {
      //     if (query[key]!.length > max) {
      //       result[result.length] =
      //         "oh! oh " + key + " must be lower than " + max + 1;
      //     }
      //   }
      // }
    }
  }
  return result;
}

export default QueryCheck;
