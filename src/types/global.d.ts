declare module "iron-session" {
    interface IronSessionData {
      user?: {
        id: string;
        email?: string;
        name:string;
      };
    }
  }

  export default "iron-session";