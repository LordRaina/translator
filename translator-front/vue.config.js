module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.module
      .rule('csv')
      .test(/\.csv$/)
      .use('csv-loader')
        .loader('csv-loader')
        .options({skipEmptyLines: true})
        .end()
  }
}
