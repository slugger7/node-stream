const { readdirSync, statSync } = require("fs");
const path = require("path");
const videoExtensions = require("../videoExtensions.json");
const { traverseDirectory } = require("../traverseDirectory");

const isFilePredicate = (dir, content) =>
  statSync(path.join(dir, content)).isFile();
const getFileExtension = (file) => file.split(".").pop();
const isVideoPredicate = (content) =>
  videoExtensions.includes(getFileExtension(content));
const filterFilesByExtension = (dir) => {
  const dirContents = readdirSync(dir);
  const files = dirContents.filter(
    (content) => isFilePredicate(dir, content) && isVideoPredicate(content)
  );
  return files;
};

const base = "/fs";

const fs = (app) => {
  app.get(`${base}/videos`, (req, res) => {
    const { dir } = req.query;
    const files = filterFilesByExtension(dir);
    res.json({
        path: dir,
        contents: files
    });
  });

  app.get(`${base}/ls`, (req, res) => {
    const { dir } = req.query;
    const contents = readdirSync(!!directory ? directory : "/");
    res.json({
      path: dir,
      contents,
    });
  });

  app.get(`${base}/lsr`, (req, res) => {
    const { dir } = req.query;
    const files = traverseDirectory(dir);
    res.json({
      path: dir,
      content: files,
      count: files.length
    });
  });
};

module.exports = {
  fs,
};
