import React, { Fragment } from 'react';
import { IVideo } from '../../../lib/interface/types';

const VideoItem = (props: {
  item: IVideo;
  selectVideo: (video: IVideo) => void;
}) => (
  <Fragment>
    <div
      className='video-item d-flex'
      onClick={() => props.selectVideo(props.item)}
    >
      <video width='100%' poster={props.item.thumb_nail}>
        Your browser does not support HTML5 video.
      </video>
      <div className='d-flex p-3 align-content-center border w-100'>
        <span>{props.item.title}</span>
      </div>
    </div>
    <style jsx>{`
      .video-item {
        height: 150px;
        width: 100%;
        border: 1px solid #eee;
        margin-top: 1rem;
      }
      .video-item > video {
        width: 48%;
        height: 100%;
        border: 1px solid #eee;
        display: inline-block;
      }
    `}</style>
  </Fragment>
);

export default VideoItem;
