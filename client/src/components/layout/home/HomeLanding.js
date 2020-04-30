import React from 'react';
import Container from "react-bootstrap/Container";
import HomeHeader from "./HomeHeader";
import HomeSearch from "./HomeSearch";


const HomeLanding = ()=>{
    return(
        <div>
            <section className="landing">
                <div className="dark-overlay ">
                    <HomeHeader/>
                    <Container>
                        <HomeSearch/>
                    </Container>
                </div>
            </section>
        </div>
    )
}
export default HomeLanding;