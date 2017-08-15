import http from 'http';
import express from 'express';
import webpack from 'webpack';
import webpackConfig from './../webpack.config'
import webpackDevMiddleware from 'webpack-dev-middleware';
const compiler = webpack(webpackConfig);
import webpackHotMiddleware from "webpack-hot-middleware";

let app = express();
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    inline:true
}));
app.use(webpackHotMiddleware(compiler, {
    'log': false,
    'path': '/__webpack_hmr',
    'heartbeat': 10 * 1000
}));

const server = http.createServer(app);
app.use(express.static('public'));
app.use(express.static('public/css'));
const port = process.env.PORT || 8080;
server.listen(port,()=>{
    console.info(`Applicatino is listening on port ${port}.`);
});