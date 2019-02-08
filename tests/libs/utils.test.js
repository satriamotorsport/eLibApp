const expect = require('chai').expect;

const utils = require('../../libs/utils');

describe('[libs] Utils', function() {
    describe('[function] Add()', function() {
        it('should add two numbers', () => {
        var res = utils.add(33, 11);
        
        expect(res).to.equal(44);
        });
    })

    describe('[function] AsyncAdd()', function() {
        it('should async add two numbers', (done) => {
        utils.asyncAdd(4, 3, (sum) => {
            expect(sum).to.equal(7);
            done();
        });
        });
    })

    describe('[function] Square()', function() {
        it('should square a number', () => {
        var res = utils.square(3);

        expect(res).to.equal(9);
        });
    })

    describe('[function] AsyncSquare()', function() {
        it('should async square a number', (done) => {
        utils.asyncSquare(5, (res) => {
            expect(res).to.equal(25);
            done();
        });
        });
    })

    describe('[function] AsyncSquare()', function() {
        it('should set firstName and lastName', () => {
        var user = {location: 'Philadelphia', age: 25};
        var res = utils.setName(user, 'Andrew Mead');

        expect(res).to.include({firstName: 'Andrew', lastName: 'Mead'});        
        });
    })

});