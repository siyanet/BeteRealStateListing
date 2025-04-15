import Button from "./Button"


const ListYourProperty = () => {
  return (
    <div className="flex justify-between items-center m-5 flex-col">
        <h1 className="gradient-text font-lato font-bold">List Your Property</h1>
        <div className="flex justify-between items-center">
            <div className=" flex flex-col gap-3 items-center justify-center">
                <p>Certified company</p>
                <p>Certified company</p>
                <p>Certified company</p>
                <p>Certified company</p>

            </div>
            <div>
                <img src='agree.png' alt = ""/>

            </div>
            <div className=" flex flex-col items-center justify-center gap-3 ">
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
