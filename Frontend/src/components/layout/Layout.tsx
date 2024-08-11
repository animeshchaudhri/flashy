import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/navbar/Sidebar";
import { UserButton, useUser } from "@clerk/clerk-react";
import { cn } from "../../utils/helpers";
import { Logo, LogoIcon } from "../ui/common/Logo";

import {
  IconArrowLeft,
  IconBrandTabler,
  IconCards,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Links } from "../../types/globals";
import { useAuth } from "../../hooks/useAuth";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isSignedIn, user } = useUser();
  const [open, setOpen] = useState(false);
  const { role } = useAuth();

  let links: Links[] = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Cards",
      href: "/Cards",
      icon: (
        <IconCards className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Scores",
      href: "/result",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  if (role === "admin") {
    links.push({
      label: "Admin",
      href: "/admin",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    });
  }

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 ",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 ">
          {open ? <Logo /> : <LogoIcon />}

          <div className=" flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>

          <div>
            {isSignedIn && (
              <SidebarLink
                link={{
                  label: user?.fullName ?? "",
                  href: "/",
                  icon: <UserButton />,
                }}
              />
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="p-2 md:p-10 rounded-tl-2xl border z-10 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
