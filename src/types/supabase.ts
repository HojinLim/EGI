export interface UserType {
  uid: string;
  email: string;
  password: string;
  nickname: string;
  profileimg: File | null;
}

export interface UserTypes {
  uid: string | null;
  email: string | null;
  password: string | null;
  nickname: string | null;
  profileimg: File | string | null;
}

// 일반 댓글
export interface CommentType {
  cid: number;
  uid: string | null;
  pid: number;
  nickname: string | null;
  body: string;
  created_at: string;
  profileimg: File | string | null;
}

// 대댓글
export interface ReplyCommentType {
  rid: number;
  pid: number;
  cid: number;
  uid: string | null;
  nickname: string | null;
  body: string;
  created_at: string;
  profileimg: File | string | null;
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
  nickname: string;
  profileimg: File | string | null;
  iscompleted: string;
  direct: string;
}

export interface JjimType {
  uid: string | null;
  pid: string;
}

export interface ProductInfo {
  title: string;
  price: string;
  nickname: string;
}
