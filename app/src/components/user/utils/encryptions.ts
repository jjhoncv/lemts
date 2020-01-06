const bcrypt = require("bcrypt");

const verifyHash = async (password: string, hash: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err: any, result: string) => {
      if (result) {
        resolve(true);
      }
      resolve(false);
    });
  });
