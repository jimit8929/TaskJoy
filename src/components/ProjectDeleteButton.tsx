
// node modules
import { useFetcher , useLocation, useNavigate } from 'react-router';
import { useCallback } from 'react';

// components
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { toast } from 'sonner'; 

// assets
import { Trash2 } from 'lucide-react';

// custom modules
import { truncateString } from '@/lib/utils';

// types
import type { Project } from '@/types';

type ProjectDeleteButtonProps = {
  defaultFormData: Project;
};

const ProjectDeleteButton: React.FC<ProjectDeleteButtonProps> = ({
  defaultFormData,
}) => {
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate()

  const handleProjectDelete = useCallback(async () => {
    // 1) show a loading toast

    if(location.pathname === `/app/projects/${defaultFormData.id}`){
        navigate("/app/inbox");

    }

    const id = toast.loading('Deleting project...', { duration: 0 });

    try {
      await fetcher.submit(defaultFormData, {
        action: '/app/projects',
        method: 'DELETE',
        encType: 'application/json',
      });

      // 2) show success
      toast.success('Project deleted', {
        id,
        description: `Project “${truncateString(
          defaultFormData.name,
          32
        )}” has been permanently deleted.`,
        duration: 5000,
      });
    } catch (err) {
      console.error('Error deleting project:', err);

      // 3) show error
      toast.error('Error deleting project', {
        id,
        description: 'An error occurred while deleting the project.',
        duration: 5000,
      });
    }
  }, [defaultFormData, fetcher]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start px-2 hover:text-red-500 text-red-500"
        >
          <Trash2 /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project?</AlertDialogTitle>
          <AlertDialogDescription>
            The{' '}
            <strong className="text-amber-500">
              {truncateString(defaultFormData.name, 60)}
            </strong>{' '}
            project and all of its tasks will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleProjectDelete}
            className="bg-red-500 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectDeleteButton;
