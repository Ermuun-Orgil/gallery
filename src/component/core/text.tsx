import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { useTheme } from '../theme-provider';
import { ColorType } from '../types';

const headings = ['largeTitle', 'title1', 'title2', 'title3', 'headline'];

const FONT_TYPES = {
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 0.37,
  },
  title1: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0.36,
  },
  title2: {
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  title3: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.38,
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  callout: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  subheading: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  caption1: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0.07,
  },
};

export const Text: React.FC<TextType> = ({
  type = 'body',
  role,
  bold,
  underline,
  textAlign,
  numberOfLines,
  height,
  width,
  opacity,
  children,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    shape: {
      width: width || 'auto',
      height: height || 'auto',
      textAlign: textAlign || 'left',
      flexShrink: 1,
    },
    text: {
      ...FONT_TYPES[type],
      color: colors[role || 'primary'],
      fontWeight: bold ? '700' : '400',
      textDecorationLine: underline ? 'underline' : undefined,
      opacity,
    },
  });

  return (
    <RNText numberOfLines={numberOfLines} style={[styles.shape, styles.text]}>
      {children}
    </RNText>
  );
};

type TextType = {
  type?:
    | 'largeTitle'
    | 'title1'
    | 'title2'
    | 'title3'
    | 'headline'
    | 'body'
    | 'callout'
    | 'subheading'
    | 'footnote'
    | 'caption1'
    | 'caption2';
  role?: ColorType;
  bold?: boolean;
  textAlign?: 'center' | 'left' | 'right';
  fontFamily?: 'Montserrat';
  numberOfLines?: number;
  width?: string | number;
  height?: string | number;
  children?: JSX.Element | JSX.Element[] | string;
  underline?: boolean;
  opacity?: number;
};
