"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Gem,
} from "lucide-react";
import { useContext } from "react";
import { UserDetails } from "@/context/UserData";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const MenuOptions = [
    {name: 'Dashboard',url:'/dashboard', icon: '/dashboard.png'},
    {name: 'Data',url:'#', icon: '/database.png'},
    {name: 'Agent',url:'#', icon: '/ai.png'},
    {name: 'Profile',url:'#', icon: '/profile.png'}
  ]



export function AppSidebar() {
  //check for sidebar open or not
  const { open } = useSidebar();
  const { userDetails, setUserDetail } = useContext(UserDetails);
  // console.log("UserDetails from context:", userDetails);
  const path = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="Logo" width={35} height={35} />
          {open && <h2 className="text-lg font-bold">AgentFlow</h2>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuOptions.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild size={open ? "lg" : "default"} isActive={path===menu.url}>
                    <Link href={menu.url}>
                      <Image src={menu.icon} alt={menu.name} width={20} height={20} />
                      <span>{menu.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-5">
        <div className="flex items-center gap-2">
          <Gem />
          {open && (
            <h2 className="text-sm font-medium">
              Remaining Credit: 
              <span className="font-bold">{userDetails?.token ?? 0}</span>
            </h2>
          )}
        </div>
        

          {open &&<Button>Upgrade to Premium</Button>}
        
      </SidebarFooter>
    </Sidebar>
  );
}
