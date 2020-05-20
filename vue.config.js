module.exports = {
    productionSourceMap: false, //不生成map文件
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: config => {
        config.externals = {
            //video.js 作为外部资源引入
            'video.js': 'videojs'
        };
    }
};
