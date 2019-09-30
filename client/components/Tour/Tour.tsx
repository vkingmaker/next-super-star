import React from 'react';
import { ITour } from '../../lib/interface/types';
import { MDBCol, MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';

const Tour = (props: { tours: ITour[] }) => (
  <React.Fragment>
    {props.tours.length ? (
      props.tours.map((tour: { _id: string; venue: string }) => {
        return (
          <MDBCol sm='10' className='mx-auto mb-5' key={tour._id}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{tour.venue}</MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        );
      })
    ) : (
      <p className='w-100 lead text-center text-muted'>There are no tours.</p>
    )}
  </React.Fragment>
);

export default Tour;
