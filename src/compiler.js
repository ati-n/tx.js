export const compiler = function (input) {

    const typeOf = {
        int:    "number",
        double: "number",
        big: "bigint",
        str:     "string",
        bool:   "boolean",
        sym:  "symbol",
        obj:  "object",
    };
    const typesForRegex = /\b(?:int|str|bool|double|big|obj)\b/g;

    const types = input.match(/\b(?<=(?:type|interface|class)\s{1,99})\w+(?=\s{1,99}[={])/g)?.join('|')?.insertAt(0,'|') || '';
    const addLet = RegExp(`(?<!(?:const|public|private|protected|readonly|\\(|,)\\s{0,99})(?:int|str|bool|double|big|obj|Array<.*>|Collection<.*>|Date${types}|\\w+\\[])(\\w*?\\[])?\\s+?\\w+\\s*[=;]`,'g');
    const regex = RegExp(`\\b(int|str|bool|double|big|obj|Array<.*>|Collection<.*>|Date${types}|\\w+\\[])(\\w*?\\[])?\\s+(\\w+\\??)`,'g');

    let tokens = input.replace(addLet, 'let $&');
    tokens = tokens.replace(regex,`$3: $1$2`).replace(regex,`$3: $1$2`).replace(typesForRegex, matched => typeOf[matched]);

    return tokens;
}

String.prototype.insertAt = function(index,str){
    return this.slice(0,index) + str + this.slice(index)
}
