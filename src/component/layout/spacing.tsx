import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Spacing: React.FC<BoxType> = (props) => {
  const {
    grow,
    m,
    mh,
    mv,
    ml,
    mr,
    mt,
    mb,
    p,
    ph,
    pv,
    pl,
    pr,
    pt,
    pb,
    children,
  } = props;

  const styles = StyleSheet.create({
    container: {
      flexGrow: grow,
    },
    margin: {
      margin: m,
      marginHorizontal: mh,
      marginVertical: mv,
      marginLeft: ml,
      marginRight: mr,
      marginTop: mt,
      marginBottom: mb,
    },
    padding: {
      padding: p,
      paddingHorizontal: ph,
      paddingVertical: pv,
      paddingLeft: pl,
      paddingRight: pr,
      paddingTop: pt,
      paddingBottom: pb,
    },
  });

  return (
    <View style={[styles.container, styles.margin, styles.padding]}>
      {children}
    </View>
  );
};

type BoxType = {
  grow?: number;
  m?: string | number;
  mh?: string | number;
  mv?: string | number;
  ml?: string | number;
  mr?: string | number;
  mt?: string | number;
  mb?: string | number;
  p?: string | number;
  ph?: string | number;
  pv?: string | number;
  pl?: string | number;
  pr?: string | number;
  pt?: string | number;
  pb?: string | number;
  children?: JSX.Element | JSX.Element[] | string | any;
};
