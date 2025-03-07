import "./Home.scss";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import { useState } from 'react';

export default function Home() {
    const [ ellipsisCLick, setEllipsisClick ] = useState(false);
    
    const handleEllipsisClick = () => {
        setEllipsisClick(!ellipsisCLick);
    }

    return (
        <section>
            <Header handleEllipsisClick={handleEllipsisClick} ellipsisCLick={ellipsisCLick}/>
            <Hero ellipsisCLick={ellipsisCLick}/>
            
            <Footer />
        </section>
    )
}