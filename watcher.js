const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const notifier = require('node-notifier');

const fs = require('fs');
const EventEmitter = require('events');
const util = require('util');
const reader = util.promisify(fs.readFile);

const nameInput = argv.name;
const pathInput = argv.path;

class FileWatcher extends EventEmitter {
  constructor (name, path) {
    super();
    this.name = name;
    this.path = path;
  }

  async isNameFound (eventType, fileName) {
    const regex = new RegExp(nameInput, 'i');

    if (eventType === 'change') {
      const contents = await reader(`${pathInput}\\${fileName}`, 'utf8');
      return contents.match(regex);
    }
  }

    watchDir = () => {
      this.emit('startWatch', this.path);

      var watching = false;

      fs.watch(this.path, (eventType, fileName) => {
        if (watching) return;
        watching = true;

        const nameSearch = this.isNameFound(eventType, fileName);

        if (nameSearch) {
          this.emit('nameFoundOnFile', fileName);
        }

        setTimeout(() => {
          watching = false;
        }, 100);
      });
    }
}

async function run () {
  const watcher = new FileWatcher(nameInput, pathInput);

  const printToConsole = (fileName) => {
    const message = `Your name was mentioned in file: ${fileName}`;
    console.log(message);
  };

  const openToastNotification = (fileName) => {
    const message = `Your name was mentioned in file: ${fileName}`;
    notifier.notify(message);
  };

  watcher.on('startWatch', () => console.log(`Watching path: ${pathInput}`));
  watcher.on('nameFoundOnFile', printToConsole);
  watcher.on('nameFoundOnFile', openToastNotification);
  watcher.watchDir();
}

run();
