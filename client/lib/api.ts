import axios from 'axios';
import cookie from 'js-cookie';
import { IComment } from '../lib/interface/types';
import { baseURL } from './auth';

export const getMusic = async () => {
  const response = await axios.get(`${baseURL}/starrecords/musics`);

  return response;
};

export const addMusic = async (
  albumart: string,
  title: string,
  url: string
) => {
  const response = await axios.post(
    `${baseURL}/starrecords/musics`,
    {
      data: { albumart, title, url }
    },
    {
      headers: {
        'x-access-token': cookie.get('superstar_token')
      }
    }
  );

  return response;
};

export const deleteMusic = async (musicId: string) => {
  const response = await axios({
    method: 'DELETE',
    url: `${baseURL}/starrecords/musics/${musicId}`,
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });

  return response;
};

export const likeMusic = async (musicId: string) => {
  const response = await axios({
    method: 'PATCH',
    url: `${baseURL}/starrecords/musics/${musicId}/like`,
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });
  return response;
};

export const likePicture = async (photoId: string) => {
  const response = await axios({
    method: 'PATCH',
    url: `${baseURL}/starrecords/photos/${photoId}/like`,
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });
  return response;
};

export const deletePicture = async (photoId: string) => {
  const response = await axios({
    method: 'DELETE',
    url: `${baseURL}/starrecords/photos/${photoId}`,
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });

  return response;
};

export const getPicture = async () => {
  const response = await axios.get(`${baseURL}/starrecords/photos`);

  return response;
};

export const addPicture = async (caption: string, url: string) => {
  const response = await axios({
    method: 'POST',
    url: `${baseURL}/starrecords/photos`,
    data: { caption, url },
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });

  return response;
};

export const getTour = async () => {
  const response = await axios.get(`${baseURL}/starrecords/tours`);

  return response;
};

export const addTour = async (venue: string) => {
  const response = await axios({
    method: 'POST',
    url: `${baseURL}/starrecords/tours`,
    data: { venue },
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });

  return response;
};

export const addVideo = async (
  title: string,
  thumb_nail: string,
  url: string
) => {
  const response = await axios({
    method: 'POST',
    url: `${baseURL}/starrecords/videos`,
    data: { title, thumb_nail, url },
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });

  return response;
};

export const getVideo = async () => {
  const response = await axios.get(`${baseURL}/starrecords/videos`);

  return response;
};

export const likeVideo = async (videoId: string) => {
  const response = await axios({
    method: 'PATCH',
    url: `${baseURL}/starrecords/videos/${videoId}/like`,
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });
  return response;
};

export const deleteVideo = async (videoId: string) => {
  const response = await axios({
    method: 'DELETE',
    url: `${baseURL}/starrecords/videos/${videoId}`,
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });

  return response;
};

export const addComment = async (
  comment: IComment,
  videoId: string,
  mediaType: string
) => {
  const userId = cookie.get('superstar_userId');
  const response = await axios({
    method: 'POST',
    url: `${baseURL}/starrecords/videos/${videoId}/comment`,
    data: { userId, comment, mediaType },
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });

  return response;
};

export const getComment = async (mediaType: string) => {
  const response = await axios({
    method: 'GET',
    url: `${baseURL}/starrecords/videos/${mediaType}/comments`
  });

  return response;
};
