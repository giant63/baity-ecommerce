import React, { Component } from "react";
import { Grid, Modal,Col,Row, Image } from "react-bootstrap"
import { Link } from "react-router-dom";
import firebase from "firebase";
import { app, base, database, storage } from "../base";
import FirebaseServices from './FirebaseServices';
import livingroom from '../assets/img/livingroom.jpg';
import styled from 'styled-components'
import Loading from "./Loading";
import logo_placeholder from '../assets/img/logo-placeholder.jpg';
import {TiSocialTwitter,TiSocialInstagram,TiSocialFacebook} from 'react-icons/lib/ti';
import {MdSettings} from 'react-icons/lib/md';

const SettingtButton = styled.button`
@media only screen and (max-width: 767px) {
  height: 30px;
`;
const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
 
`;
const ImageCol=styled(Col)`
height:400px;
padding:0;
@media only screen and (max-width: 767px) {
  height:250px;
  }
`;
const UserImg=styled.img`
width: 150px;
height: 150px;
border-radius: 50%;
margin-top: -75px ;
@media only screen and (max-width: 767px) {
width: 80px;
height: 80px;
margin-top: -40px ;
}`
const SocialDiv = styled.div`
text-align:center;
font-size:15px;
color:rgb(95,96,93);
padding-top:10px;
@media only screen and (max-width: 767px) {
  font-size:10px;}
`

class NormalProfileInfo extends Component{
  constructor(){
    super();

    this.state = {
      profile: {},
      loading: true,
      errorHandling: {
        showError: false,
        errorMsg: "error"
      }
    };
  }

  componentWillMount(){

    FirebaseServices.readDBRecord('normalUser', this.props.currentUser.uid)
      .then(value => this.setState({
        loading: false,
        profile: value
    })
  )

  }

  componentWillUnmount(){
  }

  render(){
    return(
   
      <Grid style={{backgroundColor:"white"}}>
      <Row  style={{display: 'flex', flexWrap: 'wrap'}}>
        <ImageCol sm={12}  lg={12}>
          <PreviewImg  src={livingroom}     />
          <div style={{position: 'absolute',top: '10px',left: '20px',width:'25%'}}>
            <Link to={`/updateprofile/`}>
              <SettingtButton>الاعدادات <MdSettings className="icons"/></SettingtButton>
            </Link>
          </div>
        </ImageCol>
        <Col xs={12}  lg={12}  >
        <Col xs={3} sm={2} md={2} lg={2} style={{padding:'0'}}>
        <SocialDiv >
        <TiSocialTwitter className="icons"/>
        <TiSocialInstagram className="icons"/> 
       <TiSocialFacebook className="icons"/>
   </SocialDiv>        </Col>
        <Col xs={6} sm={6} md={7}lg={7} style={{padding:'0'}}>
          <h4 style={{color:'rgb(26,156,142)'}}>{this.state.profile.name}</h4>
          <h5>{this.state.profile.city} ،السعودية</h5>
        </Col>
        <Col xs={3} sm={4} md={3} lg={3} style={{paddingRight:'0'}}>
        {this.state.profile.imgUrl
        ? <UserImg  src={this.state.profile.imgUrl}  />
        : <UserImg src={logo_placeholder} />
        }
      </Col>
        </Col>
      </Row>
      <hr/>
      </Grid>
   
    )
  }
}

export default NormalProfileInfo;