import fetch from 'isomorphic-fetch';
import React from 'react';
import reactDOM from 'react-dom'

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
            <p>
                <code>
                {JSON.stringify(data,null,2)}
                </code>
            </p>
        </div>,
        document.getElementById('AppContainer')
    );
});

