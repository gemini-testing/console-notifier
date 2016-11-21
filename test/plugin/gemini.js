'use strict';

const proxyquire = require('proxyquire');
const init = require('../utils').init;

const Events = {
    ERROR: 'fooBarErr',
    TEST_RESULT: 'fooBarTestResult',
    END_RUNNER: 'fooBarEndRunner'
};

describe('plugin/gemini', () => {
    const sandbox = sinon.sandbox.create();

    const initGemini = () => init(Events);

    let plugin;
    let notifier;

    beforeEach(() => {
        notifier = sandbox.stub();

        plugin = proxyquire('../../gemini', {
            './lib/notify': notifier
        });
    });

    afterEach(() => sandbox.restore());

    it('should notify on "END_RUNNER"', () => {
        const gemini = initGemini();

        plugin(gemini, {});

        gemini.emit(Events.END_RUNNER);

        assert.calledOnce(notifier);
    });

    it('should notify passed logs', () => {
        const gemini = initGemini();

        plugin(gemini, {logs: 'some-logs'});

        gemini.emit(Events.END_RUNNER);

        assert.calledWith(notifier, 'some-logs');
    });

    describe('should consider gemini to be failed', () => {
        it('if "ERROR" event was emitted', () => {
            const gemini = initGemini();

            plugin(gemini, {});

            gemini.emit(Events.ERROR);
            gemini.emit(Events.END_RUNNER);

            assert.calledWith(notifier, sinon.match.any, {failed: true});
        });

        it('if "TEST_RESULT" event with diff was emitted at least once', () => {
            const gemini = initGemini();

            plugin(gemini, {});

            gemini.emit(Events.TEST_RESULT, {equal: false});
            gemini.emit(Events.TEST_RESULT, {equal: true});
            gemini.emit(Events.END_RUNNER);

            assert.calledWith(notifier, sinon.match.any, {failed: true});
        });
    });
});
