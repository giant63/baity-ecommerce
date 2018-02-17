import React, { Component } from "react";
import { Grid, Modal,Col,Row, Image } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { app, base, database, storage } from "../base";
import FirebaseServices from './FirebaseServices'
import livingroom from '../assets/img/livingroom.jpg';
import styled from 'styled-components'
import Loading from "./Loading";
import logo_placeholder from '../assets/img/logo-placeholder.jpg';
import {TiSocialTwitter,TiSocialInstagram,TiSocialFacebook} from 'react-icons/lib/ti';
import {MdCall,MdSettings} from 'react-icons/lib/md';
import {GoSignOut} from 'react-icons/lib/go';


const SettingtButton = styled.button`
@media only screen and (max-width: 767px) {
  height: 30px;
`;
const LogoutButton = styled.button`
width:100%px;
height: 30px;
padding:  0;
background-color:transparent;
border:1px solid rgb(26, 156, 142); 
color:rgb(26, 156, 142);
@media only screen and (max-width: 767px) {
  height: 30px;
  width: 100%;
  font-size:10px;
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

}
`
const UserNameDiv = styled.div`
display:inline-block;
padding-right:3px;
`;
const SocialDiv = styled.div`
text-align:center;
font-size:15px;
color:rgb(95,96,93);
@media only screen and (max-width: 767px) {
  font-size:10px;}
`

class ProfileInfo extends Component{
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
    FirebaseServices.getProfessionalUserBusinessId(this.props.currentUser.uid,
      (businessId) => {
        if (businessId === '') {
          this.setState({ errorHandling: { showError: true, errorMsg: {message:'خطأ داخلي: لم يتم العثور على الشركة '} } });
        } else {
          this.bussRef = base.syncState(`${FirebaseServices.BUSINESSES_PATH}/${businessId}`, {
            context: this,
            state: "profile",
            then(data) {
              this.setState({ loading: false });
            },
            onFailure(error) {
              this.setState({ errorHandling: { showError: true, errorMsg: error } });
            }
          })
        }//else
    }, (error) => {
      this.setState({ errorHandling: { showError: true, errorMsg: error } });
    });
  }

  componentWillUnmount(){
    this.bussRef && base.removeBinding(this.bussRef);
  }

  render(){
    return(
      <Grid style={{backgroundColor:"white"}}>
      <Row  style={{display: 'flex', flexWrap: 'wrap'}}>
        <ImageCol sm={12}  lg={12}>
          <PreviewImg  src={livingroom}     />
          <div style={{position: 'absolute',top: '10px',left: '30px',width:'25%'}}>
            <Link to={`/myprofprofile/`}>
              <SettingtButton>الاعدادات <MdSettings className="icons"/></SettingtButton>
            </Link>
          </div>
        </ImageCol>
        <Col xs={12}  lg={12} >
        <Col xs={3} sm={2} md={2} lg={2} style={{padding:'0'}}>
        <LinkContainer to="/logout" >
        <LogoutButton> تسجيل خروج <GoSignOut className="icons"/></LogoutButton>
             </LinkContainer>
         <SocialDiv >
              <TiSocialTwitter className="icons"/>
              <TiSocialInstagram className="icons"/> 
             <TiSocialFacebook className="icons"/>
         </SocialDiv>
        </Col>
        <Col xs={6} sm={6} md={7}lg={7} style={{padding:'0'}}>
        <UserNameDiv> <h4 style={{color:'rgb(26,156,142)'}}>{this.state.profile.businessName} </h4> </UserNameDiv>
         <UserNameDiv ><h5>{this.state.profile.types}</h5></UserNameDiv>
          <h5 style={{marginTop:'0'}}>{this.state.profile.city}، السعودية</h5>
        </Col>  
          <Col xs={3} sm={4} md={3} lg={3} style={{paddingRight:'0'}}>
        {this.state.profile.imgUrl
        ? <UserImg  src={this.state.profile.imgUrl}  />
        : <UserImg  src={logo_placeholder} />
        }
      </Col>
      </Col>
    </Row>
    <hr/>
    </Grid>
    )
  }
}

export default ProfileInfo;