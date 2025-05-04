import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts', // Arquivo de entrada
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs', // CommonJS para Node.js
      sourcemap: true,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm', // ES Modules para browsers modernos
      sourcemap: true,
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd', // Universal Module Definition
      name: 'MyLibrary', // Nome global para uso em browsers
      sourcemap: true,
      globals: {
        crypto: 'crypto', // Define o nome global para o módulo 'crypto'
      },
    },
  ],
  external: ['crypto'], 
  plugins: [
    resolve(), // Resolve módulos do Node.js
    commonjs({
      ignoreTryCatch: false, // Suprime warnings de dependências circulares
    }), // Converte CommonJS para ES Modules
    typescript(), // Suporte a TypeScript
    terser(), // Minificação para produção
  ],
  onwarn(warning, warn) {
    // Suprime warnings de dependências circulares específicas
    if (warning.code === 'CIRCULAR_DEPENDENCY' && /semver/.test(warning.message)) {
      return;
    }
    warn(warning); // Exibe outros warnings normalmente
  },
};