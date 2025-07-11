import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { startOfToday } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';
import type { Models } from 'appwrite';
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageTitle, PageList } from '@/components/Page';
import TaskCreateButton from '@/components/TaskCreateButton';
import TaskEmptyState from '@/components/TaskEmptyState';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';
import TaskLoading from '@/components/TaskLoading';

const TodayTaskPage = () => {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData() as { tasks: Models.DocumentList<Models.Document> };
  const [taskFormShow, setTaskFormShow] = useState(false);

  return (
    <>
      <Head title='Today - TaskJoy' />
      <TopAppBar title='Today' taskCount={tasks.total} />

      <Page>
        <PageHeader>
          <PageTitle>Today</PageTitle>
          {tasks.total > 0 && (
            <div className="flex items-center gap-1.5 text-md text-muted-foreground">
              <CheckCircle2 size={16}/> {tasks.total} tasks
            </div>
          )}
        </PageHeader>

        <PageList>
           {tasks.documents.map(
            ({ $id, content, completed, due_date, projectId : project }) => (
              <TaskCard
                key={$id}
                id={$id}
                content={content}
                completed={completed}
                due_date={due_date}
                project={project}  
            />
          ))}

          {fetcher.state !== "idle" && <TaskLoading/>}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}

          {!tasks.total && !taskFormShow && <TaskEmptyState type='today' />}

          {taskFormShow && (
            <TaskForm
              className='mt-3'
              mode='create'
              defaultFormData={{
                content: "",
                due_date: startOfToday(),
                project: null,
              }}
              onCancel={() => setTaskFormShow(false)}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData), {
                  action: '/app',
                  method: 'POST',
                  encType: 'application/json',
                });
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  );
}; 

export default TodayTaskPage;
