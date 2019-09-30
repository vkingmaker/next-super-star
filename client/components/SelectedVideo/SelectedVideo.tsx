import React, { Fragment } from 'react';
import { MDBCardBody, MDBCardText, MDBCard } from 'mdbreact';
import CommentForm from '../../containers/CommentForm/CommentForm';
import VideoComment from './VideoComment/VideoComment';
import { IVideo, IFeedback } from '../../lib/interface/types';
import { isAdmin } from '../../lib/auth';

const SelectedVideo = (props: {
  currentVideo: IVideo;
  handleLike: (id: string) => void;
  handleDelete: (id: string) => void;
  addComment: (comment: string) => void;
  comments: IFeedback[];
}) => (
  <Fragment>
    <MDBCard className='mb-5'>
      <MDBCardBody>
        <video
          width='100%'
          height='550px'
          poster={props.currentVideo.thumb_nail}
          controls
        >
          Your browser does not support HTML5 video.
        </video>
        <MDBCardText>
          {props.currentVideo.title}
          <span className='d-flex justify-content-between my-2'>
            <span onClick={() => props.handleLike(props.currentVideo._id)}>
              <i className='fa fa-heart mr-1' style={{ color: 'red' }}></i>
              <span className='text-muted' style={{ fontSize: '0.8rem' }}>
                ({props.currentVideo.likes})
              </span>
            </span>
            {isAdmin() ? (
              <span onClick={() => props.handleDelete(props.currentVideo._id)}>
                <i className='fa fa-trash mr-1' style={{ color: 'red' }}></i>
              </span>
            ) : null}
          </span>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
    <CommentForm userComment={props.addComment} />
    {props.comments.length ? <VideoComment comments={props.comments} /> : null}
  </Fragment>
);

export default SelectedVideo;
