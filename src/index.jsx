import fetch from 'isomorphic-fetch';
import React from 'react';
import reactDOM from 'react-dom'


let truncate = string=>`${string.slice(0,140)}${string.length > 140 ? '...' : ''}`;
let ArticleListItem = ({url,selftext,title,score,num_comments})=>(
    <div className="article-list-item">
        <h3>
            <a href={url} target="blank">
                {title}
            </a>
        </h3>
        <p>
            {truncate(selftext)}
        </p>
        {url ? <img src={url}/> : null}
        <div>
            Comments: {num_comments}
        </div>
    </div>
)
fetch(`api?real=true`)
.then(r=>r.json())
.then(data=>{
    console.log("Got data...",data);
    let state = {
        data:data.children.map(c=>c.data),
        articlesPerPage:10,
        articleViewMode:`ALL`
    };

    render(state);
});

const render = state=>{
    const handleArticleViewModeChange = e=>{
        state = {...state,articleViewMode:e.target.value};
        console.log(state);
        render(state);
    };
    const articlePictureFilter = article=>state.articleViewMode === "PICS" ? article.url && /png|jpg|imgur/.test(article.url) : true
    reactDOM.render(
        <div>
            <h2>
                News Feed Devourer
            </h2>
            <h3>
                Does your thinking for you
            </h3>
            <section className="controls">
                <select onChange={handleArticleViewModeChange} className="form-control">
                    <option value="ALL">
                        All Articles
                    </option>
                    <option value="PICS">
                        Only Articles With Pictures
                    </option>
                </select>
                <select onChange={handleArticleViewModeChange} className="form-control">
                    <option value="LATEST">
                        Sort By Latest
                    </option>
                    <option value="SCORE">
                        Sort By Score
                    </option>
                    <option value="">
                        Sort by Number of Comments
                    </option>
                </select>
            </section>

            <div>
                {state.data
                    .filter(articlePictureFilter)
                    .map(article=>< ArticleListItem {...article} key={article.id}/>)}
            </div>
        </div>,
        document.getElementById('AppContainer')
    );
}

