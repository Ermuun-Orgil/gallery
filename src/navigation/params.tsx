export enum NavigationRoutes {
    Home = 'Home',
  }
  export interface NavigationPayload<T> {
    props: T;
  }
  export type NavigatorParamList = {
    [NavigationRoutes.Home]: NavigationPayload<any>;
  };
  