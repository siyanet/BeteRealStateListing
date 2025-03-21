import Button from "./Button"


const ListYourProperty = () => {
  return (
    <div className="flex justify-between items-center flex-col">
        <h1 className="gradient-text font-lato font-bold">List Your Property</h1>
        <div className="flex justify-between items-center">
            <div className=" flex flex-col items-center justify-center">
                <p>Certified company</p>
                <p>Certified company</p>
                <p>Certified company</p>
                <p>Certified company</p>

            </div>
            <div>
                <img src='image.png' alt = ""/>

            </div>
            <div className=" flex flex-col items-center justify-center">
                <p>Certified company</p>
                <p>Certified company</p>
                <p>Certified company</p>
                <p>Certified company</p>

            </div>

        </div>
        <Button>Join Us</Button>
      
    </div>
  )
}

export default ListYourProperty
