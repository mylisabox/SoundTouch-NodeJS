const parser = require('xml-js');

module.exports = {

    convert: function (xml) {
        const options = {
            compact: true,
            trim: true,
            textKey: 'text',
            sanitize: true,
            attributesKey: 'attributes'
        };
        return JSON.parse(parser.xml2json(xml, options));
    },

    convertResponse: function(response, handler) {
        let output = "";
        const options = {
            compact: true,
            textKey: 'text',
            trim: true,
            sanitize: true,
            attributesKey: 'attributes'
        };
        response.on('data', function (chunk) {
            output += chunk;
        });

        response.on('end', function() {
            handler(JSON.parse(parser.xml2json(output, options)))
        });
    }
};
