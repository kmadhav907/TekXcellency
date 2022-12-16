import React from 'react'
import { About } from '../../components/about';
import { Awards } from '../../components/awards';
import { Contact } from '../../components/contact';
import { Footer } from '../../components/footer';
import { Front } from '../../components/front';
import {Header} from '../../components/header';
import { Importance } from '../../components/importance';
import Navbar from '../../components/navbar';


class HomePage extends React.Component<{}, {}>{
    render(): React.ReactNode {
        return (
        <>
        {/* <Navbar/> */}
        <Header />
        <Front />
        <Awards />
        <About />
        <Importance />
        <Contact />
        <Footer />

        </>)

    }
}
export default HomePage;