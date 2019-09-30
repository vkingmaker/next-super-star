import React, { Component } from 'react';
import Router from 'next/router';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBCol,
  MDBRow
} from 'mdbreact';

import { LoginUser } from '../lib/auth';
import { saveCookie } from '../lib/cookieStorage';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    LoginUser(this.state.email, this.state.password)
      .then(res => {
        if (typeof window !== 'undefined') {
          const { name, subscription, isAdmin, token, userId } = res.data;
          saveCookie({ name, subscription, isAdmin, token, userId });
          if (!subscription) {
            return Router.push('/subscription');
          }
        }
        Router.push('/index');
      })
      .catch(e => {
        Router.push('/register');
        console.log('You must be a registered user', e);
      });
  };

  render() {
    return (
      <React.Fragment>
        <MDBRow className='mx-0' style={{ marginTop: 8 + 'rem' }}>
          <MDBCol md='3' className='mx-auto'>
            <MDBCard>
              <MDBCardImage className='img-fluid' waves />
              <MDBCardBody>
                <form onSubmit={this.handleLogin}>
                  <p className='h5 text-center mb-4'>Sign in</p>
                  <div className='grey-text'>
                    <MDBInput
                      label='Email'
                      group
                      type='email'
                      validate
                      error='wrong'
                      success='right'
                      onChange={e =>
                        this.setState({
                          email: (e.target as HTMLInputElement).value
                        })
                      }
                      value={this.state.email}
                      required
                    />
                    <MDBInput
                      label='Password'
                      group
                      type='password'
                      validate
                      onChange={e =>
                        this.setState({
                          password: (e.target as HTMLInputElement).value
                        })
                      }
                      value={this.state.password}
                      required
                    />
                  </div>
                  <div className='text-center'>
                    <MDBBtn color='dark' type='submit'>
                      Login
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </React.Fragment>
    );
  }
}

export default Login;
