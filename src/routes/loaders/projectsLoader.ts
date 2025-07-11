//Node modules
import { databases , Query } from "@/lib/appwrite";

// custom modules
import { getUserId } from "@/lib/utils";

// types
import type { LoaderFunction } from "react-router";

//Env
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASES_ID

const getProjects = async (query : string) => {
    try{
        return await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            "projects",
            [
                Query.select(["$id" , "name" , "color_name" , "color_hex" , "$createdAt"]),
                Query.equal("userId" , getUserId()),
                Query.contains("name" , query),
                Query.orderDesc("$createdAt")
            ]
        );
    }
    catch(err){
        console.log(err);
        throw new Error("Error getting projects");
    }
}
 
const projectsLoader:LoaderFunction = async({request}) => {

    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";


    const projects = await getProjects(query);

    return {projects}
}

export default projectsLoader