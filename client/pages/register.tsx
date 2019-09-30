import React, { Component } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBCol,
  MDBRow
} from 'mdbreact';
import { RegisterUser } from '../lib/auth';
import { saveCookie } from '../lib/cookieStorage';
import Router from 'next/router';

class Register extends Component {
  state = { name: '', email: '', password: '' };
  handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = this.state;
    const { name } = this.state;
    const { password } = this.state;

    RegisterUser(email, name, password)
      .then(res => {
        if (typeof window !== 'undefined') {
          const { name, subscription, isAdmin, token, userId } = res.data;
          saveCookie({ name, subscription, isAdmin, token, userId });
        }
        Router.push('/subscription');
      })
      .catch(err => console.log('ERROR', err));
  };
  render() {
    return (
      <div>
        <MDBRow className='mx-0' style={{ marginTop: 8 + 'rem' }}>
          <MDBCol md='3' className='mx-auto'>
            <MDBCard>
              <MDBCardImage className='img-fluid' waves />
              <MDBCardBody>
                <form onSubmit={this.handleRegister}>
                  <p className='h5 text-center mb-4'>Sign up</p>
                  <div className='grey-text'>
                    <MDBInput
                      label='Name'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          name: (e.target as HTMLInputElement).value
                        })
                      }
                      value={this.state.name}
                    />
                    <MDBInput
                      label='Email'
                      group
                      type='email'
                      validate
                      error='wrong'
                      success='right'
                      required
                      onChange={e =>
                        this.setState({
                          email: (e.target as HTMLInputElement).value
                        })
                      }
                      value={this.state.email}
                    />
                    <MDBInput
                      label='Password'
                      group
                      type='password'
                      required
                      validate
                      onChange={e =>
                        this.setState({
                          password: (e.target as HTMLInputElement).value
                        })
                      }
                      value={this.state.password}
                    />
                  </div>
                  <div className='text-center'>
                    <MDBBtn color='dark' type='submit'>
                      Register
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default Register;
