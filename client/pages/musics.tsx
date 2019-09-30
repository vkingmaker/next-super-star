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
import { IMusic } from '../lib/interface/types';

import { deleteMusic, likeMusic, getMusic } from '../lib/api';
import { auth, isAdmin } from '../lib/auth';

class Musics extends Component {
  state = {
    music: []
  };
  handleDelete = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    musicId: string
  ) => {
    event.preventDefault();

    deleteMusic(musicId)
      .then(res => {
        const updatedMusic = this.state.music.filter((music: IMusic) => {
          return music._id !== musicId;
        });

        this.setState({
          music: [...updatedMusic]
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleLike = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    musicId: string
  ) => {
    event.preventDefault();

    likeMusic(musicId).then(res => {
      let updateMusic: IMusic[] = [...this.state.music];
      if (res.data.title) {
        this.state.music.find((music: IMusic, i: number) => {
          if (music._id === musicId) {
            updateMusic[i] = res.data;

            this.setState({
              music: [...updateMusic]
            });
          }
        });
      }
    });
  };
  componentDidMount() {
    getMusic()
      .then(res => {
        this.setState({
          music: [...this.state.music, ...res.data]
        });
      })
      .catch(e => {
        console.log('ERROR', e);
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
            {this.state.music.length ? (
              this.state.music.map((music: IMusic) => {
                return (
                  <MDBCol md='4' className='mb-4' key={music._id}>
                    <MDBCard className='mb-2'>
                      <MDBCardImage
                        className='img-fluid'
                        src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
                      />
                      <MDBCardBody>
                        <MDBCardText>{music.title}</MDBCardText>
                        <span className='d-flex justify-content-between'>
                          <span onClick={e => this.handleLike(e, music._id)}>
                            <i
                              className='fa fa-heart mr-1'
                              style={{ color: 'red' }}
                            ></i>
                            <span
                              className='text-muted'
                              style={{ fontSize: '0.8rem' }}
                            >
                              ({music.likes})
                            </span>
                          </span>
                          {isAdmin() ? (
                            <span
                              onClick={e => this.handleDelete(e, music._id)}
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
              <p className='text-center lead d-block w-100 text-muted'>
                There are no musics in the store
              </p>
            )}
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

Musics.getInitialProps = async (ctx: any) => {
  const token = auth(ctx);

  return { token };
};

export default Musics;
