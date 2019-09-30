import React, { Component } from 'react';
import {
  MDBJumbotron,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardText
} from 'mdbreact';

import { isAdmin, auth } from '../lib/auth';
import { IPhoto } from '../lib/interface/types';
import { getPicture, likePicture, deletePicture } from '../lib/api';

class Pictures extends Component {
  state = {
    picture: []
  };
  handleDelete = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    photoId: string
  ) => {
    event.preventDefault();

    deletePicture(photoId)
      .then(res => {
        const updatedPicture = this.state.picture.filter((picture: IPhoto) => {
          return picture._id !== photoId;
        });

        this.setState({
          picture: [...updatedPicture]
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleLike = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    photoId: string
  ) => {
    event.preventDefault();

    likePicture(photoId).then(res => {
      let updatePicture: IPhoto[] = [...this.state.picture];
      if (res.data.caption) {
        this.state.picture.find((photo: IPhoto, i: number) => {
          if (photo._id === photoId) {
            updatePicture[i] = res.data;

            this.setState({
              picture: [...updatePicture]
            });
          }
        });
      }
    });
  };

  componentDidMount() {
    getPicture()
      .then(res => {
        this.setState({ picture: [...res.data] });
      })
      .catch(e => {
        console.log('ERRRROR', e);
      });
  }

  render() {
    return (
      <React.Fragment>
        <MDBJumbotron className='mb-5' style={{ marginTop: 3.5 + 'rem' }} fluid>
          <MDBContainer>
            <h2 className='display-4'>Fluid jumbotron</h2>
            <p className='lead'>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </MDBContainer>
        </MDBJumbotron>
        <MDBContainer>
          <MDBRow>
            {this.state.picture.length ? (
              this.state.picture.map((picture: IPhoto) => {
                return (
                  <MDBCol md='4' className='mb-4' key={picture._id}>
                    <MDBCard className='mb-2' style={{ height: 450 + 'px' }}>
                      <MDBCardImage
                        className='img-fluid w-100 border'
                        style={{ minHeight: 400 + 'px' }}
                        src={picture.url}
                      />
                      <MDBCardBody>
                        <MDBCardText>{picture.caption}</MDBCardText>
                        <span className='d-flex justify-content-between'>
                          <span onClick={e => this.handleLike(e, picture._id)}>
                            <i
                              className='fa fa-heart mr-1'
                              style={{ color: 'red' }}
                            ></i>
                            <span
                              className='text-muted'
                              style={{ fontSize: '0.8rem' }}
                            >
                              ({picture.likes})
                            </span>
                          </span>
                          {isAdmin() ? (
                            <span
                              onClick={e => this.handleDelete(e, picture._id)}
                            >
                              <i
                                className='fa fa-trash mr-1'
                                style={{ color: 'red' }}
                              ></i>
                            </span>
                          ) : null}
                        </span>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                );
              })
            ) : (
              <p className='text-center lead d-block w-100'>
                There are no pictures in the Gallery.
              </p>
            )}
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

Pictures.getInitialProps = async (ctx: any) => {
  // Check user's session

  const token = auth(ctx);

  return { token };
};

export default Pictures;
