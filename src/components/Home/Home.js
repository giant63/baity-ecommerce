import React, { Component } from "react";
import { app, base } from "../../base";
import { Image, Carousel, Panel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ProductList from '../ProductList';
import traditionalkitchen from 'assets/img/traditionalkitchen.jpg';
import bedroom from 'assets/img/bedroom.jpg';
import livingroom from 'assets/img/livingroom.jpg';
import styled from 'styled-components'
import { CBrief } from "../ProductBrief";
import CaroselImg from 'assets/img/CaroselImg.jpg';
import CarouselBanner from 'components/CarouselBanner';

import './styles.css'


const PreviewImg = styled.img`
width: 100%;
height: 100%;
@media only screen and (min-width: 1400px) {
min-height: 700px; 
margin-top:-30px;
margin-bottom: 0 ;}

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
height: 100%;
height:395px;

`;
const Button = styled.button`
width:30%;
height:60px;
margin-top:30px;
font-size: 35px;
@media only screen and (max-width: 767px) {
width:45%;
height:40px;
font-size: 25px;
margin-top:20px;
}
`
export class Home extends Component {

  render() {
    return (
      <div>
        <div >
          {
            this.props.authenticated ?
              ''
              :
              <CarouselBanner />
          }
        </div>
        <div className='container carousel-containter-block'>
          <div className='carousel-containter carousel-1'>
            {/* <CarouselBanner {...{ category: 'product', banner: 'true', title: 'اختر منتجات منزلك' }} /> */}
          </div>
          <div className='carousel-containter carousel-2'>
            {/* <CarouselBanner {...{ category: 'idea', banner: 'true', title: "اكتشف تصاميم مبتكرة" }} /> */}
          </div>
        </div>
        <ProductList thisUserOnly={false} />
      </div>

    );
  }
}

export default Home;
