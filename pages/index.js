import Layout from "@/components/Layout";
import { useAppTheme, useTheme } from "@/contexts/ThemeContext";
import { Button, User, CssBaseline, GeistProvider } from "@geist-ui/core";
import { LogOut, Sun, Moon } from "@geist-ui/icons";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const { themeType, switchThemes } = useAppTheme();
  console.log({ session });

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>
          <div
            className={`${
              themeType === "light" ? "text-black" : "text-white"
            } flex justify-between`}
          >
            Hello, {session?.user?.name}
            <div className="space-x-1">
              <User src={session?.user?.image} name={session?.user?.name}>
                {session?.user?.email}
              </User>
              {/* Day/night Mode */}
              <Button
                iconRight={themeType === "light" ? <Moon /> : <Sun />}
                onClick={switchThemes}
                auto
                type="secondary"
                px={0.6}
              ></Button>
              {/* LogOut */}
              <Button
                icon={<LogOut />}
                onClick={() => signOut()}
                auto
                ghost
                type="default"
                px={0.6}
              ></Button>
            </div>
          </div>
        </Layout>
      </CssBaseline>
    </GeistProvider>
  );
}
