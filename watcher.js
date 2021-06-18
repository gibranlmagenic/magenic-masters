const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const fs = require('fs');
const EventEmitter = require('events');

const nameInput = argv.name;
const pathInput = argv.path;

class FileWatcher extends EventEmitter {
    
    constructor (name, path) {
        super();
        this.name = name;
        this.path = path;
    }

    watchDir = () => {

        this.emit('startWatch', this.path);
        
        fs.watch(this.path, (eventType, fileName) => {
            if(eventType === 'change' || eventType === 'rename') {
                this.emit('nameFoundOnFile', fileName);
            }
        });

    }

}

async function run() {
    let watcher = new FileWatcher(nameInput, pathInput);

    const searchName = (fileName) => {

        return new Promise((resolve, reject) => {

            const regex = new RegExp(nameInput, "i");
    
            fs.readFile(`${pathInput}/${fileName}`, 'utf8', function (err, contents) {

                    if(err)
                        console.log(`Error encountered: ${err.message}`);

                    if (contents.match(regex)) {
                        resolve(console.log('Found in file', fileName));
                    } else {
                        reject(console.log(`Not found in file`));
                    }
                
            });
        });
    }
    
    watcher.on('startWatch', () => console.log(`Watching path: ${pathInput}`));
    watcher.on('nameFoundOnFile', searchName);
    watcher.watchDir();
}
  
run();
