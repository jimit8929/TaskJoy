//components
import TopAppBar from "@/components/TopAppBar"
import Head from "@/components/Head"

//assests
import { pageNotFound } from "@/assets"

const ProjectErrorBoundary = () => {
  return (
   <>
        <Head title="Project not Found"/>
        <TopAppBar title="Project not Found"/>

        <div className="grow container flex flex-col justify-center items-center">
            <figure className="mt-10">
                <img src={pageNotFound} alt="404 page not Found" width={360}/>
            </figure>

            <h1 className="text-2xl font-semibold text-center mt-4 mb-2">Project not Found</h1>
            <p className="text-muted-foreground max-w-[40ch] text-center">
                Oops! No Project Matches this Id. Double-check it or explore other Projects!
            </p>
        </div>
   </>
  )
}

export default ProjectErrorBoundary
