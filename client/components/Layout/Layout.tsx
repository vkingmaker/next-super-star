import React from 'react';
import Link from 'next/link';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdbreact';
import cookie from 'js-cookie';
import { isLoggedIn } from '../../lib/auth';
import { removeCookie } from '../../lib/cookieStorage';
import Router from 'next/router';

interface ILayout {
  children: any;
}
class Layout extends React.Component<ILayout, { isOpen: boolean }> {
  constructor(props: ILayout) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  logout = () => {
    removeCookie();
    Router.push('/login');
  };

  render() {
    return (
      <MDBContainer className='main mx-0' fluid>
        <MDBRow>
          <MDBCol className='mx-0 px-0'>
            {/* {console.log('NAV-BAR')} */}
            <MDBNavbar color='black' dark expand='md' fixed='top'>
              <MDBNavbarBrand>
                <Link href='/index'>
                  <a>
                    <strong className='white-text'>Lee-Nation</strong>
                  </a>
                </Link>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse
                id='navbarCollapse3'
                isOpen={this.state.isOpen}
                navbar
              >
                <MDBNavbarNav right>
                  {isLoggedIn() ? (
                    <React.Fragment>
                      <MDBNavItem>
                        <Link href='/dashboard'>
                          <a className='nav-link'>Dashboard</a>
                        </Link>
                      </MDBNavItem>
                      <MDBNavItem>
                        <Link href='/musics'>
                          <a className='nav-link'>Musics</a>
                        </Link>
                      </MDBNavItem>
                      <MDBNavItem>
                        <Link href='/pictures'>
                          <a className='nav-link'>Pictures</a>
                        </Link>
                      </MDBNavItem>
                      <MDBNavItem>
                        <Link href='/video'>
                          <a className='nav-link'>Videos</a>
                        </Link>
                      </MDBNavItem>
                      <MDBNavItem>
                        <Link href='/tours'>
                          <a className='nav-link'>Tours</a>
                        </Link>
                      </MDBNavItem>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <MDBNavItem>
                        <Link href='/register'>
                          <a className='nav-link'>Register</a>
                        </Link>
                      </MDBNavItem>
                      <MDBNavItem>
                        <Link href='/login'>
                          <a className='nav-link'>Login</a>
                        </Link>
                      </MDBNavItem>
                    </React.Fragment>
                  )}

                  {isLoggedIn() ? (
                    <MDBNavItem>
                      <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                          <span className='mr-2'>
                            {cookie.get('superstar_name')}
                          </span>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          <MDBDropdownItem onClick={this.logout}>
                            Logout
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </MDBNavItem>
                  ) : null}
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            <div className='main-content'>{this.props.children}</div>
            <style global jsx>{`
              .main {
                height: 100%;
              }
            `}</style>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Layout;
