import image from '@rollup/plugin-image'

export default {
  input: 'src/index.js',
  output: [
    {
      dir: 'cjs',
      format: 'cjs'
    },
    {
      dir: 'es',
      format: 'es'
    }
  ],
  external: ['react'],
  plugins: [image()]
}
