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

console.log("Render app");

const render = state=>{
    const handleArticleViewModeChange = e=>{
        state = {...state,articleViewMode:e.target.value};
        render(state);
    };

    const handleArticleSortChange = e=>{
        state = {...state,articleSort:e.target.value};
        render(state);
    };
    reactDOM.render(
        <Main
            {...state}
            handleArticleSortChange={handleArticleSortChange}
            handleArticleViewModeChange={handleArticleViewModeChange}
        />
        , document.getElementById('AppContainer')
    );
}

