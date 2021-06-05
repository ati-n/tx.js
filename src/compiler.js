
export const compiler = function (input) {

    const typesForRegex = /\b(?:int|str|bool|double|big|obj)\b/g;
    const builtInTypes = "Array|ArrayBuffer|Atomics|BigInt|BigInt64Array|BigUint64Array|Boolean|DataView|Date|Float32Array|Float64Array|Function|Generator|GeneratorFunction|Int8Array|Int16Array|Int32Array|Intl|Map|Number|Object|Proxy|Reflect|RegExp|Set|SharedArrayBuffer|SIMD|String|Symbol|TypedArray|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|WeakMap|WeakSet|Promise";
    const collectSnC = input.match(/(\/\*[\s\S]*?\*\/|\/\/.+|"\D+?"|'\D+?')/g);

    // Function to replace
    function replacer() {
        return "_RPLCR_";
    }

    // Putting strings & comments back
    function putSnCBack() {
        return collectSnC.shift();
    }

    //A switch-object to find the TS type for its Tx equivalent
    const typeOf = {
        int:    "number",
        double: "number",
        big: "bigint",
        str:     "string",
        bool:   "boolean",
        sym:  "symbol",
        obj:  "object",
        /* no equivalent for `never`, `unknown`, `void`, `any` */
    };

    // Removing strings & comments from the code
    const inputWithoutSnC = input.replace(/(\/\*[\s\S]*?\*\/|\/\/.+|"\D+?"|'\D+?')/g, () => replacer());
    // Collecting user-defined type names
    const types = inputWithoutSnC.match(/\b(?<=(?:type|interface|class)\s{1,99})\w+(?=\s{1,99}[={])/g)?.join('|')?.insertAt(0,'|') || '';
    // Regex to find where to insert 'let' in the code, creating TS variables
    const insertLet = RegExp(`(?<!(?:const|public|private|protected|readonly|override|\\(|,)\\s{0,99})(?:int|str|bool|double|big|obj|Array<.*>|Collection<.*>|${builtInTypes}${types}|\\w+\\[])(\\w*?\\[])?\\s+?\\w+\\s*[=;]`,'g');
    // Regex to create functions
    const functions = RegExp(`\\b(int|str|bool|double|big|obj|sym|void|never|unknown|undefined|Array<.*>|Collection<.*>|${builtInTypes}${types}|\\w+\\[])(\\w*?\\[])?\\s+(\\w*)\\s*(\\(.*\\))\\s*(?!,)`, "g");
    // Regex to swap variable names and type annotations
    const regex = RegExp(`\\b(int|str|bool|double|big|obj|Array<.*>|Collection<.*>|${builtInTypes}${types}|\\w+\\[])(\\w*?\\[])?\\s+(\\w+\\??\\s*?(\\(.*?\\))?)`,'g');// /\b(int|str|bool|double|big|obj|Array<.*>|Collection<.*>|${builtInTypes}${types}|\w+\[])(\w*?\[])?\s+(\w+\??\s*?(\(.*?\))?)/
    // This is where the magic happens
    const output = inputWithoutSnC.replace(insertLet, 'let $&')
                                    .replace(functions, `function $3 $4: $1$2`)
                                    .replace(regex,`$3: $1$2`)
                                    .replace(regex,`$3: $1$2`)
                                    .replace(typesForRegex, matched => typeOf[matched]);

    // Returning with strings & comments put back in
    return output.replace(/_RPLCR_/g, () => putSnCBack());
}

// Helper
// Insert substring into a string at a given point
String.prototype.insertAt = function(index,str){
    return this.slice(0,index) + str + this.slice(index)
}
