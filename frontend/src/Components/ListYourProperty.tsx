import {  Verified } from "lucide-react"
import Button from "./Button"


const ListYourProperty = () => {
  return (
    <div className="flex justify-between font-lato items-center  flex-col gap-7 p-5">
        <h1 className="gradient-text text-2xl font-lato font-bold text-center">List Your Property</h1>
        <div className="flex text-lg justify-between items-center  w-full">
            <div className=" flex flex-col gap-3 items-center justify-center w-full">
                <div className="flex gap-1">
                    <Verified className="text-green-500"/>
                    <p>Certified Company</p>
                </div>
                <div className="flex gap-1">
                    <Verified className="text-green-500"/>
                    <p>Certified Company</p>
                </div>
                <div className="flex gap-1">
                    <Verified className="text-green-500"/>
                    <p>Certified Company</p>
                </div>
                <div className="flex gap-1">
                    <Verified className="text-green-500"/>
                    <p>Certified Company</p>
                </div>

            </div>
            <div className="w-full h-52 hidden md:block">
                <img src='agree.png' alt = "" className="h-full w-full object-cover"/>

            </div>
            <div className=" flex w-full flex-col items-center justify-center gap-3 ">
            <div className="flex gap-1">
                    <Verified className="text-green-500"/>
                    <p>Certified Company</p>
                </div>
                <div className="flex gap-1">
                    <Verified className="text-green-500"/>
                    <p>Certified Company</p>
                </div>
                <div className="flex gap-1">
                    <Verified className="text-green-500"/>
                    <p>Certified Company</p>
                </div>
                <div className="flex gap-1">
                    <Verified className="text-green-500"/>
                    <p>Certified Company</p>
                </div>

            </div>

        </div>
        <Button><p className="font-lato">Join Us</p></Button>
      
    </div>
  )
}

export default ListYourProperty
