export interface UserType {
  uid: string;
  email: string;
  password: string;
  nickname: string;
  profileimg: File | null;
}

// 일반 댓글
export interface CommentType {
  cid: number;
  uid: string;
  pid: number;
  nickname: string;
  body: string;
  created_at: string;
  profileimg: File | null;
}

// 대댓글
export interface ReplyCommentType {
  rid: number;
  pid: number;
  cid: number;
  uid: string;
  nickname: string;
  body: string;
  created_at: string;
  profileimg: File | null;
}

export interface Post {
  pid: number;
  location: string;
  price: number;
  title: string;
  body: string;
  category: string;
  image_urls: string[];
  created_at: string;
  condition: string;
  exchange: string;
  parcel: string;
  uid: string;
}
