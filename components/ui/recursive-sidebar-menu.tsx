import React from 'react';
import SidebarLink from './sidebar-link';
import SidebarLinkGroup from './sidebar-link-group';

// Type for individual menu item (Link)
interface MenuItem {
    title: string;
    children?: MenuItem[];
    route?: string;
    conditionRoute?: string;
    icon?: React.ReactNode;
}

// Props for RecursiveSidebarMenu component
interface RecursiveSidebarMenuProps {
    links: MenuItem[];  // Array of menu items
    newPathName: string; // Current URL path
    expandOnly: boolean; // Flag to control sidebar expansion behavior
    setSidebarExpanded: (expanded: boolean) => void; // Function to set sidebar expanded state
}

// Recursive function to render menu items
const RecursiveSidebarMenu: React.FC<RecursiveSidebarMenuProps> = ({
    links,
    newPathName,
    expandOnly,
    setSidebarExpanded,
}) => {

    // Function to render menu items recursively
    const renderMenuItems = (menuItems: MenuItem[], level: number = 0) => {
        return menuItems.map(
            ({ title, children, route = "", conditionRoute = '', icon }, index) => {
                const isOpen = newPathName.includes(conditionRoute);

                // Render regular link
                if (route !== "#") {
                    const isOpen = newPathName === route || newPathName.startsWith(route);
                    return (
                        <li
                            className={`pl-2 py-1.5 rounded-sm last:mb-0 group is-link-group ${isOpen ? "text-indigo-600" : ""}`}
                            key={`${title}-${index}-${level}`}
                        >
                            <SidebarLink href={route}>
                                <div className="flex items-center gap-3">
                                    {icon}
                                    <span
                                        className={`text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${isOpen ? "text-indigo-600" : ""}`}
                                    >
                                        {title}
                                    </span>
                                </div>
                            </SidebarLink>
                        </li>
                    );
                }

                // Render group (with potential nested items)
                return (
                    <SidebarLinkGroup open={isOpen} key={`${title}-${index}-${level}`}>
                        {(handleClick, open) => {
                            return (
                                <>
                                    <a
                                        href="#0"
                                        className={`block text-slate-200 truncate transition duration-150 ${isOpen ? "hover:text-slate-200" : "hover:text-white"}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            expandOnly ? setSidebarExpanded(true) : handleClick();
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                {icon}
                                                <span
                                                    className={`text-sm font-medium ${icon ? "ml-3" : ""} lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${isOpen ? "text-indigo-600" : "text-slate-400 hover:text-slate-200"}`}
                                                >
                                                    {title}
                                                </span>
                                            </div>
                                            <div className="flex shrink-0 ml-2 mr-1.5">
                                                <svg
                                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && "rotate-180"} ${isOpen ? "fill-indigo-600" : ""}`}
                                                    viewBox="0 0 12 12"
                                                >
                                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>

                                    {!!children?.length && (
                                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                            <ul className={`${icon ? "pl-9":""} mt-1 ${!open && "hidden"}`}>
                                                {renderMenuItems(children, level + 1)}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            );
                        }}
                    </SidebarLinkGroup>
                );
            }
        );
    };

    return (
        <div>
            {links.map(({ title, children }, index) => {
                return (
                    <div key={`${title}-${index}`}>
                        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                            <span
                                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                                aria-hidden="true"
                            >
                                •••
                            </span>
                            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                {title}
                            </span>
                        </h3>
                        <ul className="mt-3">
                            {renderMenuItems(children || [], 0)}  {/* Ensure children is always an array */}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default RecursiveSidebarMenu;
