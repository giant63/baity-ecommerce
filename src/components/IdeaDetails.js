import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import { Image, Alert, Col, Thumbnail, Button, Modal,Row, Grid ,Carousel,Glyphicon} from "react-bootstrap";
import Loading from './Loading';
import styled from 'styled-components'
import FullHeart from '../assets/img/fullHeart.png';
import EmptyHeart from '../assets/img/emptyHeart.png';
import {MdAddShoppingCart,MdWeekend} from 'react-icons/lib/md';


const LikeDiv=styled.div`
position: absolute;
top:10%;
left: 60px;
font-size:40px;
@media only screen and (max-width: 767px) {
  font-size:20px;
}
`
const LikeIcon=styled(Glyphicon)`
cursor:pointer;
color:rgb(26,156,142);

`;
const UnLikeIcon=styled(Glyphicon)`
cursor:pointer;
color: transparent;
-webkit-text-stroke-width: 2px;
-webkit-text-stroke-color: rgb(75, 75, 75);
`;
const ImgGallaryThumb = styled.div`
  }
`;
const PrevImgGallaryThumb = styled.div`
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
 
  }
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

`;

const PaddingDiv = styled.div`
  padding-right: 10px;
  padding-top: 5px;
  padding-left: 0;
  padding-bottom: 5px;
`;
const ImageCol=styled(Col)`
border-left: 1.5px solid rgb(218, 218, 217);
@media only screen and (max-width: 991px) {
  border:none;
`;

class IdeaDetails extends Component {
  constructor(props) {
    super(props);
    this.ideaId = this.props.match.params.id;

    this.state = {
      idea: {},
      loading: true,
      errorHandling: {
        showError: false, errorMsg: 'error'
      },
      index: 0,
      liked: false
    };
  }

  componentWillMount() {
    this.thumbImage.bind(this);
    this.ideasRef = base.syncState(`${FirebaseServices.IDEAS_PATH}/${this.ideaId}`, {
      context: this,
      state: 'idea',
      then(data) {
        if (this.props.authenticated) {
          this.userLikesRef = FirebaseServices.readDBRecord('likes', `${this.props.currentUser.uid}/ideas/${this.productId}`)
          .then(val => {
            if (val) {
              this.setState({liked: true, loading: false})
            }else {
              this.setState({liked: false, loading: false})
            }
          })
        }else {
          this.setState({loading: false})
        }
      },
      onFailure(error) {
      this.setState({errorHandling: {showError: true, errorMsg: error}});
      }
    });
  }

  componentWillUnmount() {
    this.ideasRef && base.removeBinding(this.ideasRef);
    this.userLikesRef && base.removeBinding(this.userLikesRef);
  }

  nextImage(){
    if (this.state.index < this.state.idea.images.length - 1)
      this.setState({index: (this.state.index + 1)});
  }

  prevImage(){
    if (this.state.index > 0)
      this.setState({index: (this.state.index - 1)});
  }
  thumbImage(thumbIndex){
    this.setState({index: thumbIndex});
  }

  like(){
    if (this.props.authenticated) {
      const userLikes = FirebaseServices.likes
      const currentUserRef = userLikes.child(`${this.props.currentUser.uid}/ideas`)
      const ideaRef = FirebaseServices.ideas.child(this.ideaId)

      return ideaRef.transaction((post) => {
        console.log("Idea detailes - transaction()")
        console.log(post)
        if (post) {
          currentUserRef.child(post.id).once('value', (snap) => {
          if (snap.val()) {

            post.likes--;
            currentUserRef.child(post.id).set(null);
            this.setState({liked: false})
          } else {
            post.likes++;
            //console.log(userLikes.child(currentUserId).child(post.id));
            currentUserRef.child(post.id).set(post.postType);
            this.setState({liked: true})
          }
        })
        }
        return post;
      });
    }
  }

  render() {

    const idea = this.state.idea;

    if (this.state.loading && !this.state.errorHandling.showError)
    return <Loading />;
  if (this.state.errorHandling.showError)
    return (
      <div>
        <Modal show={true} style={{ top:-100 }}>
          <Modal.Header>حدث خطأ غير معروف</Modal.Header>
          <Modal.Body>

              <Alert bsStyle="danger">
                {this.state.errorHandling.errorMsg.message}
              </Alert>
              <Link to="/">
              <Button>العودة للصفحة الرئيسية</Button>
              </Link>
          </Modal.Body>
        </Modal>
      </div>
    );
  if (!this.state.loading && !this.state.showError)
      return(

        <Grid >
          <Row style={{display: 'flex', flexWrap: 'wrap'}} className="productdetails">
             <ImageCol  xs={12} sm={12} md={8} lg={9}  style={{padding:'0'}}>
            <Carousel    indicators={false} wrap={false}>
             <Carousel.Item> 
               <ImageContainer>   
            <ImageDiv > 
            <PreviewImg src={idea.images[this.state.index].large}/> 
            </ImageDiv>            
            </ImageContainer>
            <Glyphicon  className ="leftglyphicon" onClick={this.nextImage.bind(this)} glyph="chevron-left"/>
             <Glyphicon className="rightglyphicon" onClick={this.prevImage.bind(this)} glyph="chevron-right"/>
           <LikeDiv>
              {this.state.liked
              ? <LikeIcon glyph="heart"  onClick={this.like.bind(this)}/>
              : <UnLikeIcon glyph="heart"  onClick={this.like.bind(this)}/>
              }
         </LikeDiv>
              </Carousel.Item>
            </Carousel >
            <div className="product-slider">
              <div id="thumbcarousel1" className="carousel1 slide" >
                <ImgGallaryThumb className="item">
                  {idea.images.map((obj, index) => {
                    return <PrevImgGallaryThumb className="thumb " >
                             <Image src={obj.large} onClick={() => { return this.setState({index: index})}}/>
                          </PrevImgGallaryThumb>   
                         })}  
                </ImgGallaryThumb> 
              </div>
           </div>
            </ImageCol> 
            <Col  xs={12} sm={12} md={4} lg={3}  style={{padding :'0 5px 0 0'}}>
            <h4><MdWeekend className="icons" style={{color:'rgb(26,156,142)'}}/>{idea.name}</h4>
            <hr/>
            <button type="submit">
               للتواصل
               <MdAddShoppingCart className="icons" style={{marginRight:'20px'}}/></button>
           
            <PaddingDiv>
            <h4>وصف الفكرة</h4>
              <p > {idea.desc}</p>
              </PaddingDiv>
              <PaddingDiv>
            <p>
              {/* only idea owner can update a idea */}
              {
                this.props.authenticated
                ?this.props.currentUser.uid === this.state.idea.owner
              ?<Link to={`/ideas/${idea.id}/updateIdea`}>
                <button >
                  تحديث بيانات الفكرة
                </button>
              </Link>
                : null
              : null

              }
            </p>
            </PaddingDiv>
          <Col xs={1} sm ={1} md={1} lg={1} style={{backgroundColor: '#f4f4f4'}}>
            
          </Col>
            </Col>
            </Row>
            </Grid> 



    );
  }
}


export default IdeaDetails;