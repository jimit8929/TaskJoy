//node modules
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

//components
import Head from './Head';
import TopAppBar from './TopAppBar';
import { Button } from './ui/button';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import TaskLoading from './TaskLoading';
import ProjectActionMenu from './ProjectActionMenu';
import TaskCreateButton from './TaskCreateButton';
import TaskEmptyState from './TaskEmptyState';
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page';

//assests
import { MoreHorizontal } from 'lucide-react';

//types
import type { Models } from 'appwrite';

const ProjectDetailPage = () => {
  const { project } = useLoaderData<{ project: Models.Document }>();

  const projectTasks = project.tasks.filter(
    (i: Models.Document) => !i.completed,
  ) as Models.Document[];

  projectTasks.sort((a, b) => {
    return a.due_date < b.due_date ? -1 : 1;
  });

  const [taskFormShow, setTaskFormShow] = useState<boolean>(false);
  const fetcher = useFetcher();

  return (
    <>
      <Head title={project.name + ' - TaskJoy AI'} />

      <TopAppBar title={project.name} />

      <Page>
        <PageHeader>
          <div className='flex items-center gap-2'>
            <PageTitle> {project.name}</PageTitle>

            <ProjectActionMenu
              defaultFormData={{
                id: project.$id,
                name: project.name,
                color_name: project.color_name,
                color_hex: project.color_hex,
              }}
            >
              <Button
                variant='ghost'
                size='icon'
                className='w-8 h-8 shrink-0'
                aria-label='More Actions'
              >
                <MoreHorizontal />
              </Button>
            </ProjectActionMenu>
          </div>
        </PageHeader>

        <PageList>
          {projectTasks.map(({ $id, content, completed, due_date }) => (
            <TaskCard
              key={$id}
              id={$id}
              content={content}
              completed={completed}
              due_date={due_date}
              project={{
                id: project.$id,
                name: project.name,
                color_name : project.color_name,
                color_hex : project.color_hex,
              }}
            />
          ))}

          {fetcher.state !== 'idle' && <TaskLoading />}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}

          {!projectTasks.length && !taskFormShow && (
            <TaskEmptyState type='project' />
          )}

          {taskFormShow && (
            <TaskForm
              className='mt-3'
              mode='create'
              onCancel={() => setTaskFormShow(false)}
              defaultFormData={{
                content: "",
                due_date: null,
                project:project.$id,
              }}
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

export default ProjectDetailPage;




