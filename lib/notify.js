'use strict';

const chalk = require('chalk');
const _ = require('lodash');
const logger = require('./utils').logger;

const conditions = {
    success: (failed) => !failed,
    fail: _.identity
};

const shouldBeLogged = (log, opts) => !log.on || conditions[log.on] && conditions[log.on](opts.failed);

const color = (log) => log.color ? _.get(chalk, log.color, 'reset')(log.text) : log.text;

module.exports = (logs, opts) => {
    _(logs)
        .map((log) => _.isString(log) ? {text: log} : log)
        .filter((log) => log.text)
        .value()
        .forEach((log) => shouldBeLogged(log, opts) && logger.log(color(log)));
};
