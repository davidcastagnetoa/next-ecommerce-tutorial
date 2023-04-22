import Layout from "@/components/Layout";
import { useTheme } from "@/contexts/ThemeContext";

export default function Settings() {
  const { themeType } = useTheme();
  return (
    <Layout>
      <div className={`${themeType === "light" ? "text-black" : "text-white"}`}>
        settings
      </div>
    </Layout>
  );
}
