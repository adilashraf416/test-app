export interface IUser {
  avatarUrl: string;
  username: string;
  name: string;
  id: number;
}


export interface IUserProfile extends IUser {
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  profileUrl: string; 
  company: string;
  twitter_username: string;
}
