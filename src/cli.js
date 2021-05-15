import arg from 'arg';
import { convertTxToJs } from './main.js';
import { readFile } from 'fs/promises';
const json = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));

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
            '--version': Boolean,
            '--pretty': Boolean,
            '--strict': Boolean,
            '--es3': Boolean,
            '-h': '--help',
            '-V': '--version',
            '-p': '--pretty',
        },
        { argv: slicedArgs, permissive: true},
    );
    return {
        sendHelp: args['--help'] || false,
        whichVersion: args['--version'] || false,
        prettify: args['--pretty'] || false,
        strict: args['--strict'] || false,
        es3: args['-es3'] || false,
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
        sendHelp && console.log(`[Options]\n--help\t\t-h\tthis message
--version\t-v\tcurrent version
--pretty\t-p\tenable typescript pretty
--strict\t\tenable strict mode ('use strict')
--es3\t\t\tTSC compiles with ES3 (instead of ES6)`);
        whichVersion && console.log(`Version ${json.version}`);

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