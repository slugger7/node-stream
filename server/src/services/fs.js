const { readdirSync, statSync } = require("fs");
const path = require("path");
const videoExtensions = require("../videoExtensions.json");
const { traverseDirectory } = require("../traverseDirectory");
const { createMovies } = require('../graph/movie');

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
  const graphDriver = app.get('graphDriver');

  app.get(`${base}/videos`, (req, res) => {
    const { dir } = req.query;
    const files = filterFilesByExtension(dir);
    res.json({
      path: dir,
      contents: files,
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

  app.get("/movie/:title", async (req, res) => {
    const { title } = req.params;
    const graphSession = graphDriver.session()

    const query = `MATCH (m:movie {title: "${title}"}) RETURN m`;
    const result = await graphSession.run(query);

    console.log('result', JSON.stringify(result.records.pop()._fields.pop(), null, 2));

    graphSession.close();

    res.json({ cool: "ok"});
  });

  const createMovie = (node) =>
    `(:movie {title: "${node.name}", baseName: "${node.base}", dir: "${node.dir}", ext: "${node.ext}"})`;

  app.get(`${base}/lsr`, async (req, res) => {
    const { dir } = req.query;
    const files = traverseDirectory(dir);
    const deconstructedFiles = files.map(path.parse);

    const creationStrings = deconstructedFiles.map((file) =>
      createMovie(file)
    );

    const response = await createMovies(graphDriver, creationStrings);

    res.json(response);
  });
};

module.exports = {
  fs,
};
