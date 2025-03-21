

const Footer = () => {
  return (
    <div>
      <div className="bg-amber-400">
      <div className="flex justify-between items-center w-full h-full">
        <div>
          <i className="fas fa-facebook"/>
          <i className="fas fa-instagram"/>
          <i className="fas fa-linkedin"/>
          <i className="fas fa-twitter"/>

        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="">About Us</h1>
          <p className="text-center">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat 
          </p>

        </div>
        <div>
          <p><i className="fas fa-phone"/>251043989437</p>
          <p><i className="fas fa-envelope"/>Bete@gmail.com</p>
          <p><i className="fas fa-map-marker"/>AddisAbaba,Megengna 22</p>

        </div>
      
    </div>

    <div className="flex w-full h-full justify-between items-center">
        <h1>BETE</h1>
        <div className="flex justify-between items-center gap-4">
<p>Home</p>
<p>Property</p>
<p>Contact Us</p>
<p>About Us</p>
        </div>

    </div>
      </div>
         
   
    <div className="bg-white flex justify-center items-center">
        <p>@CopyRight All Rights Reserved</p>

    </div>

    </div>
   
  )
}

export default Footer
