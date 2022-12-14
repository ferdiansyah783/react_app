const regex = {
    isEmail: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    isAlpha: /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/,
};

export const validate = (value) => {

    const _key = Object.keys(value);

    const _error = {};

    for (var i = 0; i < _key.length; i++) {

        // Validasi pertama kalau data kosong

        if (!value[_key[i]]) {
            _error[_key[i]] = 'field required';
            break;
        }

        // validasi sesui pattern

        // name

        if (_key[i] === 'name' && !regex.isAlpha.test(value.name)) {
            _error[_key[i]] = 'field only alphabet';
            break;
        }

        // username

        if (_key[i] === 'username' && !regex.isAlpha.test(value.username)) {
            _error[_key[i]] = 'field only alphabet';
            break;
        }

        // email

        if (_key[i] === 'email' && !regex.isEmail.test(value.email)) {
            _error[_key[i]] = 'field must be a email';
            break;
        }

    }

    return _error;

};