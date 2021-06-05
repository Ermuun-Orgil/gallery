import React from 'react';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';
import { useTheme } from '../theme-provider';
import { ColorType } from '../types';

export const Shadow: React.FC<ShadowType> = ({
  grow = 0,
  role = 'black',
  opacity = 0.1,
  radius = 5,
  h = 0,
  w = 0,
  children,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    boxshadow: {
      flexGrow: grow,
      shadowOpacity: opacity,
      shadowRadius: radius,
      shadowColor: colors[role],
      shadowOffset: { height: h, width: w },
      elevation: 40,
    },
  });

  return <View style={[styles.boxshadow]}>{children}</View>;
};

type ShadowType = {
  grow?: number;
  h?: number;
  w?: number;
  radius?: number;
  opacity?: number;
  role?: ColorType;
  children?: JSX.Element | JSX.Element[] | string;
};
