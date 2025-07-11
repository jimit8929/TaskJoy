import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageTitle, PageList } from '@/components/Page';
import TaskCreateButton from '@/components/TaskCreateButton';
import TaskEmptyState from '@/components/TaskEmptyState';
import TaskForm from '@/components/TaskForm';
import { useFetcher, useLoaderData } from 'react-router';

import type { Models } from 'appwrite';

import { useState } from 'react';
import TaskCard from '@/components/TaskCard';
import TaskLoading from '@/components/TaskLoading';

const InboxPage = () => {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>(); //instead of Models.DocumentList i have used Models.Document
  const [TaskFormShow, setTaskFormShow] = useState(false);

  return (
    <>
      <Head title='Inbox - TaskJoy' />

      <TopAppBar
        title='Inbox'
      />

      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>

        <PageList>
          {tasks.documents.map(
            ({ $id, content, completed, due_date, projectId: project }) => (
              <TaskCard
                key={$id}
                id={$id}
                content={content}
                completed={completed}
                due_date={due_date}
                project={project}
              />
            ),
          )}

          { fetcher.state !== "idle" && 
            <TaskLoading/>
          }

          {!TaskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}

          { !tasks.total && !TaskFormShow && <TaskEmptyState type='inbox' />}

          {TaskFormShow && (
            <TaskForm
              className='mt-3'
              mode='create'
              onCancel={() => setTaskFormShow(false)}
              onSubmit={(FormData) => {
                fetcher.submit(JSON.stringify(FormData), {
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

export default InboxPage;
