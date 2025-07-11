import type React from "react";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";


type TaskCreateButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement> , "className">;

const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button variant="link" className="w-full justify-start mb-4 px-0 text-orange-500 text-md"{...props}>
        <CirclePlus/> Add Task
    </Button>
  )
}

export default TaskCreateButton
