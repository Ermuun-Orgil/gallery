import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spacing } from './spacing';
import { useTheme } from '../theme-provider';
import { ColorType } from '../types';

export const Stack: React.FC<StackType> = (props) => {
  const {
    size = 0,
    role,
    height,
    width,
    children,
    justifyContent,
    alignItems,
  } = props;
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    stack: {
      flexDirection: 'column',
      backgroundColor: role ? colors[role] : 'transparent',
      height,
      width,
      justifyContent: justifyContent,
      alignItems: alignItems,
    },
  });

  return (
    <View style={styles.stack}>
      {React.Children.toArray(children).map((child, index) => {
        if (index == 0) {
          return <View key={index}>{child}</View>;
        }
        return (
          <View key={index}>
            <Spacing mt={size} />
            {child}
          </View>
        );
      })}
    </View>
  );
};

type StackType = {
  size?: number | string;
  role?: ColorType;
  width?: string | number;
  height?: string | number;
  children?: JSX.Element | JSX.Element[] | string | any;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
};
