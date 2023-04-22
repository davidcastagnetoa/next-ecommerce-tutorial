import Layout from "@/components/Layout";
import { useTheme } from "@/contexts/ThemeContext";
import { CssBaseline, GeistProvider } from "@geist-ui/core";

export default function Orders() {
  const { themeType } = useTheme();
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>
          <div
            className={`${themeType === "light" ? "text-black" : "text-white"}`}
          >
            orders
          </div>
        </Layout>
      </CssBaseline>
    </GeistProvider>
  );
}
