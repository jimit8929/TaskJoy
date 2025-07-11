// nodemodules
import { databases } from "@/lib/appwrite";

// custom modules
import { getUserId } from "@/lib/utils";

//types
import type { LoaderFunction } from "react-router";

//env
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASES_ID;
 
const getProject = async(projectId : string) => {
    try{
        const project = await databases.getDocument(
            APPWRITE_DATABASE_ID,
            "projects",
            projectId
        );

        if(project.userId !== getUserId()){
            throw new Error("Unauthorized");
        }

        return project;
    }
    catch(err){
        console.log("Error Getting Project:" , err);

        if(err instanceof Error){
            throw new Error(err.message);
        }

        throw new Error("Error getting Project");
    }
    
}

const projectDetailLoader:LoaderFunction = async({params}) => {
    const {projectId} = params as {projectId: string}

    const project = await getProject(projectId);
    
    return {project}
}

export default projectDetailLoader;