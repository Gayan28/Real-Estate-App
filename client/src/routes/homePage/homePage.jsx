import { useContext } from "react"
import SearchBar from "../../components/searchBar/SearchBar"
import "./homePage.scss"
import { AuthContext } from "../../context/AuthContext"

function HomePage(){

    const {currentUser} = useContext(AuthContext)

    console.log(currentUser)
    return(
        <div className="homePage">
            <div className="textContainer">
            <div className="wrapper">
            <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
            <p>Welcome to GKEstate, your premier destination for all things real estate. Whether you are buying, selling, 
            or renting, we are here to guide you through every step of your property journey.
            </p>
            <SearchBar />
            <div className="boxes">
                <div className="box">
                    <h1>16+</h1>
                    <h2>Years Of Experience</h2>
                </div>
                <div className="box">
                    <h1>200</h1>
                    <h2>Award Gained</h2>
                </div>
                <div className="box">
                    <h1>2000+</h1>
                    <h2>Property Ready</h2>
                </div>
            </div>
            </div>
            </div>
            <div className="imgContainer">
              <img src="/bg.png" alt="" />
            </div>
        </div>
    )
}

export default HomePage