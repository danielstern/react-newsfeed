import React from 'react';
import { urlContainsImage, truncate } from '../filters'

export const ArticleListItem = ({url,selftext,title,score,num_comments,permalink})=>(
    <div className="article-list-item">
        <h3>
            <a href={`http://reddit.com/${permalink}`} target="_blank">
                {title}
            </a>
        </h3>
        <p>
            {truncate(selftext)}
        </p>
        {urlContainsImage(url) ? <a href={url} target="_blank"><img src={url}/></a> : null}
        <section>
            Comments: {num_comments}
        </section>
        <section>
            Score: {score}
        </section>
    </div>
);