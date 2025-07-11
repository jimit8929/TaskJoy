import { Outlet, useNavigation, useLoaderData } from 'react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { Toaster } from '@/components/ui/sonner';
import { ProjectProvider } from '@/contexts/ProjectContext';

import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

//Types
import type { AppLoaderData } from '@/routes/loaders/appLoader';

const AppLayout = () => {
  const navigation = useNavigation();
  const { projects } = useLoaderData<AppLoaderData>();
  const isLoading = navigation.state === 'loading' && !navigation.formData;

  return (
    <>
      <ProjectProvider projects={projects}>
        <SidebarProvider>
          <TooltipProvider>
            <AppSidebar />

            <main
              className={cn('flex-1', isLoading && 'opacity-50 pointer-none:')}
            >
              <Outlet />
            </main>
          </TooltipProvider>
        </SidebarProvider>

        <Toaster position='bottom-right' />
      </ProjectProvider>
    </>
  );
};

export default AppLayout;
