'use strict';

const notify = require('./lib/notify');

module.exports = (hermione, opts) => {
    let failed = false;

    hermione.on(hermione.events.ERROR, () => failed = true);
    hermione.on(hermione.events.TEST_FAIL, () => failed = true);
    hermione.on(hermione.events.SUITE_FAIL, () => failed = true);

    hermione.on(hermione.events.RUNNER_END, () => notify(opts.logs, {failed}));
};
