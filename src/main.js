import { exec } from 'child_process';
import { access, createReadStream, createWriteStream, constants } from 'fs';
import { promisify } from 'util';
import { compiler } from './compiler.js';
const accessPromd = promisify(access);
const currentDir = `${process.cwd()}/`;


/**
 * Creates typescript file then calls the tsc
 * @param options
 * @returns {Promise<void>}
 */
export async function convertTxToJs(options) {
    let addedOptions = [];
    const fileName = options.template;
    const path = currentDir + fileName;

    try {
        await checkFile(currentDir + fileName);
    } catch (e) {
        console.error(`[Tx.js::Error]\nTemplateUndefined\t...\tFile '${fileName}' is not readable.`);
        process.exit(1);
    }

    const tsFileName = path.replace('.tx', '.ts');
    await readFromFile(path, tsFileName);

    optionConfigs(options, addedOptions);
    console.log(`Compiling '${fileName}'...`);

    exec('tsc', (error, stdout, stderr) => {
        console.log(`ERROR: ${stdout}`);
    });
}

/**
 *  Checks the readability of the .tx file
 * @param filename
 * @returns {Promise<void>}
 */
async function checkFile(filename) {
    await accessPromd(filename, constants.R_OK);
}

/**
 * String (text) from the .tx file ran through the Compiler, modified for tsc readability
 * @param txPath
 * @param tsPath
 */
function readFromFile(txPath, tsPath) {
    let readStream = createReadStream(txPath, 'utf8');
    let writeStream = createWriteStream(tsPath);
    readStream.on('data', (code) => {
        const data = compiler(code);
        writeStream.write(data);
    });
}

/**
 * Evaluates added cli options
 * @param options
 * @param optionsList
 * @returns string
 */
function optionConfigs(options, optionsList) {
    options.prettify && optionsList.push('--pretty');
    options.strict && optionsList.push('--strict');
}