import React from 'react';
import LoggedHero from '../Logged/Hero/LoggedHero';
import NotLoggedHero from '../Logged/Hero/NotLoggedHero';

const Hero = (props) => {
    const {logged} = props;
    
    return (
        <div>
            {logged ? <LoggedHero {...props}/>:<NotLoggedHero/>}
        </div>
    )
}

export default Hero