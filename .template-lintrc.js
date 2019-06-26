'use strict';

module.exports = {
    extends: 'recommended',
    rules: {
        'self-closing-void-elements': false,
        'block-indentation': 4,
        'attribute-indentation': {
            indentation: 4,
            'open-invocation-max-len': 120
        }
    }
};
