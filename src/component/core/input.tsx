import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TextInput } from 'react-native';
import { Border, Text, Box, Spacing } from '..';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '../theme-provider';
import { Stack } from '../layout';

interface Props {
  placeholder: string;
  type?: 'default' | 'password';
  status?: 'default' | 'error' | 'disabled' | 'success';
  LeftIcon?: any;
  value?: string;
  RigthIcon?: any;
  counter?: boolean;
  helperText?: string;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  messageText?: string;
  messageType?: 'default' | 'error' | 'warning' | 'success';
  onKeyPress?: Function;
  onChangeText?: Function;
  onSubmitEditing?: Function;
  width?: any;
  onFocus?: Function;
}

export const Input: React.FC<Props> = (props) => {
  const { colors } = useTheme();
  const {
    type,
    placeholder,
    status = 'default',
    LeftIcon,
    RigthIcon,
    value,
    keyboardType,
    onKeyPress,
    onChangeText,
    onSubmitEditing,
    width,
    onFocus,
  } = props;
  const animationIndex = useRef(new Animated.Value(0)).current;
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [visible, setVisible] = useState(true);
  const translateYLabel = animationIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });
  const translateXLabel = animationIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -0.9 * placeholder.length * 2],
  });
  const translateYInput = animationIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 7],
  });
  const scale = animationIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });

  useEffect(() => {
    if (isInputFocus) {
      Animated.timing(animationIndex, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isInputFocus]);

  const styles = StyleSheet.create({
    label: {
      position: 'absolute',
      zIndex: 0,
    },

    input: {
      height: 45,
      zIndex: 1,
      marginLeft: type === 'password' ? 12 : 0,
      fontSize: 17,
      fontWeight: '400',
      letterSpacing: 1,
    },
  });

  return (
    <Box
      opacity={status === 'disabled' ? 0.5 : 1}
      height={56}
      width={width ? width : '100%'}
    >
      <Border
        radius={4}
        lineWidth={isInputFocus ? 2 : 1}
        role={'black'}
      >
        <Box
          justifyContent={'center'}
          role={'white'}
          height={52}
          width={'100%'}
        >
          <Spacing ph={4}>
            <Box
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'row'}
            >
              <Animated.View
                style={[
                  styles.label,
                  { left: type === 'password' ? 34 : LeftIcon ? 30 : 0 },
                  {
                    transform: [
                      { translateY: translateYLabel },
                      { scale },
                      { translateX: translateXLabel },
                    ],
                  },
                ]}
              >
                <Text
                  type={'body'}
                  role={'black'}
                >
                  {placeholder}
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  width:
                    type === 'password'
                      ? '86%'
                      : LeftIcon || RigthIcon
                      ? '92%'
                      : '100%',
                  transform: [{ translateY: translateYInput }],
                }}
              >
                <TextInput
                  style={[styles.input, { color: colors['black'] }]}
                  onFocus={() => {
                    setIsInputFocus(true), onFocus && onFocus();
                  }}
                  onBlur={() => setIsInputFocus(false)}
                  value={value}
                  keyboardType={keyboardType}
                  autoFocus={value ? true : false}
                  editable={status === 'disabled' ? false : true}
                  scrollEnabled={false}
                  secureTextEntry={type === 'password' ? visible : false}
                  onChangeText={(text) => onChangeText && onChangeText(text)}
                  onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
                  onKeyPress={(e) =>
                    onKeyPress && onKeyPress(e.nativeEvent.key)
                  }
                />
              </Animated.View>
              <TouchableOpacity
                onPress={() => setVisible(!visible)}
                style={{ display: type === 'password' ? 'flex' : 'none' }}
              >
              </TouchableOpacity>
            </Box>
          </Spacing>
        </Box>
      </Border>
    </Box>
  );
};
