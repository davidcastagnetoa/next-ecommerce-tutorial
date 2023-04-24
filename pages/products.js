import Layout from "@/components/Layout";
import { useAppTheme } from "@/contexts/ThemeContext";
import {
  Button,
  CssBaseline,
  GeistProvider,
  Link,
  Spacer,
  Table,
} from "@geist-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Edit, Trash2 } from "@geist-ui/icons";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  const renderAction = (value, rowData, index) => {
    const removeHandler = () => {
      setProducts((last) => last.filter((_, dataIndex) => dataIndex !== index));
    };

    return (
      <Button
        type="error"
        auto
        scale={1 / 2}
        onClick={removeHandler}
        px={0.6}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Trash2 size={18} />
      </Button>
    );
  };

  const { themeType } = useAppTheme();
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline>
        <Layout themeType={themeType}>
          <Button type="default">
            <Link href={"/products/new"}>Add new product.</Link>
          </Button>
          <Spacer/>
          <Table data={products}>
            <Table.Column prop="title" label="title" />
            <Table.Column prop="description" label="description" />
            <Table.Column prop="price" label="price" />
            <Table.Column
              label="Editar"
              render={(value, product) => (
                <Link href={`/products/edit/${product._id}`}>
                  <Button
                    type="success"
                    auto
                    scale={2 / 3}
                    font="13px"
                    px={0.6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                </Link>
              )}
            />
            <Table.Column
              prop="operation"
              label="Eliminar"
              width={150}
              // render={renderAction}
              render={(value, product) => (
                <Link href={`/products/delete/${product._id}`}>
                  <Button
                    type="error"
                    auto
                    scale={2 / 3}
                    font="13px"
                    px={0.6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                </Link>
              )}
            />
          </Table>
        </Layout>
      </CssBaseline>
    </GeistProvider>
  );
}

// Link={href={'/products/'+products.id}}
