const path = require(`path`);
module.exports = {
  entry: `./js/scripts.js`,
  output: {
    filename: `main.js`,
    path: path.resolve(__dirname, `dist`),
  },
};
