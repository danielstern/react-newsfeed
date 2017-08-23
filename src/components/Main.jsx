import React from 'react';
import { ArticleList, ArticleFilterSelect } from './'

export const Main = ({
    handleArticleSortChange,
    handleArticleViewModeChange,
    articleSort,
    data,
    articleViewMode
})=>(
    <div>
        <h2>
            News Feed
        </h2>
        <ArticleFilterSelect
            handleArticleSortChange={handleArticleSortChange}
            handleArticleViewModeChange={handleArticleViewModeChange}
        />
        <ArticleList
            articleSort={articleSort}
            data={data}
            articleViewMode={articleViewMode}
        />
    </div>
)

