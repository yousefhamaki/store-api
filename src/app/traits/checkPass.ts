const standard = {
  string: "ABCDEFGHIKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  hash: "!@#$%^&*()_+={}?><':;\"|/-",
};

const loop = (el: string, pass: string, type: string): string => {
  const check = el.split("");
  for (let i = 0; i < check.length; i++) {
    const element = el[i];
    if (pass.split("").indexOf(element) > -1) {
      return type;
    }
  }
  return "";
};

async function checkPass(pass: string) {
  const string = await loop(standard.string, pass, "string");
  const number = await loop(standard.number, pass, "number");
  const hash = await loop(standard.hash, pass, "hash");

  const check = [string, number, hash];
  for (let index = 0; index < check.length; index++) {
    if (check[index] === "") {
      check.splice(index, 1);
    }
  }
  return check;
}

export default checkPass;
