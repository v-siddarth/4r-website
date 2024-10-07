/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from './components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedWaste from './components/MostSearchedWaste'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'

function Home() {
  return (
    <div>
        {/* Header  */}
        <Header/>
        {/* Hero  */}
        <Hero/>
        {/* Category  */}
        <Category/>
        {/* Most Searched Car  */}
        <MostSearchedWaste/>
        {/* InfoSection  */}
        <InfoSection/>
        {/* Footer  */}
        <Footer/>

    </div>
  )
}

export default Home