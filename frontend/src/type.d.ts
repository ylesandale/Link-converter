type LoginObj = { email: string; password: string };

type ContextProps = {
  token: any;
  userId: string | null;
  login: any;
  logout: any;
  isAuth: boolean;
  ready?: boolean;
};

type LinkId = { id: string };

type Link = {
  clicks: number;
  _id: string;
  code: string;
  data: string;
  from: string;
  owner: string;
  to: string;
};
