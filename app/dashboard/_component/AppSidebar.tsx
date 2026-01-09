import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { LayoutDashboard } from "lucide-react"

const MenuOptions=[
    {
        title:"Dashboard",
        url:"/dashboard",
        icon:LayoutDashboard
    }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
        <Image src={'/logo.svg'} alt="Logo" width={35} height={35} />
        <h2 className="text-lg font-bold">AgentCanvas</h2>
        </div>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}