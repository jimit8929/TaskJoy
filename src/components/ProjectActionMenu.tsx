// components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import ProjectFormDialog from './ProjectFormDialog';
import { Button } from './ui/button';
import ProjectDeleteButton from './ProjectDeleteButton';

// assets
import { Edit } from 'lucide-react';

// types
import type { Project } from '@/types';
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

interface ProjectActionMenuProps extends DropdownMenuContentProps {
  defaultFormData: Project;
}

const ProjectActionMenu: React.FC<ProjectActionMenuProps> = ({
  children,
  defaultFormData,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent {...props}>
        <DropdownMenuItem asChild
          onSelect={(event) => {
            event.preventDefault();
          }}
        >
          <ProjectFormDialog
            method='PUT'
            defaultFormData={defaultFormData}
          >
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start'
            >
              <Edit /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData}/>
      </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  );
};

export default ProjectActionMenu;
