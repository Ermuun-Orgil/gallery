import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spacing } from './spacing';
import { useTheme } from '../theme-provider';
import { ColorType } from '../types';

export const Queue: React.FC<QueueType> = (props) => {
  const { size = 0, role, justifyContent, alignItems, children, width } = props;
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    queue: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: role ? colors[role] : 'transparent',
      justifyContent,
      alignItems,
      width,
    },
  });

  return (
    <View style={styles.queue}>
      {React.Children.toArray(children).map((child, index) => {
        if (index == 0) {
          return <React.Fragment key={index}>{child}</React.Fragment>;
        }
        return (
          <React.Fragment key={index}>
            <Spacing ml={size} />
            {child}
          </React.Fragment>
        );
      })}
    </View>
  );
};

type QueueType = {
  size?: number | string;
  role?: ColorType;
  width?: number | string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  children?: JSX.Element | JSX.Element[] | string;
};
