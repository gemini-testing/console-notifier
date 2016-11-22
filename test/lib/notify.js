'use strict';

const chalk = require('chalk');
const notify = require('../../lib/notify');
const logger = require('../../lib/utils').logger;

describe('lib/notify', () => {
    const sandbox = sinon.sandbox.create();

    beforeEach(() => sandbox.stub(logger, 'log'));

    afterEach(() => sandbox.restore());

    it('should support object notation of logs', () => {
        notify([{text: 'first'}, {text: 'second'}]);

        assert.calledTwice(logger.log);
        assert.calledWith(logger.log, 'first');
        assert.calledWith(logger.log, 'second');
    });

    it('should not show logs without "text" property', () => {
        notify([{some: 'property'}, {another: 'property'}]);

        assert.notCalled(logger.log);
    });

    it('should show only "success" logs if not failed', () => {
        notify([{text: 'success-log', on: 'success'}, {text: 'fail-log', on: 'fail'}], {failed: false});

        assert.calledOnce(logger.log);
        assert.calledWith(logger.log, 'success-log');
    });

    it('should show common logs if not failed', () => {
        notify([{text: 'common-log'}], {failed: false});

        assert.calledOnce(logger.log);
        assert.calledWith(logger.log, 'common-log');
    });

    it('should show only "fail" logs if failed', () => {
        notify([{text: 'success-log', on: 'success'}, {text: 'fail-log', on: 'fail'}], {failed: true});

        assert.calledOnce(logger.log);
        assert.calledWith(logger.log, 'fail-log');
    });

    it('should show common logs if failed', () => {
        notify([{text: 'common-log'}], {failed: true});

        assert.calledOnce(logger.log);
        assert.calledWith(logger.log, 'common-log');
    });

    it('should not show logs with incorrect "on" property', () => {
        notify([{text: 'some-log', on: 'incorrect'}]);

        assert.notCalled(logger.log);
    });

    it('should support string notation of logs', () => {
        notify(['first', 'second']);

        assert.calledTwice(logger.log);
        assert.calledWith(logger.log, 'first');
        assert.calledWith(logger.log, 'second');
    });

    it('should show colored logs which have "color" property', () => {
        notify([{text: 'some-log', color: 'bold.red'}]);

        assert.calledWith(logger.log, chalk.bold.red('some-log'));
    });
});
