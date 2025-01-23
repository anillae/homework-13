const fetchUsers = require('./script.js');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

describe('fetchUsers', () => {
    let consoleLogStub;
    const usersMock = [
        { id: 1, name: 'Leanne Graham' },
        { id: 2, name: 'Ervin Howell' },
    ];

    beforeEach(() => {
        consoleLogStub = sinon.stub(console, 'log');
        global.fetch = sinon.stub().resolves({
            ok: true,
            json: () => Promise.resolve(usersMock),
        });
    });

    afterEach(() => {
        consoleLogStub.restore();
        sinon.restore();
    });

    it('должен регистрировать имена пользователей в консоли', async () => {
        await fetchUsers();
        expect(consoleLogStub.calledWith('Leanne Graham')).to.be.true;
        expect(consoleLogStub.calledWith('Ervin Howell')).to.be.true;
    });

    it('должен корректно обрабатывать ошибки', async () => {
        fetch.withArgs('https://jsonplaceholder.typicode.com/users').resolves({ ok: false });
        await fetchUsers();
        expect(consoleLogStub.notCalled).to.be.true; 
    });
});