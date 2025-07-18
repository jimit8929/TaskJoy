import type { Task } from "@/types";
import type { ActionFunction } from "react-router";

import { databases } from "@/lib/appwrite"

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASES_ID;

import { generateID , getUserId } from "@/lib/utils";


const createTask = async(data : Task) => {
    try{
        return await databases.createDocument(
            APPWRITE_DATABASE_ID ,  "tasks" , generateID() , 
            {...data , userId : getUserId()}
        )
    }
    catch(err){
        console.log(err)
    }
}

const updateTask = async(data : Task) => {
    const documentId = data.id;

    if(!documentId) throw new Error ("Task id not found.");

    delete data.id;

    try{
        return await databases.updateDocument(
            APPWRITE_DATABASE_ID,
            "tasks",
            documentId,
            data,
        )
    }
    catch(err){
        console.log(err);
    }
}

const deleteTask = async(data : Task) => {
    const documentId = data.id;

    if(!documentId) throw new Error("Task id not found");

    try{
        await databases.deleteDocument(
            APPWRITE_DATABASE_ID,
            "tasks",
            documentId,
        )
    }
    catch(error){
        console.log(error);
    }
}


const appAction: ActionFunction = async({request}) => {
    const data = await request.json() as Task;
    
    if(request.method === "POST"){
        return await createTask(data);
    }

    if(request.method === "PUT"){
        return await updateTask(data);
    }

    if(request.method === "DELETE"){
        return await deleteTask(data);
    }
}

export default appAction;