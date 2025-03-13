import Header from "../Components/Header"
import PopularListing from "../Components/PopularListing"
import UpperHeader from "../Components/UpperHeader"


const LandingPage = () => {
  return (
    <div className="w-full h-full bg-white">
        <UpperHeader/>
        <Header/>
        <PopularListing/>
        
      
    </div>
  )
}

export default LandingPage
