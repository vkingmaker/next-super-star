import React from 'react';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask
} from 'mdbreact';

const Welcome = () => {
  return (
    <div>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className='z-depth-1'
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId='1'>
            <MDBView src='https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg'>
              <MDBMask
                overlay='black-light'
                className='flex-center flex-column text-white text-center'
              >
                <h2>This Navbar is fixed</h2>
                <h5>
                  It will always stay visible on the top, even when you scroll
                  down
                </h5>
                <br />
                <p>
                  Full page intro with background image will be always displayed
                  in full screen mode, regardless of device{' '}
                </p>
              </MDBMask>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='2'>
            <MDBView src='https://mdbootstrap.com/img/Photos/Others/img%20(51).jpg'>
              <MDBMask
                overlay='black-light'
                className='flex-center flex-column text-white text-center'
              >
                <h2>This Navbar is fixed</h2>
                <h5>
                  It will always stay visible on the top, even when you scroll
                  down
                </h5>
                <br />
                <p>
                  Full page intro with background image will be always displayed
                  in full screen mode, regardless of device{' '}
                </p>
              </MDBMask>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId='3'>
            <MDBView src='https://i2.wp.com/mod.ng/wp-content/uploads/2018/11/dbanj-emergency-e1543531222532.jpg'>
              {/* <MDBView src='https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg'> */}
              <MDBMask
                overlay='black-light'
                className='flex-center flex-column text-white text-center'
              >
                <h2>This Navbar is fixed</h2>
                <h5>
                  It will always stay visible on the top, even when you scroll
                  down
                </h5>
                <br />
                <p>
                  Full page intro with background image will be always displayed
                  in full screen mode, regardless of device{' '}
                </p>
              </MDBMask>
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </div>
  );
};

export default Welcome;
