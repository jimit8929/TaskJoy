/**
 * 
 * components
 */
import { Skeleton } from "./ui/skeleton"


const TaskLoading = () => {
  return (
    <div className="grid grid-cols-[max-content , 1fr] gap-3 items-center border-b-4 pt-2 pb-3.5">
      <Skeleton className="w-5 h-5 rounded-full bg-orange-400 overflow-hidden"/>
      <Skeleton className="h-3 me-10 bg-orange-400 overflow-hidden"/>
    </div>
  )
}

export default TaskLoading
