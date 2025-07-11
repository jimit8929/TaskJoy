// import { useState } from 'react';
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from '@/components/ui/dialog';
// import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
// import ProjectForm from '@/components/ProjectForm';

// import { useFetcher } from 'react-router';

// import type { Project } from '@/types';

// //custom modules
// import { truncateString } from '@/lib/utils';

// //hooks
// import { useToast } from '@/hooks/useToast';

// type ProjectFormDialogProps = {
//   defaultFormData?: Project;
//   children: React.ReactNode;
//   method: 'POST' | 'PUT';
// };

// const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({
//   defaultFormData,
//   children,
//   method,
// }) => {
//   const [open, setOpen] = useState(false);

//   const titleText = method === 'POST' ? 'Add Project' : 'Edit Project';
//   const descriptionText =
//     method === 'POST'
//       ? 'Fill out the form below to create a new project.'
//       : 'Update the details of your project below.';


//     const fetcher = useFetcher();
//     const {toast} = useToast();

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>

//       <DialogContent className="p-0 border-0 !rounded-xl max-w-md w-full mx-auto overflow-visible">
//         {/* Visually hidden for screen readers */}
//         <VisuallyHidden>
//           <DialogTitle>{titleText}</DialogTitle>
//           <DialogDescription>{descriptionText}</DialogDescription>
//         </VisuallyHidden>

//         {/* Keep your original padding wrapper */}
//         <div>
//           <ProjectForm
//             mode={method === 'POST' ? 'create' : 'edit'}
//             defaultFormData={defaultFormData}
//             onCancel={() => setOpen(false)}
//             onSubmit={async (data) => {
//               setOpen(false);

//              const {id , update} = toast({
//                 title: `${method === "POST" ? "Creating" : "Updating"} project...`,
//                 duration: Infinity,
//               })

//                 await fetcher.submit(JSON.stringify(data) , {
//                     action: "/app/projects",
//                     method,
//                     encType: "application/json",
//                 });

//                 update({
//                     id ,
//                     title: `Project ${method === "POST" ? "Created" : "updated"}`,
//                     description: `The Project ${truncateString(data.name , 32)} ${data.ai_task_gen ? "and its tasks" : ""} have been succesfully ${method === "POST" ? "Created" : "Updated"}`,
//                     duration: 5000,
//                 })
//             }}
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProjectFormDialog;


// src/components/ProjectFormDialog.tsx
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import ProjectForm from '@/components/ProjectForm';

import { useFetcher } from 'react-router';
import { toast } from 'sonner';      // ← Sonner toast

import type { Project } from '@/types';
import { truncateString } from '@/lib/utils';

type ProjectFormDialogProps = {
  defaultFormData?: Project;
  children: React.ReactNode;
  method: 'POST' | 'PUT';
};

export const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({
  defaultFormData,
  children,
  method,
}) => {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();

  const titleText = method === 'POST' ? 'Add Project' : 'Edit Project';
  const descriptionText =
    method === 'POST'
      ? 'Fill out the form below to create a new project.'
      : 'Update the details of your project below.';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="p-0 border-0 !rounded-xl max-w-md w-full mx-auto overflow-visible">
        <VisuallyHidden>
          <DialogTitle>{titleText}</DialogTitle>
          <DialogDescription>{descriptionText}</DialogDescription>
        </VisuallyHidden>

        <div>
          <ProjectForm
            mode={method === 'POST' ? 'create' : 'edit'}
            defaultFormData={defaultFormData}
            onCancel={() => setOpen(false)}
            onSubmit={async (data) => {
              setOpen(false);

              // 1) show a loading toast
              const id = toast.loading(
                `${method === 'POST' ? 'Creating' : 'Updating'} project...`,
                { duration: 0 } // 0 = infinite
              );

              // 2) submit via fetcher
              await fetcher.submit(JSON.stringify(data), {
                action: '/app/projects',
                method,
                encType: 'application/json',
              });

              // 3) update to success
              toast.success(
                `Project ${method === 'POST' ? 'Created' : 'Updated'}`,
                {
                  id,
                  description: `Project “${truncateString(
                    data.name,
                    32
                  )}” ${
                    data.ai_task_gen ? 'and its tasks ' : ''
                  }were successfully ${
                    method === 'POST' ? 'created' : 'updated'
                  }.`,
                  duration: 5000,
                }
              );
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
