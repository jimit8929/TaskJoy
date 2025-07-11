import type { PropsWithChildren } from "react"
import { Dialog , DialogContent , DialogTrigger } from "./ui/dialog"
import TaskForm from "../components/TaskForm"
import { useLocation , useFetcher} from "react-router"

import { useState , useEffect } from "react"
import { startOfToday } from "date-fns"

const TaskFormDialog:React.FC<PropsWithChildren> = ({children}) => {

    const [open , setOpen] = useState(false);
    const location = useLocation();
    const fetcher = useFetcher();


    useEffect(() => {
        const listener = (event : KeyboardEvent) => {
            if(event.altKey && event.key.toLowerCase() === "d"){
                const target = event.target as HTMLElement;
                if(target.localName === "textarea") return;

                event.preventDefault();
                setOpen(true);
            }
        }

        document.addEventListener("keydown" , listener);

        return () => document.removeEventListener("keydown" , listener);

    },[])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>

        <DialogContent className="p-0 border-0 !rounded-xl">
            <TaskForm defaultFormData={{
                content: "",
                due_date: location.pathname === "/app/today" ? startOfToday():null,
                project:null,
            }} 
            mode = "create"
            onCancel={() => setOpen(false)}
            onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData),{
                    action: "/app",
                    method: "POST",
                    encType: "application/json",
                });
                setOpen(false);
            }}
            
            />
            
        </DialogContent>
    </Dialog>
  )
}

export default TaskFormDialog
