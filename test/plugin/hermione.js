'use strict';

const proxyquire = require('proxyquire');
const init = require('../utils').init;

const Events = {
    ERROR: 'fooBarErr',
    TEST_FAIL: 'fooBarTestFail',
    SUITE_FAIL: 'fooBarSuiteFail',
    RUNNER_END: 'fooBarRunnerEnd'
};

describe('plugin/hermione', () => {
    const sandbox = sinon.sandbox.create();

    const initHermione = () => init(Events);

    let plugin;
    let notifier;

    beforeEach(() => {
        notifier = sandbox.stub();

        plugin = proxyquire('../../hermione', {
            './lib/notify': notifier
        });
    });

    afterEach(() => sandbox.restore());

    it('should notify on "RUNNER_END"', () => {
        const hermione = initHermione();

        plugin(hermione, {});

        hermione.emit(Events.RUNNER_END);

        assert.calledOnce(notifier);
    });

    it('should notify passed logs', () => {
        const hermione = initHermione();

        plugin(hermione, {logs: 'some-logs'});

        hermione.emit(Events.RUNNER_END);

        assert.calledWith(notifier, 'some-logs');
    });

    describe('should consider hermione to be failed', () => {
        it('if "ERROR" event was emitted', () => {
            const hermione = initHermione();

            plugin(hermione, {});

            hermione.emit(Events.ERROR);
            hermione.emit(Events.RUNNER_END);

            assert.calledWith(notifier, sinon.match.any, {failed: true});
        });

        it('if "TEST_FAIL" event was emitted', () => {
            const hermione = initHermione();

            plugin(hermione, {});

            hermione.emit(Events.TEST_FAIL);
            hermione.emit(Events.RUNNER_END);

            assert.calledWith(notifier, sinon.match.any, {failed: true});
        });

        it('if "SUITE_FAIL" event was emitted', () => {
            const hermione = initHermione();

            plugin(hermione, {});

            hermione.emit(Events.SUITE_FAIL);
            hermione.emit(Events.RUNNER_END);

            assert.calledWith(notifier, sinon.match.any, {failed: true});
        });
    });
});
