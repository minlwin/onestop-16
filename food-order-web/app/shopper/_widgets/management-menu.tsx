import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ChefHatFreeIcons, ClockAlertIcon, Dish02FreeIcons, ShoppingBag02Icon, Tag02FreeIcons, TruckDeliveryFreeIcons, UserAiFreeIcons, UserCheck02FreeIcons, Wallet02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import Link from "next/link";

export function ManagementMenu() {
    return (
        <Sidebar variant="sidebar">
            <SidebarHeader>
                <div className="flex gap-2 mt-2">
                    <div className="flex items-center justify-center bg-orange-400 rounded-xl px-4">
                        <HugeiconsIcon icon={ChefHatFreeIcons} color="white" />
                    </div>
                    <div>
                        <h1 className="text-2xl">Welcome</h1>
                        <h3>Management User</h3>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {MENUS.map((group, index) => 
                    <SidebarGroup key={index}>
                        <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.menus.map((item, itemIndex) => 
                                    <SidebarMenuItem key={`${index}-${itemIndex}`}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.link}>
                                                <HugeiconsIcon icon={item.icon} /> {item.name}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
            </SidebarContent>
        </Sidebar>
    )
}


type MenuGroup = {
    name : string
    menus : MenuItem []
}

type MenuItem = {
    name: string
    icon: IconSvgElement
    link: string
}

const MENUS : MenuGroup[] = [
    {
        name: "Management",
        menus: [
            {
                name : 'Order Management',
                icon : ShoppingBag02Icon,
                link: ''
            },
            {
                name : 'Delivery Management',
                icon : TruckDeliveryFreeIcons,
                link: ''
            }

        ]
    },
    {
        name: "Master Data",
        menus: [
            {
                name : 'Category Master',
                icon : Tag02FreeIcons,
                link: ''
            },
            {
                name : 'Cuisine Master',
                icon : Dish02FreeIcons,
                link: ''
            },
            {
                name : 'Delevery Times',
                icon : ClockAlertIcon,
                link: ''
            },
            {
                name : 'Payment Information',
                icon : Wallet02FreeIcons,
                link: ''
            }


        ]
    },    {
        name: "Accounts",
        menus: [
            {
                name : 'Customers',
                icon : UserAiFreeIcons,
                link: ''
            },
            {
                name : 'Employee',
                icon : UserCheck02FreeIcons,
                link: ''
            }

        ]
    },

];
