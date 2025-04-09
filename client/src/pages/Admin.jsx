import { useEffect, useState } from "react"
import axios from "axios";

export default function Admin(){
    const [feedbacks, setFeedbacks] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [showFeedbacks , setShowFeedbacks] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    
    useEffect(()=>{
        const password = prompt("Enter admin password:");
        if(password === "admin123"){
            setIsAuthorized(true);
        }else{
            alert("Unauthorized");
            window.location.href = "/";
        }
    } , []);

    useEffect(()=>{
        if(showFeedbacks && feedbacks.length === 0){
            try {
                setIsLoading(true);
                axios.get("/.netlify/functions/getFeedbacks").then((res)=>{
                    setFeedbacks(res.data.feedbacks);
                })
            } catch (error) {
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        }
        
    } , [showFeedbacks]);
    const handleOnclick = ()=>{
        setShowFeedbacks((prev)=>!prev)
    }
    
    if(!isAuthorized){
        return null;
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
            <button className="btn btn-primary" 
            onClick={handleOnclick}>{showFeedbacks ? "Hide Feedbacks" : "View Submitted Feedbacks"}</button>
            <div className="flex flex-wrap gap-4 p-2 justify-center">
                {
                    isLoading ? "Loading...." :
                    showFeedbacks && feedbacks && feedbacks.length > 0 ? feedbacks.map((feedback)=>(
                        <div className="card bg-base-100 w-96 shadow-md" key={feedback.id}>
                            <div className="card-body">
                                <h2 className="card-title">{feedback.name}</h2>
                                <h2 className="card-title">{feedback.email}</h2>
                                <p>{feedback.message}</p>
                                <div className="card-actions justify-end">
                                <button className="btn btn-primary">{new Date(feedback.created_at).toLocaleString()}</button>
                                </div>
                            </div>
                        </div>
                    )) : (<p>there are no feedbacks!</p>)
                }
            </div>
        </div>
    )
}