import { databases , Query } from "@/lib/appwrite";

import { getUserId } from "@/lib/utils";

import type { LoaderFunction } from "react-router";

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASES_ID

const getTasks = async() => {
    try{
        return await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            "tasks",
            [
                Query.equal("completed" , true), // get only incomplete
                Query.orderDesc("$updatedAt"),
                Query.equal("userId" , getUserId()) // get only tasks for the current user
            ]
        )
    }
    catch(err){
        console.log(err);
        throw new Error("Error getting completed tasks");
    }
}

const completedLoader: LoaderFunction = async() => {
    const tasks = await getTasks();
    return {tasks};
}

export default completedLoader;
