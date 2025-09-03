// import { FacebookIcon, InstagramIcon, LinkedinIcon, MapPin, Phone, TwitterIcon } from "lucide-react"
// import NavBar from "../Components/Naviagtion"
// import { Input } from "../Components/FormComponents"
// import Button from "../Components/Button"
// import MiddelSection from "../Components/MiddelSection"
// import Footer from "../Components/Footer"


// const ContactUsPage = () => {
//   return (
//     <div>
//         <NavBar/>
//         <div className="px-2 flex font-bold font-lato flex-col gap-3 pt-20">
//             <h1 className="text-center gradient-text ">Contact Us</h1>
//             <div className="flex">
//                 <div className="flex justify-between">
//                     <div className="flex">
//                         <Phone/>
//                         <p>251931243454</p>
//                     </div>


//                     <div className="flex">
//                         <p>Bete@example.com</p>
//                     </div>
                    
//                     <div className="flex">
//                         <MapPin/>
//                         <p>Addis Ababa, Piassa</p>
//                     </div>


//                 </div>
//                 <FacebookIcon/>
//                 <InstagramIcon/>
//                 <LinkedinIcon/>
//                 <TwitterIcon/>



//             </div>

//             <div>

//             {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3854478007206!2d38.743428!3d9.028558499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8533d9f1d81f%3A0x3f5a4f7f78b6c8a6!2zVGVrZWxlaGF5bWFub3QgU3F1YXJlIHwgTWVya2F0byB8IOGJsOGKreGIiOGIg-GLreGIm-GKluGJtSDhiqDhi7DhiaPhiaPhi60gfCDhiJjhiK3hiqvhibY!5e0!3m2!1sam!2set!4v1745531486214!5m2!1sam!2set" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}


//             </div>


//             <div className="bg-gradient-to-r bg-amber-500 bg-amber-800">

//                 <div className="flex">
//                     <div className="flex flex-col">
//                         <Input 
//                         placeholder="Email"
//                         />
//                         <Input
//                         placeholder = "Name"
//                         />

//                     </div>
//                     <Input 
//                     placeholder="Message"/>

//                 </div>
//                 <Button>Send</Button>
//             </div>

//         </div>

//         <MiddelSection/>
//         <Footer/>
      
//     </div>
//   )
// }

// export default ContactUsPage




import React, { useState } from "react";
import NavBar from "../Components/Naviagtion";
import { FacebookIcon, InstagramIcon, LinkedinIcon, MapPin, Phone, TwitterIcon } from "lucide-react";
import MiddelSection from "../Components/MiddelSection";
import Footer from "../Components/Footer";

const ContactWithMap: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailToSendTo = "example@example.com"; // Replace with your specific recipient email
    const mailtoLink = `mailto:${emailToSendTo}?subject=Message from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  return (

    <div className="w-full">
        <NavBar/>
        <div className="px-2 pt-20 py-2">
            <h1 className="text-center text-amber-500 text-2xl  font-bold">Contact Us</h1>

            <div className="flex  py-6 justify-between">
                <div className="flex gap-3">
                <div className="flex">
                    <Phone/>
                    <p>25134323245</p>
                    
                </div>


                <div className="flex">
                    <p>Bete@example.com</p>

                </div>


                <div className="flex">
                    <MapPin/>
                    <p>Addis Ababa, Piassa</p>
                </div>

                </div>
                <div className=" flex gap-4">
                    <FacebookIcon/>
                    <InstagramIcon/>
                    <LinkedinIcon/>
                    <TwitterIcon/>
                </div>
                
              

            </div>



                 {/* Google Map */}
      <div className="w-full h-[400px] md:h-[500px]  rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          title="Our Location"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3854478007206!2d38.743428!3d9.028558499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8533d9f1d81f%3A0x3f5a4f7f78b6c8a6!2zVGVrZWxlaGF5bWFub3QgU3F1YXJlIHwgTWVya2F0byB8IOGJsOGKreGIiOGIg-GLreGIm-GKluGJtSDhiqDhi7DhiaPhiaPhi60gfCDhiJjhiK3hiqvhibY!5e0!3m2!1sam!2set!4v1745531486214!5m2!1sam!2set`}
        ></iframe>
      </div>


        <div className="w-full  flex justify-center items-center   py-4 gap-6">
      {/* Contact Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl text-center font-bold text-amber-500 mb-4">Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <div className="flex justify-center items-center">
             <button
            type="submit"
            className="bg-amber-500 text-white px-4 py-2 rounded  hover:bg-amber-600 transition"
          >
            Send Message
          </button>
          </div>
         
        </form>
      </div>

 
    </div>





        </div>

        <MiddelSection/>
        <Footer/>


    </div>
   
  );
};

export default ContactWithMap;
