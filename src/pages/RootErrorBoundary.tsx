import { isRouteErrorResponse , useRouteError , Link } from "react-router"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { pageNotFound } from "@/assets"

const RootErrorBoundary = () => {

    const error = useRouteError();

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header/>

      <div className="grow container flex flex-col justify-center items-center pt-32 pb-12 ">
        <h1 className="text-2xl font-semibold text-center sm:text-4xl">
            {isRouteErrorResponse(error) ? "Oops, that page doesn't exist." : "Something Went Wrong."}
        </h1>

        <p className="text-muted-foreground max-w-[55ch] text-center mt-4 mb-6 sm:text-lg">
            {isRouteErrorResponse(error) ? "You can get back on track and manage your tasks with ease." : 
            "We're working on fixing this issue. Please try again later."}
        </p>

        <div className="flex gap-4">
            <Button asChild className="bg-white p-4 rounded-lg text-black">
                <Link to="/">Return To Home</Link>
            </Button>

            <Button asChild className="bg-orange-500 p-4 rounded-lg text-white">
                <Link to="/app/inbox">View Inbox</Link>
            </Button>
        </div>

        <figure className="mt-10">
            <img src={pageNotFound} width={560} height={373} alt="404 Page not found" />
        </figure>

      </div>

      <Footer/>
    </div>
  )
}

export default RootErrorBoundary
