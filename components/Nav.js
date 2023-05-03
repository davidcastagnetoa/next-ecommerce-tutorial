import Link from "next/link";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaCog, FaList } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { MdCategory } from "react-icons/md";
import { SlHome } from "react-icons/sl";
import { Divider } from "@geist-ui/core";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useAppTheme  } from "@/contexts/ThemeContext"

export default function Nav() {
  const {data: session} = useSession();
  const { themeType } = useAppTheme ();
  const inactiveLink = themeType === 'light' ? "text-black "  + 'flex items-center gap-1 py-3 text-[#a0a0a0] hover:bg-[#999] hover:text-white px-8' : "text-white " + 'flex items-center gap-1 py-3 text-[#a0a0a0] hover:bg-[#444] hover:text-white px-8';
  const activeLink = themeType === 'light' ? inactiveLink + ' bg-[#999] text-white' : inactiveLink + ' bg-[#444] text-white';
  const router = useRouter();
  const { pathname } = router;
  return (
    <aside className={`${ themeType === 'light' ? "bg-white" : "bg-black" } text-white`}>
      <Link href={"/"} className="flex items-center gap-1 m-4">
        <SiHomeassistantcommunitystore className="text-2xl mr-2" />
        <div className="flex flex-col">
          <span className={`${ themeType === 'light' ? "text-black" : "text-[#888888]" } text-base `}>{session?.user?.name}</span>
          <span className={`${ themeType === 'light' ? "text-black" : "text-[#888888]" } text-xs `}>{session?.user?.email}</span>
        </div>
      </Link>
      <Divider style={{ background: themeType === 'light' ? '#eaeaea' : '#333333' }} />

      <nav className="flex flex-col gap-0 ">
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
          href={"/categories"}
          className={pathname.includes('/categories') ? activeLink : inactiveLink}
        >
          <MdCategory className="mr-4" />
          Categories
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
