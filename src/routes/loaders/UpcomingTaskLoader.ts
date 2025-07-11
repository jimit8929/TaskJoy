import { databases , Query } from "@/lib/appwrite";
import { startOfToday } from "date-fns";

import { getUserId } from "@/lib/utils";

import type { LoaderFunction } from "react-router";

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASES_ID

const getTasks = async() => {
    try{
        return await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            "tasks",
            [
                Query.equal("completed" , false), // get only incomplete
                Query.isNotNull("due_date"),
                Query.greaterThanEqual("due_date" , startOfToday().toISOString()),
                Query.orderAsc("due_date"),
                Query.equal("userId" , getUserId()) // get only tasks for the current user
            ]
        )
    }
    catch(err){
        console.log(err);
        throw new Error("Error getting upcoming tasks");
    }
}

const UpcomingTaskLoader: LoaderFunction = async() => {
    const tasks = await getTasks();
    return {tasks};
}

export default UpcomingTaskLoader;
