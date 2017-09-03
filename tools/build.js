'use strict';

const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript');
const pkg = require('../package.json');

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

// Compile source code into a distributable format with Babel
['es', 'cjs', 'umd'].forEach((format) => {
    promise = promise.then(() => rollup.rollup({
        entry: 'src/index.ts',
        external: Object.keys(pkg.dependencies),
        plugins: [ babel({
            exclude: 'node_modules/**'
        })],
    }).then(bundle => bundle.write({
        dest: `dist/${format === 'cjs' ? 'xway' : `xway.${format}`}.js`,
        format,
        sourceMap: true,
        moduleName: format === 'umd' ? pkg.name : undefined,
    })));
});

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
    delete pkg.private;
    delete pkg.devDependencies;
    delete pkg.scripts;
    delete pkg.babel;
    fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
    fs.writeFileSync('dist/LICENSE.txt', fs.readFileSync('LICENSE.txt', 'utf-8'), 'utf-8');
});

promise.catch(err => console.error(err.stack));