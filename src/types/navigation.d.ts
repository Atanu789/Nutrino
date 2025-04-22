declare module '@react-navigation/native' {
  export interface NavigationContainerProps {
    children: React.ReactNode;
  }
  
  export const NavigationContainer: React.FC<NavigationContainerProps>;
  export type RouteProp<ParamList, RouteName extends keyof ParamList> = {
    key: string;
    name: RouteName;
    params: ParamList[RouteName];
  };
}

declare module '@react-navigation/stack' {
  export function createStackNavigator<T extends Record<string, object | undefined>>(): {
    Navigator: React.ComponentType<{
      screenOptions?: any;
      children?: React.ReactNode;
    }>;
    Screen: React.ComponentType<{
      name: keyof T;
      component?: React.ComponentType<any>;
      children?: (props: any) => React.ReactNode;
    }>;
  };
  
  export interface StackNavigationProp<
    ParamList extends Record<string, object | undefined>,
    RouteName extends keyof ParamList = keyof ParamList
  > {
    navigate<RouteName extends keyof ParamList>(
      name: RouteName,
      params?: ParamList[RouteName]
    ): void;
    goBack(): void;
  }
} 