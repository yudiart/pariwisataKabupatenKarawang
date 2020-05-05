import React from 'react';
import { useRouteMatch } from "react-router-dom";

const ChartVilla =()=>{
    let slug = useRouteMatch("/dashboard/:slug");

    return (
        <div>
            {slug}
        </div>
    )
}

export default ChartVilla