declare module 'victory-native' {
  import React from 'react';
  
  export interface VictoryPieProps {
    data?: Array<{ x: any; y: number }>;
    width?: number;
    height?: number;
    innerRadius?: number;
    colorScale?: string[];
    padding?: number | { top?: number; bottom?: number; left?: number; right?: number };
    labels?: (() => null) | any;
    style?: any;
  }
  
  export const VictoryPie: React.FC<VictoryPieProps>;
  export const VictoryLabel: React.FC<any>;
} 