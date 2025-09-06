
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import Button from "../Components/Button";
import { FileInput, Input } from "../Components/FormComponents";
import axiosInstance from "../Components/axiosInstance";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { fetchUser } from "../Redux/authUser";
type AuthProp = {
  isOwner?:boolean;
}
interface FormData {
    fname: string;
    lname: string;
    semail:string;
    spassword: string;
    lemail:string;
    lpassword: string;
    business_license: File |null;
    phone: string;
    business_name: string;
    opassword:string;
    oemail: string;
}
interface FormErrors {
    fname: string;
    lname: string;
    semail:string;
    spassword: string;
    lemail:string;
    lpassword: string;
    business_license: File |null;
    phone: string;
    business_name: string;
    opassword:string;
    oemail: string;
}
const SignUpPage:React.FC<AuthProp> = ({isOwner=false}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isLogin, setIsLogin] = useState(true);
  const [formData,setFormData] = useState<FormData>({
    fname: '',
    lname: '',
    spassword: '',
    semail: '',
    lpassword: '',
    lemail: '',
    business_license: null,
    phone: '',
    business_name: '',
    opassword: '',
    oemail: '',

  });

  const [error,setErrors] = useState<Partial<FormErrors>>({
    fname: '',
    lname: '',
    spassword: '',
    semail: '',
    lpassword: '',
    lemail: '',
    opassword: '',
    oemail: '',
    business_license: null,
    phone: '',
    business_name: ''
    
  });

  const validateField = (name:keyof FormData, value: string): string =>{
    let error = "";
    if (name === "fname" && value.length < 3){
        error = "First Name Must be at least 3 characters long";

    }
    if(name ==='lname' && value.length < 3){
        error = "Last Name must be at least 3 characters long";
    }
    if(name === "lemail" || name==='semail'){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)){
         error = "Invalid email format.";}
    }
    if ((name ==="lpassword" || name ==='spassword' )&& value.length < 6){
        error = 'password must be at least 6 characters';

    }
    return error;

  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setFormData((prev) => ({...prev,[name]:value}));
    setErrors((prev) => ({...prev,[name]: validateField(name as keyof FormData,value)}));

  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      business_license: file, // ✅ Store only a single file, not an array
    }));
  };
  
  const handleOwnerRegisterSubmit = async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();

    const newErrors: Partial<FormErrors> = {
      fname: validateField('fname',formData.fname),
      lname: validateField('lname',formData.lname),
      oemail: validateField('oemail',formData.oemail),
      opassword: validateField('opassword',formData.opassword),
      business_name: validateField('business_name',formData.business_name),
      phone: validateField('phone',formData.phone),
    }
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) {
      alert('Please fix the errors before submitting');
      return;
    }
    try{
      const formatedData = new FormData();
      formatedData.append("contact_number", formData.phone);
      formatedData.append("business_name", formData.business_name);
      formatedData.append("user.email", formData.oemail);
      formatedData.append("user.password", formData.opassword);
      formatedData.append("user.first_name", formData.fname);
      formatedData.append("user.last_name", formData.lname);
      if (formData.business_license) {
        formatedData.append('business_license', formData.business_license);
    }
      console.log(formatedData);
      console.log(formatedData.get("user.email"));
      console.log(formatedData.get("business_license"));
      const resposne = await axiosInstance.post('register/owner/',formatedData,{
        headers: {
          "Content-Type": "multipart/form-data", // ✅ Important for file uploads
     } },);
      if (resposne.status == 201){
        toast.success("registred sucessfully");
      
        setIsLogin(true);

      }
      else{
        toast.error("something happend");
      }
    

  }
  catch(error){
    console.log(error);
    // console.error('Error submitting form:', error.response ? error.response.data : error.message);
    toast.error("error happend");
  }
}
  const handleSignUpSubmit = async(e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();

    // Validate form fields and collect errors
    const newErrors: Partial<FormErrors> = {
      fname: validateField('fname', formData.fname),
      lname: validateField('lname', formData.lname),
      semail: validateField('semail', formData.semail),
      spassword: validateField('spassword', formData.spassword),
    };
  
    setErrors(newErrors);
  
    // Check if any error exists in the form
    if (Object.values(newErrors).some((err) => err)) {
      toast.error('Please fix the errors before submitting');
      return;
    }
  
    try {
      // Send data to backend using Axios
      const formatedData = {
        email: formData.semail,
        password: formData.spassword,
        first_name: formData.fname,
        last_name: formData.lname
      }
  const response = await axiosInstance.post<{ message: string }>("register/user/", formatedData);
  
      // Handle the response
      console.log('Form submitted successfully:', response.data);
      toast.success('form submited sucessfully');
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      // Handle any errors
      // console.error('Error submitting form:', error.response ? error.response.data : error.message);
      toast.error("error happend");
    }
};

const handleLoginSubmit = async(e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();

    // Validate form fields and collect errors
    const newErrors: Partial<FormErrors> = {
      lemail: validateField('lemail', formData.lemail),
      lpassword: validateField('lpassword', formData.lpassword),
    };
  
    setErrors(newErrors);
  
    // Check if any error exists in the form
    if (Object.values(newErrors).some((err) => err)) {
      toast.error('Please fix the errors before submitting');
      return;
    }
  
    try {
      const formatedData = {
        email: formData.lemail,
        password: formData.lpassword
      }
      // Send data to backend using Axios
  const response = await axiosInstance.post<{ token: { access: string; refresh: string }, user: { role: string } }>("login/", formatedData);
     if(response.status == 200){
      console.log(response);
      localStorage.removeItem('bete_access_token');
      localStorage.removeItem('bete_refresh_token');

  localStorage.setItem("bete_access_token", response.data.token.access);
      localStorage.setItem('bete_refresh_token',response.data.token.refresh)
      dispatch(fetchUser());
      toast.success("login sucessfully");
      const role = response.data.user.role;
      
      setTimeout(() => {
        if (role === "Owner") {
          navigate("/owner-dashboard");
        } else if (role === "Customer") {
          navigate("/");
        }
        else if(role === "agent"){
          navigate("/chatlist")
        } 
        else {
          navigate("/user-dashboard");
        }
      }, 2000);


     }
      // Handle the response
      console.log('Form submitted successfully:', response.data);
     
    } catch (error) {
      console.log(error);
      // Handle any errors
      // console.error('Error submitting form:', error.response ? error.response.data : error.message);
      toast.error('login failed ')
    }
};
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* MAIN CONTAINER */}
      <div className="w-full h-full flex">

        {/* LEFT SECTION (Login & Signup Forms) */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-white">
          <motion.div
            className="w-full flex flex-col items-center"
            animate={{
              x: isLogin ? "0%" : "-100%", // Move Login Right
              opacity: isLogin ? 1 : 0, // Fade Out
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {/* LOGIN FORM */}
            <h1 className="text-2xl font-bold">Login</h1>
            <Input type="email" placeholder="Email" name="lemail" value = {formData.lemail} onChange={handleChange} required />
            {error && <p className="text-red-500">{error.lemail}</p>}
            <Input type="password" placeholder="Password" name="lpassword" value={formData.lpassword} onChange={handleChange} required />
            {error && <p className="text-red-500">{error.lpassword}</p>}
            <Button onClick={handleLoginSubmit}>Login</Button>
            <p className="font-bold font-lato hover:text-amber-300 hover:cursor-pointer" onClick={() => setIsLogin(false)}>Register</p>
          </motion.div>
          {!isOwner &&       <motion.div
            className="w-full flex flex-col items-center absolute"
            animate={{
              x: isLogin ? "100%" : "0%", // Move SignUp in from right
              opacity: isLogin ? 0 : 1, // Fade In
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {/* SIGNUP FORM */}
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                  <div className="flex flex-col justify-center items-center">
                  <Input type="text" placeholder="FirstName" value={formData.fname} onChange={handleChange} name='fname' required />
                  {error && <p className="text-red-500">{error.fname}</p>}

                  </div>



                  <div className="flex flex-col justify-center items-center">
                  <Input type='text' placeholder="LastName" value={formData.lname} onChange={handleChange} name="lname" required/>
                {error && <p className="text-red-500">{error.lname}</p>}


                  </div>
               
          
                


                  <div className="flex flex-col justify-center items-center">
                  <Input type="email" placeholder="Email" name="semail" value = {formData.semail} onChange={handleChange} required />
                  {error && <p className="text-red-500">{error.semail}</p>}

                  </div>
                  <div className="flex flex-col justify-center items-center">
                  <Input type="password" placeholder="Password" name="spassword" value={formData.spassword} onChange={handleChange} required />
                  {error && <p className="text-red-500">{error.spassword}</p>}

                  </div>
    
               

                </div>

            </div>
           
            <Button onClick={handleSignUpSubmit}>Register</Button>
            <p className="font-bold font-lato hover:cursor-pointer hover:text-amber-500 " onClick={() => setIsLogin(true)}>Login</p>
          </motion.div> }

     

{isOwner && <motion.div
            className="w-full flex flex-col items-center absolute"
            animate={{
              x: isLogin ? "100%" : "0%", // Move SignUp in from right
              opacity: isLogin ? 0 : 1, // Fade In
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {/* SIGNUP FORM */}
            <h1 className="text-2xl font-bold">Register</h1>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                  <div className="flex flex-col justify-center items-center">
                  <Input type="text" placeholder="FirstName" value={formData.fname} onChange={handleChange} name='fname' required />
                  {error && <p className="text-red-500">{error.fname}</p>}

                  </div>



                  <div className="flex flex-col justify-center items-center">
                  <Input type='text' placeholder="LastName" value={formData.lname} onChange={handleChange} name="lname" required/>
                {error && <p className="text-red-500">{error.lname}</p>}


                  </div>
               
          
                


                  <div className="flex flex-col justify-center items-center">
                  <Input type="email" placeholder="Email" name="oemail" value = {formData.oemail} onChange={handleChange} required />
                  {error && <p className="text-red-500">{error.semail}</p>}

                  </div>
                  <div className="flex flex-col justify-center items-center">
                  <Input type="password" placeholder="Password" name="opassword" value={formData.opassword} onChange={handleChange} required />
                  {error && <p className="text-red-500">{error.spassword}</p>}

                  </div>

                  
                  <div className="flex flex-col justify-center items-center">
                  <Input type="number" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
                  {error && <p className="text-red-500">{error.spassword}</p>}

                  </div>
                  <div className="flex flex-col justify-center items-center">
                  <Input type="text" placeholder="Your Business Name" name="business_name" value={formData.business_name} onChange={handleChange} required />
                  {error && <p className="text-red-500">{error.spassword}</p>}

                  </div>

                  
    
               

                </div>
                <div className="flex flex-col justify-center items-center">
                  <FileInput type="file" placeholder="Upload Your License" name="business_license" onChange={handleFileChange} required />
                  {error && <p className="text-red-500">{error.spassword}</p>}

                  </div>

            </div>
           
            <Button onClick={handleOwnerRegisterSubmit}>Register</Button>
            <p className="font-bold font-lato hover:cursor-pointer hover:text-amber-500 " onClick={() => setIsLogin(true)}>Login</p>
          </motion.div> }
          
        </div>

        {/* RIGHT SECTION (Welcome Texts) */}
        <div className="w-1/2 h-full bg-red-500 flex flex-col justify-center items-center text-white relative overflow-hidden">
          <motion.div
            className="absolute flex flex-col items-center w-full"
            animate={{
              x: isLogin ? "0%" : "100%", // Move Welcome Back Left
              opacity: isLogin ? 1 : 0, // Fade Out
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-center">We are happy to have you again!</p>
          </motion.div>

          <motion.div
            className="absolute flex flex-col items-center w-full"
            animate={{
              x: isLogin ? "-100%" : "0%", // Move Welcome in from Right
              opacity: isLogin ? 0 : 1, // Fade In
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-center">Join us and explore great experiences.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
