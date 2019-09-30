import React, { Component } from 'react';
import Videos from '../containers/Video/Video';
import { auth } from '../lib/auth';

class Video extends Component {
  render() {
    return (
      <React.Fragment>
        <Videos />
      </React.Fragment>
    );
  }
}

Video.getInitialProps = async (ctx: any) => {
  const token = auth(ctx);

  return { token };
};

export default Video;
