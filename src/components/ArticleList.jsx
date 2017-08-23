import React from 'react';
import { urlContainsImage } from '../filters'
import { ArticleListItem } from './ArticleListItem'

export const ArticleList = (state)=>(
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
            .filter(article=>state.articleViewMode === "PICS" ? urlContainsImage(article.url) : true)
            .map(article=>< ArticleListItem {...article} key={article.id}/>)}
    </div>
)