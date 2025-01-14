'use client'
import * as React from "react";

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
} from "@/components/ui/sidebar";
import {
  Droplet,
  HomeIcon,
  MessageSquareWarning,
  ReceiptText,
  Smartphone,
  User,
  UserRoundPen,
  LogOut,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { logoutActions } from "@/actions/login";
import { Button } from "./ui/button";


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
          title: "Customer List",
          url: "/customer",
          icon: User,
        },
        {
          title: "Billing",
          url: "/billing",
          icon: ReceiptText,
        },
        {
          title: "Water Usage",
          url: "/usage",
          icon: Droplet,
        },
        {
          title: "SMS Management",
          url: "/sms",
          icon: Smartphone,
        },
        {
          title: "Complaints",
          url: "/complaint",
          icon: MessageSquareWarning,
        },
        {
          title: "Add User",
          url: "/add", // Define the URL for user creation
          icon: UserPlus, // Import UserPlus icon from "lucide-react"
        },
        {
          title: "Profile",
          url: "/profile",
          icon: UserRoundPen,
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
          icon: Droplet,
        },
        {
          title: "Complaints",
          url: "/user/complaint",
          icon: MessageSquareWarning,
        },
        {
          title: "Profile",
          url: "/profile",
          icon: UserRoundPen,
        },
      ],
    },
  ],
  collectorNav: [
    {
      items: [
        {
          title: 'Home',
          url: '/collector',
          icon: HomeIcon,

        }
        , {
          title: "Billing",
          url: "/collector/billing",
          icon: ReceiptText,
        },
      ]
    }
  ],
  managerNav: [
    {
      items: [
        {
          title: "Home",
          url: "/manager",
          icon: HomeIcon,
          isActive: true,
        },

        {
          title: "Customer List",
          url: "/customer",
          icon: User,
        },
        {
          title: "Water Usage",
          url: "/usage",
          icon: Droplet,
        }, {
          title: "Complaints",
          url: "/complaint",
          icon: MessageSquareWarning,
        },
        {
          title: "Profile",
          url: "/profile",
          icon: UserRoundPen,
        },
      ]
    }
  ]
};

interface SidebarProps {
  role: string;
}

export function AppSidebar({
  role,
  ...props
}: SidebarProps & React.ComponentProps<typeof Sidebar>) {
  // Select the appropriate navigation data based on the role.
  const navData =
    role === "ADMIN"
      ? data.navMain
      : role === "MANAGER"
        ? data.managerNav
        : role === "COLLECTOR"
          ? data.collectorNav
          : data.customerNav;


  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="text-lg font-bold w-full text-center">
          {role === "ADMIN" ? "Admin Dashboard" : "Customer Dashboard"}
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
                    <SidebarMenuButton asChild >
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
      {/* Add a Logout button at the bottom */}
      <div className="mt-auto p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
            >
              <Button onClick={async () => { await logoutActions() }}>
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
