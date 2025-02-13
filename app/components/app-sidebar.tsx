'use client';
import * as React from 'react';

import { SearchForm } from '@/components/search-form';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { LayoutDashboard, ScanQrCode, Headset, LogOut } from 'lucide-react';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Control panel',
      url: '#',
      items: [
        {
          title: 'Dashboard',
          url: '/admin/dashboard',
          isActive: true,
          icon: LayoutDashboard,
        },
        {
          title: 'Access code',
          url: '/admin/dashboard/access',
          icon: ScanQrCode,
        },
        {
          title: 'Request',
          url: '/admin/dashboard/requests',
          icon: Headset,
        },
        {
          title: 'Sign out',
          url: '/logout',
          icon: LogOut,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        <h5 className="text-4xl bold pl-4">VILL</h5>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url}>
                          <Icon />
                          {item.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
