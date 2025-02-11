import { getPathname } from '@/auth/misc';
import { validateSession } from '@/auth/session';
import { redirect } from 'next/navigation';

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateSession();
  const pathName = await getPathname();

  if (!user && pathName !== '/login') {
    redirect('/login');
  }

  console.log(pathName);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {pathName.split('/').map((path) => {
                if (path !== '')
                  return (
                    <div className="flex items-center" key={path}>
                      <BreadcrumbItem>
                        <BreadcrumbPage>{path}</BreadcrumbPage>
                      </BreadcrumbItem>
                      {pathName.split('/').at(-1) !== `${path}` && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </div>
                  );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          <div className="">{children}</div>
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
