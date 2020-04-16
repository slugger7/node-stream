const { statSync, createReadStream } = require("fs");
const { findMovies } = require('../graph/movie');

const base = '/video';
const video = (app) => {
  const graphDriver = app.get('graphDriver');

  app.get(`${base}/find`, async (req, res) => {
    const search = JSON.parse(req.query.search || "\{\}");
  
    const response = await findMovies(graphDriver, search);

    res.json(response);
  });

  app.get(`${base}/stream/:filename`, function (req, res) {
    const { filename } = req.params;
    const path = decodeURIComponent(filename);
    const stat = statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res
          .status(416)
          .send(
            "Requested range not satisfiable\n" + start + " >= " + fileSize
          );
        return;
      }

      const chunksize = end - start + 1;
      const file = createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  });
};

module.exports = {
  video
}