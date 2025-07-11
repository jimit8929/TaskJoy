import type { Task, Project } from '@/types';

/**
 * Components
 */
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

import { toast } from '@/components/ui/sonner-toast';
import TaskForm from './TaskForm';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';

/**
 * Node modules
 */
import { cn } from '@/lib/utils';
import { useState, useCallback } from 'react';
import { useFetcher, useLocation } from 'react-router-dom';

/**
 * Icons
 */
import { Check, CalendarDays, Hash, Inbox, Edit, Trash2 } from 'lucide-react';

/**
 * Utils
 */
import {
  formatCustomDate,
  getTaskDueDateColorClass,
  truncateString,
} from '@/lib/utils';

type TaskCardProps = {
  id: string;
  content: string;
  completed: boolean;
  due_date: Date;
  project: Project | null;

};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  content,
  completed,
  due_date,
  project,
 
}) => {
  const [TaskFormShow, setTaskFormShow] = useState(false);

  const fetcher = useFetcher();
  const location = useLocation();

  const fetcherTask = fetcher.json as Partial<Task>;

  const task: Task = {
    id: fetcherTask?.id ?? id,
    content: fetcherTask?.content ?? content,
    completed: fetcherTask?.completed ?? completed,
    due_date: fetcherTask?.due_date ?? due_date,
    project: fetcherTask?.project ?? project,
    userId: fetcherTask?.userId ?? '',
  };

  const handleTaskComplete = useCallback(
    async (completed: boolean) => {
      return await fetcher.submit(JSON.stringify({ id: task.id, completed }), {
        action: '/app',
        method: 'PUT',
        encType: 'application/json',
      });
    },
    [fetcher, task.id],
  );

  return (
    <>
      {!TaskFormShow && (
        <div className='group/card relative border-b px-3 py-4 flex gap-3 items-start'>
          {/* Checkbox */}

          
            <Button
              variant='outline'
              size='icon'
              role='checkbox'
              aria-checked={task.completed}
              aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
              aria-describedby='task-content'
              onClick={async () => {
                await handleTaskComplete(!task.completed);

                if (!task.completed) {
                  toast('1 Task completed', {
                    action: {
                      label: 'undo',
                      onClick: () => handleTaskComplete(false),
                    },
                  });
                }
              }}
              className={cn(
                'rounded-full w-5 h-5 mt-1 shrink-0',
                'group/button',
                task.completed && 'bg-border',
              )}
            >
              <Check
                strokeWidth={4}
                className={cn(
                  '!w-3 !h-3 text-muted-foreground transition-opacity',
                  task.completed ? 'opacity-100' : 'opacity-0',
                  'group-hover/button:opacity-100',
                )}
              />
            </Button>
          

          {/* Task Card */}
          <div className='flex-1 w-full relative'>
            <Card className='rounded-md border-none p-0 shadow-none bg-transparent'>
              <CardContent className='p-0 pb-1'>
                <p
                  id='task-content'
                  className={cn(
                    'text-sm sm:text-base',
                    task.completed && 'text-muted-foreground line-through',
                  )}
                >
                  {task.content}
                </p>
              </CardContent>

              <CardFooter className='flex flex-wrap justify-between items-center p-0 pt-1 text-xs sm:text-sm text-muted-foreground gap-2'>
                {task.due_date && location.pathname !== '/app/today' && (
                  <div
                    className={cn(
                      'flex items-center gap-1',
                      getTaskDueDateColorClass(task.due_date, task.completed),
                    )}
                  >
                    <CalendarDays className='w-4 h-4' />
                    {formatCustomDate(task.due_date)}
                  </div>
                )}

                {/* ✅ Always show project name + icon */}
                <div className='flex items-center gap-1 truncate ml-auto'>
                  <span className='truncate'>
                    {task.project?.name ?? 'Inbox'}
                  </span>
                  {task.project && task.project.color_hex ? (
                    <Hash
                      className='w-4 h-4'
                      color={task.project.color_hex}
                    />
                  ) : (
                    <Inbox className='w-4 h-4 text-muted-foreground' />
                  )}
                </div>
              </CardFooter>
            </Card>

            {/* Edit/Delete Buttons */}
            <div
              className={cn(
                'absolute top-0 right-0 bg-background ps-1',
                'shadow-[-10px_0_5px_hsl(var(--background))]',
                'flex items-center gap-1',
                'opacity-0 group-hover/card:opacity-100 focus-within:opacity-100',
                'transition-opacity max-md:opacity-100',
              )}
            >
              {!task.completed && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='w-6 h-6 text-muted-foreground'
                      aria-label='Edit task'
                      onClick={() => setTaskFormShow(true)}
                    >
                      <Edit className='w-4 h-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-amber-400 font-bold'>
                    Edit Task
                  </TooltipContent>
                </Tooltip>
              )}

              <AlertDialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='w-6 h-6 text-muted-foreground'
                        aria-label='Delete task'
                      >
                        <Trash2 className='w-4 h-4' />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent className='bg-amber-400 font-bold'>
                    Delete Task
                  </TooltipContent>
                </Tooltip>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Task?</AlertDialogTitle>

                    <AlertDialogDescription>
                      The{' '}
                      <strong className='text-amber-500'>
                        {truncateString(task.content, 60)}
                      </strong>{' '}
                      task will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className='bg-red-600 text-white'
                      onClick={() => {
                        fetcher.submit(JSON.stringify({ id: task.id }), {
                          action: '/app',
                          method: 'DELETE',
                          encType: 'application/json',
                        });
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      )}

      {TaskFormShow && (
        <TaskForm
          className='my-1'
          defaultFormData={{
            id,
            content,
            completed,
            due_date,
            project: task.project?.id ?? null,
          }}
          mode='edit'
          onCancel={() => setTaskFormShow(false)}
          onSubmit={(FormData) => {
            fetcher.submit(JSON.stringify(FormData), {
              action: '/app',
              method: 'PUT',
              encType: 'application/json',
            });

            setTaskFormShow(false);
          }}
        />
      )}
    </>
  );
};

export default TaskCard;
