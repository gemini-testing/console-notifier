'use strict';

const EventEmitter = require('events').EventEmitter;

exports.init = (events) => {
    const tool = new EventEmitter();

    tool.events = events;

    return tool;
};
