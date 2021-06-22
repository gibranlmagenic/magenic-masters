const { pokemonService } = require('../services');
const url = require('url');

exports.handleGetRequest = (req, res) => {
    const pokemonUrl = new URL(req.url, `http://${req.headers.host}`);

    let data;
    if (pokemonUrl.toString().includes('?')) {
        console.log(pokemonUrl.searchParams);
        const params = pokemonUrl.searchParams;
        data = pokemonService.getByName(params.get('name'));
    } else {
        data = pokemonService.get();
    }

    const result = { data };

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(result));
    res.end();
};

exports.handlePostRequest = (req, res) => {
    const data = [];

    req.on('data', (chunk) => {
        data.push(chunk);
    });

    req.on('end', () => {
        const parsedData = Buffer.concat(data).toString();
        const dataJson = JSON.parse(parsedData);

        const result = pokemonService.insert(dataJson);

        if (!result.success) {
            res.writeHead(400, {
                'Content-Type': 'application/json',
            });
            res.write(JSON.stringify(result));
            res.end();
        }

        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        res.write(JSON.stringify(result));
        res.end();
    });
};

exports.handleDeleteRequest = (req, res) => {
    const pokemonUrl = new URL(req.url, `http://${req.headers.host}`);

    const params = pokemonUrl.searchParams;
    pokemonService.delete(params.get('name'));

    const data = pokemonService.get();
    const result = { data };

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(result));
    res.end();
};
