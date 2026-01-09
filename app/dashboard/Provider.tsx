import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_component/AppSidebar'

const DashboardProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <SidebarProvider>
            <AppSidebar />
    <SidebarTrigger />
        {children}
    </SidebarProvider>
    </div>
  )
}

export default DashboardProvider