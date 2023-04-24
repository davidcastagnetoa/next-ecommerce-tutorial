import Layout from "@/components/Layout";
import { useTheme, Text, Button } from "@geist-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";

export default function EditProductPage() {
  const { themeType } = useTheme();
  const router = useRouter();
  console.log({ router });
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("api/products?id=" + id).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <Layout themeType={themeType}>
      <Text p>edit product here</Text>
      <Button>Access</Button>
    </Layout>
  );
}