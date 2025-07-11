import Head from "@/components/Head";
import { SignIn } from "@clerk/clerk-react";


const LoginPage = () => {
    return (
   <>
        <Head title="Log In to TaskJoy - Manage Your To-Do Lists and Projects"/>

        <section>
          <div className="container flex justify-center">
            <SignIn signUpUrl="/register"/>
          </div>
        </section>
   
   </>
  )
}

export default LoginPage
