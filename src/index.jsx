import fetch from 'isomorphic-fetch';
import React from 'react';
import reactDOM from 'react-dom'
import { urlContainsImage } from './filters'
import { ArticleListItem } from './components'

fetch(`api?real=true`)
.then(r=>r.json())
.then(data=>{
    console.log("Got data...",data);
    let state = {
        data:data.children.map(c=>c.data),
        articlesPerPage:10,
        articleViewMode:`ALL`,
        articleSort:`LATEST`
    };

    render(state);
});

// const urlContainsImage = url => url && /png|jpg|imgur/.test(url);

const render = state=>{
    const handleArticleViewModeChange = e=>{
        state = {...state,articleViewMode:e.target.value};
        console.log(state);
        render(state);
    };

    const handleArticleSortChange = e=>{
        state = {...state,articleSort:e.target.value};
        render(state);
    };

    const articlePictureFilter = article=>state.articleViewMode === "PICS" ? urlContainsImage(article.url) : true
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
                <select onChange={handleArticleSortChange} className="form-control">
                    <option value="LATEST">
                        Sort By Latest
                    </option>
                    <option value="SCORE">
                        Sort By Score
                    </option>
                    <option value="COMMENTS">
                        Sort by Number of Comments
                    </option>
                </select>
            </section>

            <div>
                {state.data
                    .sort((a,b)=>{
                        switch (state.articleSort) {
                            case `LATEST`:
                                return b.created - a.created;
                            case `SCORE`:
                                return b.score - a.score;
                            case `COMMENTS`:
                                return b.num_comments - a.num_comments;
                        }
                    })
                    .filter(articlePictureFilter)
                    .map(article=>< ArticleListItem {...article} key={article.id}/>)}
            </div>
        </div>,
        document.getElementById('AppContainer')
    );
}

