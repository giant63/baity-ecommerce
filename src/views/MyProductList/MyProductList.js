import React from "react";
import ProductList from "components/ProductList";
import styled from 'styled-components'
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from 'assets/img/Selected-product.png';


const IconImg = styled.img`
width:40px;
 height:40px;`


const Button = styled.button`
position:absolute;
top:50px;
left: 20px;
width: 17%;
height: 40px;
@media only screen and (max-width: 767px) {
  left: 20px;
  top:70px;
  width: 40%;
  height: 30px;
`;

function MyProdutList(props) {
  return (
    <Grid style={{ backgroundColor: "white" }}>
      <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col xs={12} lg={12} >
          <div style={{ height: '100px' }}>
            <h1 style={{ color: 'rgb(26,156,142)' }}> <IconImg src={Product} className="icons" /> منتجاتي</h1>
            <Link to={`/newproduct/`}>
              <Button>اضافةمنتج</Button>
            </Link>
          </div>
          <hr style={{ marginBottom: '30px' }} />
        </Col>
        <Col xs={12} lg={12} style={{ padding: '0' }} >
          <ProductList thisUserOnly={true} currentUser={props.currentUser} />
        </Col>
      </Row>
    </Grid>
  );
}
export default MyProdutList;