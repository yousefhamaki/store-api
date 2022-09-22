import fs from "fs";

const SearchFile = (path: string): boolean => {
  try {
    if (fs.existsSync(path)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default SearchFile;
