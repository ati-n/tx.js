    /**
     * Lexer function, splits the input into tokens
     * and modify the code for TypeScript
     * @param input
     * @returns concatenated tokens
     */
export const lexer = function (input) {
        let tokens = [], c, i = 0, last;

        const isOperator = function (c) {
                return /[+\-*\/%=<>,!?^]/.test(c);
            },
            isSomeBraces = function (c) {
                return /[\]\[(){}]/.test(c);
            },
            isDigit = function (c) {
                return /[0-9]/.test(c);
            },
            isWhiteSpace = function (c) {
                return /\s/.test(c) && !(/\n/.test(c));
            },
            isEndOfLine = function (c) {
                return /\n/.test(c) || /;/.test(c);
            },
            isIdentifier = function (c) {
                return typeof c === "string" && !isOperator(c) && !isDigit(c)
                    && !isWhiteSpace(c) && !isEndOfLine(c) && !isSomeBraces(c);
            },
            isType = function (t) {
                const typeOf = {
                    "int": true, "double": true, "string": true, "bool": true, "sym": true,
                    "obj": true, "def": true, "null": true, "unknown": true, "any": true,
                    "default": false,
                }
                return typeOf[t] || typeOf["default"];
            },
            isPreviousType = () => {
                return last?.type === "type";
            }

        const typify = function (type) {
            const typeOf = {
                "int":    ": number",
                "double": ": bigint",
                "string": ": string",
                "bool":   ": boolean",
                "sym":  "symbol",
                "obj":  ": object",
                "def":  ": function",
                "null": ": null",
                "unknown":  ": unknown",
                "any":  ": any",
            };
            /**
             * swap type to let if no const keyword
             */
            if (/*tokens[tokens.length-1]*/last?.value !== "const") {
                addToken("identifier", "let");
            }
            addToken("type", typeOf[type] || typeOf["any"]);
        }


        let advance = function () {
            return c = input[++i];
        };

        let addToken = function (type, value) {
            tokens.push({
                type: type,
                value: value
            });
        };

        /**
         * Reading starts here char by char
         */
        while (i < input.length) {
            c = input[i];
            last = tokens.length && last;
            //console.log(last);

            if (isWhiteSpace(c)) {
                advance();
            } else if (isOperator(c)) {
                if (isOperator(last.value)) {
                    let l = tokens.pop();
                    addToken('operator', l.value+c);
                } else {
                    addToken("operator", c);
                }
                advance();
            } else if (isSomeBraces(c)) {
                addToken("braces", c);
                advance();
            } else if (isDigit(c)) {
                let num = c;
                while (isDigit(advance())) num += c;
                if (c === ".") {
                    do num += c; while (isDigit(advance()));
                }
                num = parseFloat(num);
                if (!isFinite(num)) throw "Number is too large or too small for a 64-bit double.";
                addToken("number", num);

            } else if (isEndOfLine(c)) {
                addToken('EOL', '\n');
                advance();
            } else if (isIdentifier(c)) {
                let idn = c;
                while (isIdentifier(advance())) idn += c;
                if (!isType(idn)) {
                    isPreviousType() ? tokens.insert(tokens.length-1, {
                            type: "varname",
                            value: idn}) :
                        addToken("identifier", idn);
                } else {
                    typify(idn);
                }
            } else throw "Unrecognized token.";
        }


        const concatTokens = function (tokens) {
            return tokens.map(v => {
                return v.value;
            }).join(" ");
        }

        return concatTokens(tokens);
    }

    Array.prototype.insert = function ( index, item ) {
        this.splice( index, 0, item );
    };