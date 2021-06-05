import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme-provider';
import { ColorType } from '../types';

export const Box: React.FC<BoxType> = (props) => {
  const { colors } = useTheme();
  const {
    flex = 0,
    height,
    width,
    overflow,
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    alignSelf,
    display,
    position,
    children,
    top,
    bottom,
    left,
    right,
    zIndex,
    role,
    opacity,
  } = props;
  const styles = StyleSheet.create({
    container: {
      flex,
      width,
      height,
      overflow,
    },
    flexBox: {
      display: 'flex',
      flexDirection: flexDirection || 'column',
      flexWrap: flexWrap || 'nowrap',
      justifyContent: justifyContent || 'flex-start',
      alignItems: alignItems || 'stretch',
      alignSelf: alignSelf,
    },
    position: {
      position: position || 'relative',
      top,
      bottom,
      left,
      right,
      zIndex,
    },
    display: {
      display,
    },
    background: {
      backgroundColor: role ? colors[role] : 'transparent',
      opacity: opacity,
    },
  });

  return (
    <View
      style={[
        styles.container,
        styles.flexBox,
        styles.position,
        styles.display,
        styles.background,
      ]}
    >
      {children}
    </View>
  );
};

type BoxType = {
  flex?: number;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
  position?: 'absolute' | 'relative';
  display?: 'flex' | 'none';
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  zIndex?: number;
  role?: ColorType;
  opacity?: number;
  width?: string | number;
  height?: string | number;
  overflow?: 'hidden' | 'scroll' | 'visible';
  children?: JSX.Element | JSX.Element[] | string | any;
};
