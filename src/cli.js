import arg from 'arg';
import { convertTxToJs } from './main';
const { version } = require('../package.json');

/**
 * Transplant.js CLI
 * @param args
 */
export async function cli(args) {
    const options = parseArgumentsIntoOptions(args);
    checkOption(options);
    await convertTxToJs(options);
}


/**
 * CLI options parser
 * @param rawArgs
 * @returns {{template: string, whichVersion: boolean, prettify: boolean, sendHelp: boolean, argvLength}}
 */
function parseArgumentsIntoOptions(rawArgs) {
    const slicedArgs = rawArgs.slice(2);
    const args = arg(
        {
            '--help': Boolean,
            '--pretty': Boolean,
            '--version': Boolean,
            '-help': '--help',
            '-h': '--help',
            '-p': '--pretty',
            '-V': '--version',
        },
        { argv: slicedArgs, permissive: true},
    );
    return {
        prettify: args['--pretty'] || false,
        sendHelp: args['--help'] || false,
        whichVersion: args['--version'] || false,
        template: args._[0],
        argvLength: slicedArgs.length,
    }
}

/**
 * Checks CLI options
 * @param sendHelp
 * @param template
 * @param whichVersion
 * @param argvLength
 */
function checkOption({sendHelp, template, whichVersion, argvLength}) {
    if (!argvLength) {
        console.log('\nSyntax:\ttxc [options] [filename]');
        console.error("[Tx.js::Error]\nNoArgumentError\t... Use `txc --help` if you're lost.");

    } else if (!template) {
        sendHelp ? console.log('[Options]\n-h\t--help\t\tthis message\n-v\t--version\tcurrent version\n--p\t--pretty\tenables typescript pretty\n') : null;
        whichVersion ? console.log(`Version ${version}`) : null;

    } else {
        templateExtensionCheck(template);
        return;
    }
    process.exit(0);
}

/**
 *  Template extension check
 * @param template
 */
function templateExtensionCheck(template) {
    if (!template.endsWith('.tx')) {
        const tempTx = template.indexOf('.') > -1 ? template.slice(0,template.indexOf('.'))+'.tx' : template+'.tx';
        console.error(`[Tx.js::Error]\nTemplateUndefined\t...\t Maybe you meant \'${tempTx}\' ?`);
        process.exit(1);
    }
}