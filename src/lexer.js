export const lexer = function (input) {

    let isOperator = function (c) {
            return /[+\-*\/\^%=(),]/.test(c);
        },
        isDigit = function (c) {
            return /[0-9]/.test(c);
        },
        isWhiteSpace = function (c) {
            return /\s/.test(c) && !(/\n/.test(c));
        },
        isIdentifier = function (c) {
            return typeof c === "string" && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c);
        },
        isType = function (t) {
            return t === 'int' || t === 'string' || t === 'double' || t === 'bool' || t === 'obj';
        },
        isEndOfLine = function (c) {
            return c === ';' || /\n/.test(c);
        }

    let tokens = [], c, i = 0, tokenType;
    let advance = function () {
        return c = input[++i];
    };
    let addToken = function (type, value) {
        tokens.push({
            type: type,
            value: value
        });
    };
    while (i < input.length) {
        c = input[i];
        if (isWhiteSpace(c)) {
            advance();
        } else if (isOperator(c)) {
            addToken('operator', c);
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

        } else if (isIdentifier(c)) {
            let idn = c;
            while (isIdentifier(advance())) idn += c;

            tokenType = isType(idn) ? "type" : "identifier";
            if (!isType(idn)) {
                addToken(tokenType, idn);
            }

            isEndOfLine(c) ? addToken('EndOfLine') : '\n';

        } else throw "Unrecognized token.";
    }


    const concatTokens = function (tokens) {
        return tokens.map(v => {
            return v.value;
        }).join(' ');
    }

    return concatTokens(tokens);
}