import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,

  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Droplet, HomeIcon, ReceiptText, Smartphone, User, UserRoundPen } from 'lucide-react'
import Link from "next/link"


// This is sample data.
const data = {

  navMain: [

    {

      items: [
        {
          title: "Home",
          url: "/",
          icon: HomeIcon,
          isActive: true,
        },
        {
          title: "Costumer List",
          url: "/customer",
          icon: User,

        },
        {
          title: "Billing",
          url: "#",
          icon: ReceiptText
        },
        {
          title: "Water Usage",
          url: "#",
          icon: Droplet
        },
        {
          title: "Sms Management",
          url: "",
          icon: Smartphone
        },
        {
          title: "Profile",
          url: "#",
          icon: UserRoundPen
        },

      ],
    },

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>

        <h1 className="text-lg font-bold w-full text-center">Admin Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item, index) => (
          <SidebarGroup key={index}>

            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>
                        {item.icon && <item.icon className=" h-5 w-5" />}
                        {item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
