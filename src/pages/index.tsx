import React from "react";
import Banner from "@/components/section/Banner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductionSection from "@/components/section/ProductSection";
import PlanSection from "@/components/section/PlanSection";
import LogoSlider from "@/components/LogoSlider";
import HowToUseSection from "@/components/section/HowToUseSection";

const Home: React.FC = () => {
    return (
        <>
            <Header/>
            <main className="flex-grow subpixel-antialiased mb-24 overflow-hidden">
                <Banner/>
                <LogoSlider/>
                <ProductionSection/>
                <HowToUseSection/>
                <PlanSection/>
            </main>
            <Footer/>
        </>
    );
};

export default Home;
