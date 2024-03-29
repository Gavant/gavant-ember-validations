'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const packageJson = require('./package');
module.exports = function (defaults) {
    let app = new EmberApp(defaults, {
        autoImport: {
            watchDependencies: Object.keys(packageJson.dependencies)
        },
        sassOptions: {
            includePaths: ['../node_modules/@gavant/ember-validations/dist/styles']
        }
    });

    const { Webpack } = require('@embroider/webpack');
    return require('@embroider/compat').compatBuild(app, Webpack);
};
