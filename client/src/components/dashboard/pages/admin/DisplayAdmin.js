import React, {Fragment} from 'react';
import {useParams} from "react-router";


const DisplayAdmin = ()=>{
    let { pages } = useParams();
    return(
        <div>

            <h1>{pages}</h1>
            <p>{`url: ${JSON.stringify(pages, 4)}`}</p>
        </div>
    )
}
export default DisplayAdmin;