import React, { Fragment } from 'react';
import { MDBCol } from 'mdbreact';
import VideoItem from './VideoItem/VideoItem';
import { IVideo } from '../../lib/interface/types';

const VideoList = (props: {
  videoList: IVideo[];
  videoSelected: (video: IVideo) => void;
}) => (
  <Fragment>
    <MDBCol md='3' className='mx-auto'>
      {props.videoList.length ? (
        props.videoList.map((video: IVideo) => {
          return (
            <VideoItem
              item={video}
              key={video._id}
              selectVideo={props.videoSelected}
            />
          );
        })
      ) : (
        <p>No Videos</p>
      )}
    </MDBCol>
  </Fragment>
);

export default VideoList;
