import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";


const AuthSyncPage = () => {

    const navigate = useNavigate();
    const {isSignedIn , isLoaded , userId} = useAuth();

    useEffect(() => {
        if(!isLoaded) return;

        if(!isSignedIn){
            if(localStorage.getItem("clerkUserId")){
                localStorage.removeItem("clerkUserId");
            }

            navigate("/");
            return;
        }

        if(isSignedIn){
            localStorage.setItem("clerkUserId" , userId);
            navigate("/app/today");
        }

    } , [isSignedIn , isLoaded , userId , navigate]);

  return (
    <>
    </>
  )
}

export default AuthSyncPage
