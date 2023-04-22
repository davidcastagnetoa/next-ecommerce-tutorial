import Layout from "@/components/Layout";
import { useTheme } from "@/contexts/ThemeContext";

export default function Orders() {
  const { themeType } = useTheme();
  return (
    <Layout>
      <div className={`${themeType === "light" ? "text-black" : "text-white"}`}>
        orders
      </div>
    </Layout>
  );
}
