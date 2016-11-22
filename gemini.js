'use strict';

const notify = require('./lib/notify');

module.exports = (gemini, opts) => {
    let failed = false;

    gemini.on(gemini.events.ERROR, () => failed = true);
    gemini.on(gemini.events.TEST_RESULT, (res) => failed = failed || !res.equal);

    gemini.on(gemini.events.END_RUNNER, () => notify(opts.logs, {failed}));
};
