import execa from 'execa';
import fs from 'fs';
import { promisify } from 'util';
import { lexer } from './lexer.js';

const access = promisify(fs.access);
const writeToFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFileSync);
const currentDir = `${process.cwd()}/`;


export async function convertTjsToJs(options) {
    const template = options.template;
    if (template === undefined) {
        console.error("Tenet.js::Error\tNoArgumentError::TemplateUndefined\t...\tuse --help if you're lost.");
        process.exit(1);
    }
    const tsFileName = template.replace("tjs", "ts");

    const data = readFromFile(`${currentDir}${template}`);
    await writeToFile(`${currentDir}${tsFileName}`, data, 'utf8');
    await execa('tsc', [tsFileName]);

}

async function checkFile(filename) {
    await access(filename, fs.constants.R_OK, (err) => {
        console.error(`${filename} ${err ? 'is not readable' : 'is readable'}`);
    });
}

function readFromFile(filename) {
    const file = readFile(filename, {encoding: 'utf8', flags: 'r'} );
    return lexer(file);
}
