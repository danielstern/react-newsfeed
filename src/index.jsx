import fetch from 'isomorphic-fetch';
import React from 'react';
import reactDOM from 'react-dom'


let truncate = string=>`${string.slice(0,140)}${string.length > 140 ? '...' : ''}`;
let ArticleListItem = ({url,selftext,title,score})=>(
    <div className="article-list-item">
        <h3>
            {title}
        </h3>
        <p>
            {truncate(selftext)}
        </p>
        {url ? <img src={url}/> : null}
    </div>
)
fetch(`api?real=true`)
.then(r=>r.json())
.then(data=>{
    console.log("Got data...",data);
    let state = {
        data:data.children.map(c=>c.data),
        articlesPerPage:10,
        showWithoutURL:true
    };
    console.log("State?",state);
    reactDOM.render(
        <div>
             <h2>
                 The App
             </h2>
            <div>
                {state.data.map(article=>< ArticleListItem {...article} key={article.id}/>)}
            </div>
        </div>,
        document.getElementById('AppContainer')
    );
});

