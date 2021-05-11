import arg from 'arg';
import { convertTjsToJs } from './main.js';
const { version } = require('../package.json');

function parseArgumentsIntoOptions(rawArgs) {
    const slicedArgs = rawArgs.slice(2);
    const args = arg(
        {
            '--help': Boolean,
            '--install': Boolean,
            '--pretty': Boolean,
            '--version': Boolean,
            '-help': '--help',
            '-h': '--help',
            '-i' : '--install',
            '-p': '--pretty',
            '-v': '--version',
        },
        { argv: slicedArgs },
    );

    return {
        prettify: args['--pretty'] || false,
        runInstall: args['--install'] || false,
        sendHelp: args['--help'] || false,
        whichVersion: args['--version'] || false,
        template: args._[0],
        argvLength: slicedArgs.length,
    }
}

function checkOptions(options) {
    if (options.argvLength && !options.template) {
        if (options.runInstall) {
            console.log('Installing...');
            process.exit(0);
        }
        if (options.whichVersion) {
            console.log(`Version ${version}`);
            process.exit(0);
        }
        if (options.sendHelp) {
            console.log('\n-h\t--help\t\tthis message\n-v\t--version\tcurrent version\n-i\t--install\tinstall tenet.js\n-p\t--pretty\tenables typescript pretty\n');
            process.exit(0);
        } else if (options.template) {
            return Promise.resolve();
        }
    } else {
        console.error("Tenet.js::Error\tIllegalArgumentError\t... Use `tenet --help` if you're lost.");
        process.exit(1);
    }
}


export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    await checkOptions(options);
    await convertTjsToJs(options);
}