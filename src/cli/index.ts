import 'colors';
import { Command } from 'commander';
import { statistics } from './statistics';

export const cli = async () => {
    const program = new Command();

    program
        .command('statistics')
        .alias('s')
        .description('Get statistics about a page')
        .option('-u, --url [string]', 'Page url to analyze')
        .action(statistics)

    await program.parseAsync(process.argv);
}
