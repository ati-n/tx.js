import execa from 'execa';
import { access, createReadStream, createWriteStream, constants } from 'fs';
import { promisify } from 'util';
import { lexer } from './lexer';

const accessPromd = promisify(access);
const currentDir = `${process.cwd()}/`;

/**
 * Creates typescript file then calls the tsc
 * @param options
 * @returns {Promise<void>}
 */
export async function convertTxToJs(options) {
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

    const addedOptions = optionConfigs(options);
    console.log(`Compiling '${tsFileName}'...`);
    if (addedOptions)
        execa('tsc', [...addedOptions, tsFileName]).catch(console.log);
    else
        execa('tsc', [tsFileName]).catch(console.log);
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
 * String (text) from the .tx file ran through the Lexer, modified for tsc readability
 * @param txPath
 * @param tsPath
 */
function readFromFile(txPath, tsPath) {
    let readStream = createReadStream(txPath, 'utf8');
    let writeStream = createWriteStream(tsPath);
    readStream.on('data', (code) => {
        const data =lexer(code);
        writeStream.write(data);
    });
}

/**
 * Evaluates added cli options
 * @param options
 * @returns string
 */
function optionConfigs(options) {
    return options.prettify ? '--pretty' : null;
}