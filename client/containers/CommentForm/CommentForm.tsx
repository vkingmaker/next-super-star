import React, { Component, Fragment } from 'react';
import { MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';

interface ICommnetForm {
  userComment: (comment: string) => void;
}

class CommentForm extends Component<ICommnetForm> {
  state = {
    comment: ''
  };

  render() {
    return (
      <Fragment>
        <MDBCard className='mb-4'>
          <MDBCardBody>
            <MDBInput
              label='Comment'
              group
              type='text'
              validate
              error='wrong'
              success='right'
              value={this.state.comment}
              onChange={e =>
                this.setState({
                  comment: (e.target as HTMLInputElement).value
                })
              }
            />
            <div className='text-right'>
              <MDBBtn
                color='primary'
                onClick={() => this.props.userComment(this.state.comment)}
              >
                Comment
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </Fragment>
    );
  }
}

export default CommentForm;
