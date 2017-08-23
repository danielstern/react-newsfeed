import http from 'http';
import request from 'request-promise';
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

app.get('/api',(req,res)=>{
    const { real } = req.query;
    if ( real ) {
        request.get(`https://www.reddit.com/r/Dota2.json`)
            .then(response=> {
                let {data} = JSON.parse(response);
                res.json(data);
            })
    } else {
        let { data } = require('./news');
        res.json(data);
    }
});

const server = http.createServer(app);
app.use(express.static('public'));
app.use(express.static('public/css'));
const port = process.env.PORT || 8080;
server.listen(port,()=>{
    console.info(`Application is listening on port ${port}.`);
});