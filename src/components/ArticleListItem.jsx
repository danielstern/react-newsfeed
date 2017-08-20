import React from 'react';
import { urlContainsImage } from '../filters'

const truncate = string=>`${string.slice(0,140)}${string.length > 280 ? '...' : ''}`;

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