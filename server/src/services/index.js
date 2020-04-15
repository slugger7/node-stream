const { fs } = require('./fs');
const { video } = require('./video');

const services = app => {
    fs(app);
    video(app)
}

module.exports = {
    services
};