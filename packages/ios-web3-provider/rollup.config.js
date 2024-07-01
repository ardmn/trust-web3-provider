import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { name, dependencies } from './package.json';

const input = './index.ts';
const plugins = [
  nodeResolve({ preferBuiltins: false, browser: true }),
  commonjs(),
  esbuild({
    minify: true,
    tsconfig: './tsconfig.json',
    loaders: {
      '.json': 'json',
    },
  }),
];

function createConfig(
  packageName,
  packageDependencies,
  umd = {},
  cjs = {},
  es = {},
) {
  return [
    {
      input,
      plugins,
      output: {
        file: './swift/trust-min.js',
        format: 'umd',
        exports: 'named',
        name: packageName,
        sourcemap: true,
        ...umd,
      },
    },
  ];
}

export default createConfig(name, Object.keys(dependencies));
