import React from 'react';

export const ArticleFilterSelect = ({handleArticleViewModeChange,handleArticleSortChange})=>{
    console.log("Things,",handleArticleViewModeChange);
    const test = ()=>{console.log("TEST!")};
    return (
    <section className="controls">
        <select onChange={handleArticleViewModeChange} className="form-control filter-select">
            <option value="ALL">
                All Articles
            </option>
            <option value="PICS">
                Only Articles With Pictures
            </option>
        </select>
        <select onChange={handleArticleSortChange} className="form-control filter-select">
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
)};