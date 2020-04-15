const { statSync, readdirSync } = require("fs");
const videoExtensions = require("./videoExtensions.json");
const path = require("path");

const absPath = (dir, file) => path.join(dir, file);
const fileExtension = (file) => file.split('.').pop();

const traverseDirectory = (dir) => {
  const contents = readdirSync(dir);
  const files = [];
  const directories = [];
  contents.forEach(content => {
    const absoluteContentPath = absPath(dir, content);
    const contentStats = statSync(absoluteContentPath);
    if (contentStats.isFile() && videoExtensions.includes(fileExtension(content))) {
      files.push(absoluteContentPath);
    }
    if (contentStats.isDirectory()) {
      directories.push(absoluteContentPath);
    }
  });

  return files.concat(
    directories.map(traverseDirectory).flat(1)
  );
};

module.exports = {
  traverseDirectory,
};
