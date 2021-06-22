const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../pokemon.json');
const db = lowdb(adapter);
const pokemonEndpoint = 'pokemons';

db.defaults({ pokemons: [] }).write();

const compareName = (n, pokeName) => {
    if (n.name.localeCompare(pokeName, undefined, { sensitivity: 'accent' }) === 0) {
        return true;
    }
    return false;
};

exports.get = () => {
    const pokemons = db.get(pokemonEndpoint).value();

    return pokemons;
};

exports.getByName = (pokeName) => {
    console.log('getByName : '+pokeName);

    const pokemon = db.get(pokemonEndpoint)
                        .filter(n => compareName(n, pokeName));

    return pokemon;
};

exports.insert = (pokemon) => {
    const { name } = pokemon;

    const isPokemonExist =
        db
            .get(pokemonEndpoint)
            .value()
            .filter((_) => _.name === name).length > 0;

    if (isPokemonExist) {
        return {
            success: false,
            errorMessage: `Pokemon ${name} already exist.`,
        };
    }

    db.get(pokemonEndpoint).push(pokemon).write();

    return {
        success: true,
    };
};

exports.delete = (pokeName) => {
    db.get(pokemonEndpoint)
    .remove(n => compareName(n, pokeName))
    .write();
    console.log(`${pokeName} DELETED`);
};
