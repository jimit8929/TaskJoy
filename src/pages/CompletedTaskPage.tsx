import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageTitle, PageList } from '@/components/Page';
import TaskEmptyState from '@/components/TaskEmptyState';
import { useLoaderData } from 'react-router';
import type { Models } from 'appwrite';
import TaskCard from '@/components/TaskCard';

const CompletedTaskPage = () => {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>(); //instead of Models.DocumentList i have used Models.Document
 


  return (
    <>
      <Head title='Completed - TaskJoy' />

      <TopAppBar
        title='Completed' taskCount={tasks.total}
      />

      <Page>
        <PageHeader>
          <PageTitle>Completed</PageTitle>
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

        

          { !tasks.total && <TaskEmptyState type='completed' />}

        </PageList>
      </Page>
    </>
  );
};

export default CompletedTaskPage

