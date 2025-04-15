import AboutUs from "../Components/AboutUs"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import Info from "../Components/info"
import ListYourProperty from "../Components/ListYourProperty"
import PopularListing from "../Components/PopularListing"
import ReviewCardOnLandingPage from "../Components/ReviewCardOnLandingPage"
import UpperHeader from "../Components/UpperHeader"


const LandingPage = () => {
  return (
    <div className="w-full h-full bg-white">
      <div className="hidden md:block">  <UpperHeader/></div>
      
        <Header/>
        <PopularListing/>
        <AboutUs/>
        <Info/>
        <ListYourProperty/>
        <ReviewCardOnLandingPage/>
        <Footer/>
        
      
    </div>
  )
}

export default LandingPage
