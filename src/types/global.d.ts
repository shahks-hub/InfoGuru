declare module "iron-session" {
    interface IronSessionData {
      user?: {
        id: number;
        email?: string;
        name:string;
      };
    }
  }