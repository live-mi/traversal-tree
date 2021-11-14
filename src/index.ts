import { cli } from './cli';

(async () => {
    if (process.argv.length > 2) {
        await cli();
    } else {
        console.log(`Provide available command: \nstatistics`);
    }
})();
