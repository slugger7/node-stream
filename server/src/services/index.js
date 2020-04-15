const { fs } = require('./fs');

const services = app => {
    fs(app);
}

module.exports = {
    services
};