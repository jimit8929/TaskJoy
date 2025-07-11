import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import Head from "@/components/Head";
import "@/index.css"


import {  FrontPageImage as heroBannerLg , heroBannerSm } from "@/assets";

const HomePage = () => {
  return (
   <>
      <Head title="TaskJoy AI-Powered To-Do list & Project Management App "/>
      
      <section>
          <div className="container !px-8 grid grid-cols-1 gap-8 items-center xl:gap-12 xl:grid-cols-[1fr_1.5fr]">
            <div className="flex flex-col items-center text-center space-y-4 lg:text-left lg:items-start lg:space-y-6">
              <h1 className="text-4xl font-semibold max-w-[22ch] md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl">
                Simplify Your Work and Life with{" "}<span className="inline-flex bg-linear-to-r from-orange-400 via-yellow-500 to-yellow-600 rounded-full px-2 p-2 overflow-hidden">AI-Powered</span>{" "} Task Management.
              </h1>

              <p className="max-w-[48ch] text-foreground/80 md:text-lg lg:text-xl ">Simplify life for both you and your team with the world's #1 Task manager and to-do list app.</p>

              <Button asChild size="lg" className="bg-orange-500 p-2 rounded-2xl text-white">
                <Link to="/register">Start For Free</Link>
              </Button>
            </div>

            <figure className="bg-secondary rounded-2xl overflow-hidden aspect-square max-md:max-w-[480px] max-md:mx-auto md:aspect-video">
              <img src={heroBannerSm} width={480} height={480} alt="TaskJoy AI Website" className="block md:hidden" />
               <img src={heroBannerLg} width={960} height={540} alt="TaskJoy AI Website" className="hidden md:block rounded-2xl"/>
               
            </figure>
          </div>
      </section>
   
   </>
  )
}

export default HomePage
