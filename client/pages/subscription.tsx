import React, { Component } from 'react';
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdbreact';

import { Subscription as subUser } from '../lib/subscription';
import { saveCookie } from '../lib/cookieStorage';
import Router from 'next/router';

interface ISSubscription {
  cardNumber: number;
  postcode: number;
  year: number;
  month: number;
  cvv: number;
}

class Subscription extends Component {
  state: ISSubscription = {
    cardNumber: 0,
    postcode: 0,
    year: 0,
    month: 0,
    cvv: 0
  };

  handleSubscription = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = `${localStorage.getItem('superstar-userId')}`;

    const { cardNumber, postcode, year, month, cvv } = this.state;

    subUser(cardNumber, cvv, userId, postcode, month, year).then(res => {
      const { userId, isAdmin, subscription } = res.data;
      saveCookie({ userId, isAdmin, subscription });
      Router.push('/index');
      console.log('RESPONSE-SUB', res);
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
            <MDBCol sm='10' className='mx-auto mb-5'>
              <form onSubmit={this.handleSubscription}>
                <MDBRow>
                  <MDBCol md='10'>
                    <p className='h5 text-center mb-4'>Subscription</p>
                  </MDBCol>
                </MDBRow>
                <div className='grey-text'>
                  <MDBRow>
                    <MDBCol md='8'>
                      <MDBInput
                        label='Card Number'
                        group
                        type='text'
                        validate
                        error='wrong'
                        success='right'
                        required
                        onChange={e =>
                          this.setState({
                            cardNumber: (e.target as HTMLInputElement).value
                          })
                        }
                        value={this.state.cardNumber}
                      />
                    </MDBCol>
                    <MDBCol md='2'>
                      <MDBInput
                        label='CVV'
                        group
                        type='number'
                        validate
                        error='wrong'
                        success='right'
                        required
                        onChange={e =>
                          this.setState({
                            cvv: (e.target as HTMLInputElement).value
                          })
                        }
                        value={this.state.cvv}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='5'>
                      <MDBInput
                        label='Year'
                        group
                        type='text'
                        validate
                        error='wrong'
                        success='right'
                        required
                        onChange={e =>
                          this.setState({
                            year: (e.target as HTMLInputElement).value
                          })
                        }
                        value={this.state.year}
                      />
                    </MDBCol>
                    <MDBCol md='5'>
                      <MDBInput
                        label='Month'
                        group
                        type='text'
                        validate
                        error='wrong'
                        success='right'
                        required
                        onChange={e =>
                          this.setState({
                            month: (e.target as HTMLInputElement).value
                          })
                        }
                        value={this.state.month}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='3'>
                      <MDBInput
                        label='Post Code'
                        group
                        type='number'
                        validate
                        error='wrong'
                        success='right'
                        required
                        onChange={e =>
                          this.setState({
                            postcode: (e.target as HTMLInputElement).value
                          })
                        }
                        value={this.state.postcode}
                      />
                    </MDBCol>
                  </MDBRow>
                </div>
                <MDBRow>
                  <MDBCol md='10'>
                    <div className='text-center'>
                      <MDBBtn color='dark' type='submit'>
                        Subscribe
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default Subscription;
