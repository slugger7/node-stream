const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/list-directory/:directory', (req, res) => {
    const { directory } = req.params;
    const directories = fs.readdirSync(!!directory ? directory : '/');
    res.json({
        path: directory,
        directories
    });
});

app.get('/video/:filename', function(req, res) {
    const { filename } = req.params;
  const path = `${filename}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1;

    if(start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
      return;
    }
    
    const chunksize = (end-start)+1;
    const file = fs.createReadStream(path, {start, end});
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}!`)
});