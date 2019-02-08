const expect = require('chai').expect;

const { hello, add } = require('../../routes/greeting');

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    }
};

let resAdd = {
    sendCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    }
};

describe('[route] Greetings', function() {
    describe('[function] Hello()', function() {
        it('Should error out if no name provided ', function() {
            hello(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });

        it('Should respond in English as default', function() {
            let newReq = req;
            newReq.body.name = 'Jody';
            
            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Hello, Jody');
        });

        it('Should error on invalid language', function() {
            let newReq = req;
            newReq.body.name = 'Jody';
            newReq.body.language = 'bad-input';
            
            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Error: Invalid Language');
        });

        it('Should return greeting for english, spanish, or german', function() {
            let newReq = req;
            newReq.body.name = 'Jody';

            newReq.body.language = 'en';
            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Hello, Jody');

            newReq.body.language = 'es';
            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Hola, Jody');

            newReq.body.language = 'de';
            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Hallo, Jody');
        });        
    })
    describe('[function] Add()', function() {
        it('Should calculate the passed parameter ', function() {
            let newReq = {
                body: {
                    firstNumber: 10,
                    secondNumber: 25
                },
            };                

            add(newReq, resAdd);
            expect(resAdd.sendCalledWith).to.equal(35);
        });
    })
});