import { databases , Query } from "@/lib/appwrite";

import { getUserId } from "@/lib/utils";

import type { LoaderFunction } from "react-router";

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASES_ID

import { startOfToday , startOfTomorrow } from "date-fns";

const getTasks = async() => {
    try{
        return await databases.listDocuments(
            APPWRITE_DATABASE_ID,
            "tasks",
            [
                Query.equal("completed" , false), // get only incomplete
                Query.and([
                    Query.greaterThanEqual("due_date" , startOfToday().toISOString()),
                    Query.lessThan("due_date" , startOfTomorrow().toISOString()),
                ]),
                Query.equal("userId" , getUserId()) // get only tasks for the current user
            ]
        )
    }
    catch(err){
        console.log(err);
        throw new Error("Error getting inbox tasks");
    }
}

const todayTaskLoader: LoaderFunction = async() => {
    const tasks = await getTasks();

    return {tasks};

}

export default todayTaskLoader;
