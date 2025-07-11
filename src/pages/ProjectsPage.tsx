// node modules
import { useCallback, useRef, useState } from 'react';
import { useLoaderData, useFetcher } from 'react-router';

// components
import Head from '@/components/Head';
import { Button } from '@/components/ui/button';
import TopAppBar from '@/components/TopAppBar';
import ProjectFormDialog from '@/components/ProjectFormDialog';
import { Page, PageHeader, PageTitle, PageList } from '@/components/Page';
import ProjectCard from '@/components/ProjectCard';

// assests
import { Plus } from 'lucide-react';

// constants
const SEARCH_TIMEOUT_DELAY = 500;

//Types
import type { Models } from 'appwrite';
import ProjectSearchField from '@/components/ProjectSearchField';
import type { SearchingState } from '@/components/ProjectSearchField';
import { cn } from '@/lib/utils';

type DataType = {
  projects: Models.DocumentList<Models.Document>;
};

const ProjectsPage = () => {
  const loaderData = useLoaderData() as DataType;
 
  const fetcher = useFetcher();
  const fetcherData = fetcher.data as DataType;

   const { projects } = fetcherData || loaderData;

  const [searchingState, setSearchingState] = useState<SearchingState>('idle');

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleProjectSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      const submitTarget = e.currentTarget.form;

      searchTimeout.current = setTimeout(async () => {
        setSearchingState('searching');
        await fetcher.submit(submitTarget);

        setSearchingState('idle');
      }, SEARCH_TIMEOUT_DELAY);

      setSearchingState('loading');
    },
    [],
  );

  return (
    <>
      <Head title='My Projects - TaskJoy AI' />

      <TopAppBar title='My Projects' />

      <Page>
        <PageHeader>
          <div className='flex items-center gap-2'>
            <PageTitle>My Projects</PageTitle>

            <ProjectFormDialog method='POST'>
              <Button
                variant='ghost'
                size='icon'
                className='w-8 h-8'
                aria-label='Create a Project'
              >
                <Plus />
              </Button>
            </ProjectFormDialog>
          </div>

          <fetcher.Form
            method='get'
            action='/app/projects'
          >
            <ProjectSearchField
              handleChange={handleProjectSearch}
              searchingState={searchingState}
            />
          </fetcher.Form>
        </PageHeader>

        <PageList>
          <div className='h-8 flex items-center border-b'>
            <div className='text-sm'>{projects.total} Projects</div>
          </div>

          <div className={cn(searchingState === "searching" && "opacity-30")}>
            {projects.documents.map((project) => (
              <ProjectCard
                key={project.$id}
                project={project}
              />
            ))}

            {projects.total === 0 && (
              <div className="h-14 flex justify-center items-center text-muted-foreground">
                No Projects Found
              </div>
            )}

          </div>
        </PageList>
      </Page>
    </>
  );
};

export default ProjectsPage;
