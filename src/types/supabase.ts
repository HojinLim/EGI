export interface UserType {
  uid: string;
  email: string;
  password: string;
  nickname: string;
  profileimg: File | null;
}
export interface Comment {
  cid: number;
  uid: string;
  pid: number;
  nickname: string;
  body: string;
  created_at: string;
}

export interface Post {
  pid: number;
  title: string;
  body: string;
  image_urls: string[];
}
