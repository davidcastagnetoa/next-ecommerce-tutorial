import Link from "next/link";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaCog, FaList } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { SlHome } from "react-icons/sl";
import { Divider } from "@geist-ui/core";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext"

export default function Nav() {
  const {data: session} = useSession();
  const { themeType } = useTheme();
  const inactiveLink = 'flex items-center gap-1 py-3 text-[#a0a0a0] hover:bg-blue-500 hover:text-white px-8';
  const activeLink = inactiveLink + ' bg-blue-500 text-white';
  const router = useRouter();
  const { pathname } = router;
  return (
    <aside className={`${ themeType === 'light' ? "bg-black" : "bg-[#181818]" } text-white`}>
      <Link href={"/"} className="flex items-center gap-1 m-4">
        <SiHomeassistantcommunitystore className="text-2xl mr-2" />
        <div className="flex flex-col">
          <span className="text-base">{session?.user?.name}</span>
          <span className="text-xs text-[#a0a0a0]">{session?.user?.email}</span>
        </div>
      </Link>
      <Divider style={{ background: "#6D6D6D" }} />
      <nav className="flex flex-col gap-0.5 ">
        <Link
          href={"/"}
          className={pathname === '/' ? activeLink : inactiveLink}
        >
          <SlHome className="mr-4" />
          Dashboard
        </Link>
        <Link
          href={"/products"}
          className={pathname.includes('/products') ? activeLink : inactiveLink}
        >
          <GoPackage className="mr-4" />
          Products
        </Link>
        <Link
          href={"/orders"}
          className={pathname.includes('/orders') ? activeLink : inactiveLink}
        >
          <FaList className="mr-4" />
          Orders
        </Link>
        <Link
          href={"/settings"}
          className={pathname.includes('/settings') ? activeLink : inactiveLink}
        >
          <FaCog className="mr-4" />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
