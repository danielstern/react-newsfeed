import request from 'request-promise';
request.get(`https://www.reddit.com/r/DotA2.json`)
.then(response=>{
    let { data } = JSON.parse(response);
    data.children = data.children.map(({data})=>{
        return {
            // ...data,
            title:data.title,
            url:data.url,
            score:data.score,
            selftext:data.selftext
        }
    });
    console.log(JSON.stringify(data,null,2));
});
