import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import Product from "../components/Product";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  // Will run on Page Load
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };

    fetchProduct();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default HomePage;
