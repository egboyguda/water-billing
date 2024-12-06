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
import { Droplet, HomeIcon, MessageSquareWarning, ReceiptText, Smartphone, User, UserRoundPen } from 'lucide-react'
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
          url: "/billing",
          icon: ReceiptText
        },
        {
          title: "Water Usage",
          url: "/usage",
          icon: Droplet
        },
        {
          title: "Sms Management",
          url: "",
          icon: Smartphone
        },
        {
          title: 'Complaints',
          url: "/complaint",
          icon: MessageSquareWarning
        },
        {
          title: "Profile",
          url: "#",
          icon: UserRoundPen
        },


      ],
    },

  ],
  customerNav: [
    {
      items: [
        {
          title: "Home",
          url: "/user",
          icon: HomeIcon,
          isActive: true,
        },
        {
          title: "Billing",
          url: "/user/billing",
          icon: ReceiptText,

        },
        {
          title: "Water Usage",
          url: "/user/usage",
          icon: Droplet
        },
        {
          title: "Complaints",
          url: "/user/complaint",
          icon: MessageSquareWarning
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
interface SidebarProps {

  role: string

}
export function AppSidebar({ role, ...props }: SidebarProps & React.ComponentProps<typeof Sidebar>) {
  // Select the appropriate navigation data based on the role.
  const navData = role === 'ADMIN' ? data.navMain : data.customerNav;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="text-lg font-bold w-full text-center">
          {role === 'admin' ? 'Admin Dashboard' : 'Customer Dashboard'}
        </h1>
      </SidebarHeader>
      <SidebarContent>
        {/* Render the SidebarGroup for the selected navigation data. */}
        {navData.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>
                        {item.icon && <item.icon className="h-5 w-5" />}
                        {item.title}
                      </Link>
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
  );
}
