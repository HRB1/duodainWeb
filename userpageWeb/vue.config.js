module.exports={
    configureWebpack:{
        devServer:{
            port:8081,
            proxy:{
               "/api":{
                   target:"http://127.0.0.1:7002",
                   pathRewrite: {
                    '^/api': ''
                  }
               } 
            }
        }
    },
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({//这里是配置项，详见官方文档
                        rootValue : 16, // 换算的基数
                        selectorBlackList  : ['weui','mu'], // 忽略转换正则匹配项
                        propList   : ['*'],
                    }),
                ]
            }
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
          item
            .use('sass-resources-loader')
            .loader('sass-resources-loader')
            .options({
              resources: ['./src/static/styles/_mixin.scss', './src/static/styles/zero.scss']
            })
            .end()
        })
      }
}