export interface IMusic {
  _id: string;
  title: string;
  url: string;
  albumart: string;
  likes?: number;
}

export interface IPhoto {
  _id: string;
  caption: string;
  url: string;
  likes?: number;
}

export interface ITour {
  _id: string;
  venue: string;
}

export interface IVideo {
  _id: string;
  title: string;
  thumb_nail: string;
  url: string;
  likes?: number;
}

export interface IComment {
  _id?: string;
  message: string;
}

export interface IFeedback {
  _id: string;
  userId: string;
  videoId: string;
  mediaType: string;
  comment: IComment;
  likes?: number;
}
