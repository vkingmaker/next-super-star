import React, { Component } from 'react';
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput
} from 'mdbreact';

import { auth } from '../lib/auth';
import { addMusic, addPicture, addTour, addVideo } from '../lib/api';

class Dashboard extends Component {
  state = {
    music: { title: '', albumart: '', url: '', isOpen: false },
    photo: { caption: '', url: '', isOpen: false },
    video: { title: '', thumb_nail: '', url: '', isOpen: false },
    tour: { venue: '', isOpen: false }
  };

  closeModal = (stateItem: string) => {
    switch (stateItem) {
      case 'music':
        this.setState({
          music: { ...this.state.music, ...{ isOpen: false } }
        });
      case 'tour':
        this.setState({
          tour: { ...this.state.tour, ...{ isOpen: false } }
        });
      case 'photo':
        this.setState({
          photo: { ...this.state.photo, ...{ isOpen: false } }
        });
      default:
        this.setState({
          video: { ...this.state.video, ...{ isOpen: false } }
        });
    }
  };

  handleAddMusic = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, albumart, url } = this.state.music;

    addMusic(albumart, title, url)
      .then(res => {
        console.log('ADDED MUSIC', res);
        this.closeModal('music');
      })
      .catch(e => {
        console.log('ERRROR', e);
        this.closeModal('music');
      });
  };

  handleAddPhoto = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { caption, url } = this.state.photo;

    addPicture(caption, url)
      .then(res => {
        console.log('ADDED PHOTO', res);
        this.closeModal('photo');
      })
      .catch(e => {
        console.log('ERRROR', e);
        this.closeModal('photo');
      });
  };
  handleAddVideo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(this.state.video);

    const { title, thumb_nail, url } = this.state.video;

    addVideo(title, thumb_nail, url)
      .then(res => {
        console.log('ADDED VIDEO', res);
        this.closeModal('video');
      })
      .catch(e => {
        console.log('ERRROR', e);
        this.closeModal('video');
      });
  };
  handleTour = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { venue } = this.state.tour;

    addTour(venue)
      .then(res => {
        console.log('TOUR', res.data);
        this.closeModal('tour');
      })
      .catch(e => {
        console.log('ERROR', e);
        this.closeModal('tour');
      });
  };

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
            <MDBCol>
              <div
                className='d-flex justify-content-around'
                style={{ position: 'relative', transform: 'translatey(15rem)' }}
              >
                <MDBBtn
                  style={{ borderRadius: 100 + 'px' }}
                  onClick={() =>
                    this.setState({
                      music: {
                        ...this.state.music,
                        ...{ isOpen: !this.state.music.isOpen }
                      }
                    })
                  }
                  size='lg'
                  color='dark'
                >
                  Add Music
                </MDBBtn>
                <MDBBtn
                  style={{ borderRadius: 100 + 'px' }}
                  size='lg'
                  color='dark'
                  onClick={() =>
                    this.setState({
                      photo: {
                        ...this.state.photo,
                        ...{ isOpen: !this.state.photo.isOpen }
                      }
                    })
                  }
                >
                  Add Picture
                </MDBBtn>
                <MDBBtn
                  style={{ borderRadius: 100 + 'px' }}
                  size='lg'
                  color='dark'
                  onClick={() =>
                    this.setState({
                      video: {
                        ...this.state.video,
                        ...{ isOpen: !this.state.video.isOpen }
                      }
                    })
                  }
                >
                  Add Video
                </MDBBtn>
                <MDBBtn
                  style={{ borderRadius: 100 + 'px' }}
                  size='lg'
                  color='dark'
                  onClick={() =>
                    this.setState({
                      tour: {
                        ...this.state.tour,
                        ...{ isOpen: !this.state.tour.isOpen }
                      }
                    })
                  }
                >
                  Add Tour
                </MDBBtn>
              </div>
              <MDBModal
                isOpen={this.state.music.isOpen}
                toggle={() =>
                  this.setState({
                    music: {
                      ...this.state.music,
                      ...{ isOpen: !this.state.music.isOpen }
                    }
                  })
                }
              >
                <MDBModalHeader
                  toggle={() =>
                    this.setState({
                      music: {
                        ...this.state.music,
                        ...{ isOpen: !this.state.music.isOpen }
                      }
                    })
                  }
                >
                  Music
                </MDBModalHeader>
                <form onSubmit={this.handleAddMusic}>
                  <MDBModalBody>
                    <MDBInput
                      label='Title'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          music: {
                            ...this.state.music,
                            ...{ title: (e.target as HTMLInputElement).value }
                          }
                        })
                      }
                      value={this.state.music.title}
                    />
                    <MDBInput
                      label='Url'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          music: {
                            ...this.state.music,
                            ...{ url: (e.target as HTMLInputElement).value }
                          }
                        })
                      }
                      value={this.state.music.url}
                    />
                    <MDBInput
                      label='Album art'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          music: {
                            ...this.state.music,
                            ...{
                              albumart: (e.target as HTMLInputElement).value
                            }
                          }
                        })
                      }
                      value={this.state.music.albumart}
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn
                      color='secondary'
                      onClick={() =>
                        this.setState({
                          music: {
                            ...this.state.music,
                            ...{ isOpen: !this.state.music.isOpen }
                          }
                        })
                      }
                    >
                      Close
                    </MDBBtn>
                    <MDBBtn color='primary' type='submit'>
                      Add
                    </MDBBtn>
                  </MDBModalFooter>
                </form>
              </MDBModal>
              <MDBModal
                isOpen={this.state.photo.isOpen}
                toggle={() =>
                  this.setState({
                    photo: {
                      ...this.state.photo,
                      ...{ isOpen: !this.state.photo.isOpen }
                    }
                  })
                }
              >
                <MDBModalHeader
                  toggle={() =>
                    this.setState({
                      photo: {
                        ...this.state.photo,
                        ...{ isOpen: !this.state.photo.isOpen }
                      }
                    })
                  }
                >
                  Photo
                </MDBModalHeader>
                <form onSubmit={this.handleAddPhoto}>
                  <MDBModalBody>
                    <MDBInput
                      label='Caption'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          photo: {
                            ...this.state.photo,
                            ...{ caption: (e.target as HTMLInputElement).value }
                          }
                        })
                      }
                      value={this.state.photo.caption}
                    />
                    <MDBInput
                      label='Url'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          photo: {
                            ...this.state.photo,
                            ...{ url: (e.target as HTMLInputElement).value }
                          }
                        })
                      }
                      value={this.state.photo.url}
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn
                      color='secondary'
                      onClick={() =>
                        this.setState({
                          photo: {
                            ...this.state.photo,
                            ...{ isOpen: !this.state.photo.isOpen }
                          }
                        })
                      }
                    >
                      Close
                    </MDBBtn>
                    <MDBBtn color='primary' type='submit'>
                      Add
                    </MDBBtn>
                  </MDBModalFooter>
                </form>
              </MDBModal>
              <MDBModal
                isOpen={this.state.video.isOpen}
                toggle={() =>
                  this.setState({
                    video: {
                      ...this.state.video,
                      ...{ isOpen: !this.state.video.isOpen }
                    }
                  })
                }
              >
                <MDBModalHeader
                  toggle={() =>
                    this.setState({
                      video: {
                        ...this.state.video,
                        ...{ isOpen: !this.state.video.isOpen }
                      }
                    })
                  }
                >
                  Video
                </MDBModalHeader>
                <form onSubmit={this.handleAddVideo}>
                  <MDBModalBody>
                    <MDBInput
                      label='Title'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          video: {
                            ...this.state.video,
                            ...{ title: (e.target as HTMLInputElement).value }
                          }
                        })
                      }
                      value={this.state.video.title}
                    />
                    <MDBInput
                      label='Url'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          video: {
                            ...this.state.video,
                            ...{ url: (e.target as HTMLInputElement).value }
                          }
                        })
                      }
                      value={this.state.video.url}
                    />
                    <MDBInput
                      label='Thumb nail'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          video: {
                            ...this.state.video,
                            ...{
                              thumb_nail: (e.target as HTMLInputElement).value
                            }
                          }
                        })
                      }
                      value={this.state.video.thumb_nail}
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn
                      color='secondary'
                      onClick={() =>
                        this.setState({
                          video: {
                            ...this.state.video,
                            ...{ isOpen: !this.state.video.isOpen }
                          }
                        })
                      }
                    >
                      Close
                    </MDBBtn>
                    <MDBBtn color='primary' type='submit'>
                      Add
                    </MDBBtn>
                  </MDBModalFooter>
                </form>
              </MDBModal>
              <MDBModal
                isOpen={this.state.tour.isOpen}
                toggle={() =>
                  this.setState({
                    tour: {
                      ...this.state.tour,
                      ...{ isOpen: !this.state.tour.isOpen }
                    }
                  })
                }
              >
                <form onSubmit={this.handleTour}>
                  <MDBModalHeader
                    toggle={() =>
                      this.setState({
                        tour: {
                          ...this.state.tour,
                          ...{ isOpen: !this.state.tour.isOpen }
                        }
                      })
                    }
                  >
                    Tour
                  </MDBModalHeader>
                  <MDBModalBody>
                    <MDBInput
                      label='Venue'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          tour: {
                            ...this.state.tour,
                            ...{ venue: (e.target as HTMLInputElement).value }
                          }
                        })
                      }
                      value={this.state.tour.venue}
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn
                      color='secondary'
                      onClick={() =>
                        this.setState({
                          tour: {
                            ...this.state.tour,
                            ...{ isOpen: !this.state.tour.isOpen }
                          }
                        })
                      }
                    >
                      Close
                    </MDBBtn>
                    <MDBBtn color='primary' type='submit'>
                      Add
                    </MDBBtn>
                  </MDBModalFooter>
                </form>
              </MDBModal>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

Dashboard.getInitialProps = async (ctx: any) => {
  const token = auth(ctx, true);

  return { token };
};

export default Dashboard;
