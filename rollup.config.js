// Rollup plugins
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const plugins = [
	    resolve({
	      jsnext: true,
	      main: true,
	      browser: true,
	    }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        }),
	    commonjs(),
	    babel({
	      exclude: 'node_modules/**',
	    })
	];

const output = {
	file: 'dist/burrito-trello.js',
	format: 'iife',
	sourcemap: 'inline',
	name: 'BurritoTrello'
};

if(process.env.BUILD === "production") {
	plugins.push(uglify());
	output.sourcemap = false;
}

export default {
	input: 'index.js',
	output: output,
	plugins: plugins,
};
