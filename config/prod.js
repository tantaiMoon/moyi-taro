module.exports = {
  env: {
    NODE_ENV: '"production"',
    API_URL: '"https://free-api.heweather.net/s6/"',
    BASE_URL: '"https://api.moyi0.com/applits/"',
    MAP_URL: '"https://restapi.amap.com/"',
    MAP_KEY: '"5413ccd14ca6b68852c367cf4d30c847"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
