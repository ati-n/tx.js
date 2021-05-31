import arg from 'arg';
import { convertTxToJs } from './main.js';
import { readFile } from 'fs/promises';
import {exec} from "child_process";
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
            '--init': Boolean,
            '--help': Boolean,
            '--version': Boolean,
            '--pretty': Boolean,
            '--strict': Boolean,
            '-h': '--help',
            '-V': '--version',
            '-p': '--pretty',
        },
        { argv: slicedArgs, permissive: true},
    );
    return {
        init: args['--init'] || false,
        sendHelp: args['--help'] || false,
        whichVersion: args['--version'] || false,
        prettify: args['--pretty'] || false,
        strict: args['--strict'] || false,
        template: args._[0],
        argvLength: slicedArgs.length,
    }
}

/**
 * Checks CLI options
 * @param init
 * @param sendHelp
 * @param template
 * @param whichVersion
 * @param argvLength
 */
function checkOption({init, sendHelp, template, whichVersion, argvLength}) {
    if (!argvLength) {
        console.log('\nSyntax:\ttxc [options] [filename]');
        console.error("[Tx.js::Error]\nNoArgumentError\t... Use `txc --help` if you're lost.");

    } else if (!template) {
        init && exec('tsc --init', (stdout) => {
            console.error(stdout);
        });
        sendHelp && console.log(`[Options]\n--help\t\t-h\tthis message
--version\t-v\tcurrent version
--pretty\t-p\tenable typescript pretty
--strict\t\tenable strict mode ('use strict')`);
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