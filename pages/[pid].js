import fs from "fs/promises";
import path from "path";

function ProductDetailsPage(props) {
  const { selectedProduct } = props;

  return (
    <>
      <h2>{selectedProduct.title}</h2>
      <p>{selectedProduct.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid; // get the product id from the url (file Name is the product id)
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonDate = await fs.readFile(filePath);
  const data = JSON.parse(jsonDate);

  const product = data.products.find((product) => product.id === productId);
  return {
    props: {
      selectedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } }, // pid is a file name [pid].js
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
      { params: { pid: "p4" } },
      { params: { pid: "p5" } },
    ],
    fallback: false,
  };
}

export default ProductDetailsPage;
