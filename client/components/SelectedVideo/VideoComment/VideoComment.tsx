import React, { Fragment } from 'react';
import { IFeedback } from '../../../lib/interface/types';

const VideoComment = (props: { comments: IFeedback[] }) => (
  <Fragment>
    {props.comments.map((comment: IFeedback) => {
      return (
        <div className='d-flex align-items-center px-2 mb-3' key={comment._id}>
          <img
            src='https://icdn2.digitaltrends.com/image/digitaltrends/vinyl-record-player.jpg'
            className='d-inline-flex'
          />
          <p className='ml-3 text-truncate'>{comment.comment.message}</p>
        </div>
      );
    })}

    <style jsx>{`
      div {
        height: 200px;
        width: 100%;
        border: 1px solid #eee;
      }
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
      .like-btn {
        position: absolute;
        bottom: 2rem;
      }
      p {
        max-width: 70%;
      }
    `}</style>
  </Fragment>
);

export default VideoComment;
