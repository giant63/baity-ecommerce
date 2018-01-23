import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import { Image, Col, Thumbnail, Button, Card, Row } from "react-bootstrap";
import Equalizer from "react-equalizer";
import styled from 'styled-components'


const PaddingDiv = styled.div`
  padding-right: 20px;
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
`

const MyThumbnailDiv = styled.div`
  position: relative;
  background-color: #fff;
  transform: scale(1, 1);
  transition: transform 1s ease;
  margin-bottom: 50px;
  &:hover{
    box-shadow:0px 0px 10px #6A6A6A;
    border:1px solid #6A6A6A;
    transition:all 0.5s ease-in-out;
    transform: scale(1.05, 1.05);
  }
`
// .mythumbnail .caption {
  // padding: 0px;
  // color: #888; 
  // }

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageDiv = styled.div`
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;
class ProductBrief extends Component {
  constructor() {
    super();
    // this.updateproduct = this.updateproduct.bind(this);
    this.state = {
      product: {}
    };
  }

  //src="http://via.placeholder.com/243x243"
  render() {
    const product = this.props.product;
    return (
<<<<<<< HEAD
      <Col xs={12} md={4} sm={6} style={{paddingBottom: "20px"}} >
      <div className="mythumbnail" >
           <div >
          
          <Link to={`/products/${product.id}`} >
              {/* <img id="middle" src={product.imgUrl} className="img-responsive"/> */}
              <img   src="http://via.placeholder.com/243x243"
              style={{width: "100%", height: 'auto' }} className="img-responsive "/>
              </Link>
              </div>
             
              <div className="padding" >
              <Link to={`/products/${product.id}`}>

              <h4 > {product.name} </h4>
              </Link>
            <p>{product.desc}</p>
            </div>
            </div>  
          
=======
      <Col xs={12} md={4} sm={6} >
        <MyThumbnailDiv>
          <ImageContainer>
            <ImageDiv>
            <Link to={`/products/${product.id}`}>
              <PreviewImg
                src={
                  product.images
                    ? product.images[0].large
                    : "http://via.placeholder.com/243x243"
                }
                                
              />
              {/* <img   src="http://via.placeholder.com/243x243" */}
            </Link>
            </ImageDiv>
          </ImageContainer>

          <PaddingDiv>
            <Link to={`/products/${product.id}`}>
              <h4> {product.name} </h4>
            </Link>

            <p className="flex-text text-muted">{product.desc}</p>
          </PaddingDiv>
        </MyThumbnailDiv>
>>>>>>> 81f2b6ddee022415f3cdf2c1a86d6492e43dc8b8
      </Col>
    );
  }
}

export default ProductBrief;
