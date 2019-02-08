module.exports = {
    hello: function(req, res) {
        if (!req.body.name) {
            return res.send('An error occurred: Name is a required parameter');
        }

        const name = req.body.name;
        const lang = req.body.language || 'en';
        switch(lang) {
            case 'en':
                return res.send('Hello, ' + name)
                break;
            case 'es':
                return res.send('Hola, ' + name)
                break;
            case 'de':
                return res.send('Hallo, ' + name)
                break;
            default:
                return res.send('Error: Invalid Language')
        }
    },
    add: function(req, res) {        
        if (req.body.firstNumber < 0) {
            return res.send('An error occurred: First Number is a required parameter');
        }

        if (req.body.secondNumber < 0) {
            return res.send('An error occurred: Second Number is a required parameter');
        }

        return res.send(req.body.firstNumber + req.body.secondNumber);
    }
};