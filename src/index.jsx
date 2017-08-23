import fetch from 'isomorphic-fetch';
import React from 'react';
import reactDOM from 'react-dom'
import { Main } from './components';


fetch(`api?real=true`)
.then(r=>r.json())
.then(data=>{
    console.log("Got data...",data);
    let state = {
        data:data.children.map(c=>c.data),
        articleViewMode:`ALL`,
        articleSort:`LATEST`
    };

    render(state);
});

const handleArticleViewModeChange = state => e=>{
    state = {...state,articleViewMode:e.target.value};
    console.log(state);
    render(state);
};

const handleArticleSortChange = state => e=>{
    state = {...state,articleSort:e.target.value};
    render(state);
};

const render = state=>{
    reactDOM.render(
        <Main
            {...state}
            handleArticleSortChange={handleArticleSortChange}
            handleArticleViewModeChange={handleArticleViewModeChange}
        />
        , document.getElementById('AppContainer')
    );
}

