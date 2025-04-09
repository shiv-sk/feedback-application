import { useState } from "react";
import axios from "axios"; 

export default function Feedback(){
    const [feedbackData , setFeedbackData] = useState({
        name:"",
        email:"",
        message:""
    })
    const [isLoading , setIsLoading] = useState(false);
    const handleonChange = (e)=>{
        e.preventDefault();
        setFeedbackData({...feedbackData , [e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post("/.netlify/functions/feedback" , feedbackData);
            console.log(response);
            alert("Feedback is submitted successfully!");
        } catch (error) {
            console.log("error from handleSubmit! " , error)
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <div className="flex justify-center items-center min-h-screen py-5">
            <form className="flex flex-col gap-2 w-96 bg-base-200 p-10 rounded shadow-md" onSubmit={handleSubmit}>
            <h4 className="text-center font-semibold text-lg">Feedback Submission</h4>
            <label htmlFor="name" className="font-semibold">Name</label>
            <input type="text" id="name" placeholder="John Doe" name="name" value={feedbackData.name}
            onChange={handleonChange}
            className="input input-primary w-full"
            required />
            <label htmlFor="email" className="font-semibold">Email</label>
            <input type="email" id="email" placeholder="JohnDoe@email.com" name="email" value={feedbackData.email}
            onChange={handleonChange} 
            className="input input-primary w-full" 
            required/>
            <label htmlFor="feedback" className="font-semibold">Feedback</label>
            <textarea type="text" id="feedback" placeholder="Your Thoughts" name="message" value={feedbackData.feedback}
            className="textarea textarea-primary w-full"
            onChange={handleonChange}
            required></textarea>
            <button type="submit" className="btn btn-primary">{isLoading ? "Loading..." : "Submit"}</button>
            </form>
        </div>
    )
}