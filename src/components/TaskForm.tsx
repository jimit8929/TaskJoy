import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

//hooks
import { useProjects } from '@/contexts/ProjectContext';

import { ScrollArea } from './ui/scroll-area';
import {
  CalendarIcon,
  Check,
  ChevronDown,
  Hash,
  Inbox,
  SendHorizonal,
  X,
} from 'lucide-react';

import type { ClassValue } from 'clsx';
import type { TaskFormData } from '@/types';

import { useState, useEffect, useCallback } from 'react';
import * as chrono from 'chrono-node';

import { formatCustomDate, getTaskDueDateColorClass, cn } from '@/lib/utils';
import type { Models } from 'appwrite';

type TaskFormProps = {
  defaultFormData?: TaskFormData;
  className?: ClassValue;
  mode: 'create' | 'edit';
  onCancel?: () => void;
  onSubmit?: (FormData: TaskFormData) => void;
};

const DEFAULT_FORM_DATA: TaskFormData = {
  content: '',
  due_date: null,
  project: null,
};

const TaskForm: React.FC<TaskFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  className,
  mode,
  onCancel,
  onSubmit,
}) => {
  const [taskContent, setTaskContent] = useState(defaultFormData?.content);

  const [projectId, setProjectId] = useState(defaultFormData.project);

  const [projectName, setProjectName] = useState('');
  const [projectColorHex, setProjectColorHex] = useState('');

  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [projectopen, setProjectOpen] = useState(false);

  const [formData, setFormData] = useState(defaultFormData);

  const defaultDueDate = defaultFormData.due_date;

  const [dueDate, setDueDate] = useState<Date | null>(defaultDueDate);
  const [dueLabel, setDueLabel] = useState<string | null>(null);

  const projects = useProjects();

  useEffect(() => {
    if (projectId) {
      const { name, color_hex } = projects?.documents.find(
        ({ $id }) => projectId === $id,
      ) as Models.Document;

      setProjectName(name);
      setProjectColorHex(color_hex);
    }
  }, [projects, projectId]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: taskContent,
      due_date: dueDate,
      project: projectId,
    }));
  }, [taskContent, dueDate, projectId]);

  useEffect(() => {
    if (!taskContent) {
      if (defaultDueDate) {
        setDueDate(defaultDueDate);

        if (defaultDueDate) {
          setDueDate(defaultDueDate);
        }
      } else {
        setDueDate(null);
        setDueLabel(null);
      }
      return;
    }

    // Parse with forwardDate so "Friday" → next Friday if today is past
    const results = chrono.parse(taskContent, new Date(), {
      forwardDate: true,
    });

    if (results.length) {
      const last = results[results.length - 1];
      setDueDate(last.start.date());
      // capitalize the literal text (e.g. "next friday" → "Next friday")
      setDueLabel(last.text.charAt(0).toUpperCase() + last.text.slice(1));
    }
  }, [taskContent, defaultDueDate]);

  const handleSubmit = useCallback(() => {
    if (!taskContent) return;

    if (onSubmit) onSubmit(formData);

    setTaskContent('');
  }, [taskContent, onSubmit, formData]);
  

  return (
    <Card className={cn('focus-within:border-foreground/30', className)}>
      <CardContent className='p-2'>
        <Textarea
          className='!border-0 !ring-0 mb-2 p-1'
          placeholder='After Finishing the project , Take a tour'
          autoFocus
          value={taskContent}
          onInput={(e) => setTaskContent(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();

              handleSubmit();
            }
          }}
        />

        <div className='ring-1 ring-border rounded-md max-w-max'>
          <Popover
            open={dueDateOpen}
            onOpenChange={setDueDateOpen}
          >
            <PopoverTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={cn(getTaskDueDateColorClass(dueDate, false))}
              >
                <CalendarIcon />
                {dueDate ? (dueLabel ?? formatCustomDate(dueDate)) : 'Due Date'}
              </Button>
            </PopoverTrigger>

            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                initialFocus
                disabled={{ before: new Date() }}
                onSelect={(selected) => {
                  setDueDate(selected || null);
                  setDueDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='px-2 -ms-2'
                  aria-label='Remove due date'
                  onClick={() => setDueDate(null)}
                >
                  <X />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Remove due date</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className='grid grid-cols-[minmax(0,1fr) , max-content] gap-2 p-2'>
        <Popover
          modal
          open={projectopen}
          onOpenChange={setProjectOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              role='combobox'
              aria-expanded={projectopen}
              className='max-w-max'
            >
              {projectName ? <Hash color={projectColorHex} /> : <Inbox />}

              <span className='truncate'>{projectName || 'Inbox'}</span>

              <ChevronDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className='w-[240px] p-0'
            align='start'
          >
            <Command>
              <CommandInput placeholder='Search-Project...' />

              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No Project Found.</CommandEmpty>

                  <CommandGroup>
                    {projects?.documents.map(({ $id, name, color_hex }) => (
                        <CommandItem key={$id}  value={$id} onSelect={(selectedValue)  => {
                          setProjectName(selectedValue === projectName ? " " : name);
                          setProjectId(selectedValue === projectName ? null : $id);
                          setProjectColorHex(selectedValue === projectName ? undefined : color_hex);
                          setProjectOpen(false);
                        }}>
                        <Hash color={color_hex} />{name}

                        {projectName === name && <Check className='ms-auto'/>}

                      </CommandItem>                      
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className='flex items-center gap-2'>
          <Button
            variant='secondary'
            onClick={onCancel}
          >
            <span className='max-md:hidden'>Cancel</span>
            <X className='md:hidden' />
          </Button>

          <Button
            disabled={!taskContent}
            onClick={handleSubmit}
          >
            <span className='max:md:hidden'>
              {mode === 'create' ? 'Add Task' : 'Save'}
            </span>

            <SendHorizonal className='md:hidden' />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskForm;
