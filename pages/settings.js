import Layout from "@/components/Layout";
import { useAppTheme, useTheme } from "@/contexts/ThemeContext";
import { CssBaseline, GeistProvider } from "@geist-ui/core";

export default function Settings() {
  const { themeType } = useAppTheme();
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>
          <div
            className={`${themeType === "light" ? "text-black" : "text-white"}`}
          >
            settings
          </div>
        </Layout>
      </CssBaseline>
    </GeistProvider>
  );
}
