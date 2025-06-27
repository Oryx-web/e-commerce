import React, { useState, useEffect, useRef } from 'react';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Benefits from '../components/Benefits';
import Newsletter from '../components/Newsletter';
import Hero from '../components/Hero';

function Home() {
    return (
        <>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <Benefits />
            <Newsletter />
        </>
    );
}

export default Home;