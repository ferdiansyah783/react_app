const regex = {
    isRequired: {
        pattern: 'required',
        error: 'field required'
    },
    isEmail: {
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        error: 'field must be a email'
    },
    isAlpha: {
        pattern: /^[_A-z]*((-|\s)*[_A-z])*$/,
        error: 'field only alphabet'
    },
    minChar: {
        pattern: /^.{3,}/,
        error: 'field min 3 character'
    }
};

function rulesReader(value, rules) {

    var _errorText = "";

    for (var x = 0; x < rules.length; x++) {
        if (rules[x] === 'isRequired' && !value) {

            _errorText = regex[rules[x]]['error'];
            break
        }

        if (rules[x] !== 'isRequired') {
            const _test = regex[rules[x]]['pattern'].test(value);

            _errorText = !_test ? regex[rules[x]]['error'] : "";

            if (!_test) break;

        }

    }

    return _errorText
}

export const validate = (value, rules) => {

    const _key = Object.keys(value);

    const _error = {};

    for (var i = 0; i < _key.length; i++) {

        if (!!rules[_key[i]]) {

            const testRule = rulesReader(value[_key[i]], rules[_key[i]]);

            if (!!testRule) {
                _error[_key[i]] = testRule
                break;
            }

        }

    }

    return _error;

};