import { Button } from "@geist-ui/core";
import { useSession, signIn } from "next-auth/react";
import { IoLogoGithub, IoLogoGoogle } from "react-icons/io";
import Nav from "@/components/Nav";
import { useTheme } from "@/contexts/ThemeContext";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const { themeType } = useTheme();
  console.log(session);

  if (!session) {
    return (
      <div className="bg-[#1b1b1b] w-screen h-screen flex items-center">
        <div className="text-center w-full flex flex-col items-center space-y-2">
          <Button
            icon={<IoLogoGithub />}
            auto
            type="secondary"
            style={{ width: "11.5rem", borderColor: "transparent" }}
            onClick={() => signIn("github")}
          >
            Login with Github
          </Button>
          <Button
            icon={<IoLogoGoogle />}
            auto
            type="secondary"
            style={{ width: "11.5rem", borderColor: "transparent" }}
            onClick={() => signIn("google")}
          >
            Login with Google
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="text-white w-screen min-h-screen flex font-titillium">
      <Nav session={session} />
      <div
        className={`${
          themeType === "light" ? "bg-white" : "bg-black"
        } flex-grow mr-2 p-4`}
      >
        {children}
      </div>
    </div>
  );
}
