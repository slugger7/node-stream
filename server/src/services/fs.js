const { readdirSync, statSync } = require('fs');
const path = require('path');
const videoExtensions = require('../videoExtensions.json');

const isFilePredicate = (dir, content) => statSync(path.join(dir, content)).isFile();
const getFileExtension = file => file.split('.').pop()
const isVideoPredicate = content => videoExtensions
    .includes(getFileExtension(content));
const filterFilesByExtension = (dir) => {
    const dirContents = readdirSync(dir);
    const files = dirContents
        .filter(content => 
            isFilePredicate(dir, content) && 
            isVideoPredicate(content)
        );
    return files
}

const base = '/fs';

const fs = app => {
    app.get(`${base}/videos`, (req, res) => {
        const { dir } = req.query;
        const files = filterFilesByExtension(dir);
        res.json(files);
    });
}

module.exports = {
    fs
};