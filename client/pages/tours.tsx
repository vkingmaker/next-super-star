import React, { Component } from 'react';
import { MDBJumbotron, MDBContainer, MDBRow } from 'mdbreact';

import { getTour } from '../lib/api';
import Tour from '../components/Tour/Tour';

class Tours extends Component {
  state = {
    tours: []
  };

  componentDidMount() {
    getTour()
      .then(res => {
        this.setState({
          tours: [...this.state.tours, ...res.data]
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
          <MDBRow>{<Tour tours={this.state.tours} />}</MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default Tours;
