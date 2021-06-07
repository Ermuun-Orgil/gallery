export enum NavigationRoutes {
    Home = 'Home',
    SignUp = 'SignUp',
    Folders = 'Folders',
  }
  export interface NavigationPayload<T> {
    props: T;
  }
  export type NavigatorParamList = {
    [NavigationRoutes.Home]: NavigationPayload<any>;
    [NavigationRoutes.SignUp]: NavigationPayload<any>;
    [NavigationRoutes.Folders]: NavigationPayload<any>;
  };
  