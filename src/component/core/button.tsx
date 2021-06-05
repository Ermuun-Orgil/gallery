import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Spacing } from '../layout';
import { Border } from './border';
import { Shadow } from './shadow';

const statusOpacity = {
  default: 1,
  disabled: 0.5,
  active: 0.7,
};

export const Button: React.FC<ButtonType> = ({
  onPress,
  status = 'default',
  type = 'primary',
  size = 'l',
  category = 'fill',
  width,
  children,
}) => {
  return (
    <Box
      opacity={statusOpacity[status]}
      width={width ? width : 'auto'}
      height={size === 's' ? 42 : 48}
      alignSelf={'flex-start'}
    >
      <TouchableOpacity
        onPress={() => onPress()}
        disabled={status === 'disabled'}
      >
        <Border
          radius={4}
          role={type === 'primary' ? 'primary500' : 'destructive500'}
          lineWidth={category === 'ghost' ? 1 : 0}
        >
          <Box
            role={
              category === 'fill'
                ? type === 'primary'
                  ? 'primary500'
                  : 'destructive500'
                : undefined
            }
            height={'100%'}
          >
            <Shadow
              role={'black'}
              radius={0}
              opacity={0.15}
              h={category === 'fill' ? 4 : 0}
              w={0}
            >
              <Box
                width={'100%'}
                height={size === 's' ? 38 : 44}
                role={
                  category === 'fill'
                    ? type === 'primary'
                      ? 'primary500'
                      : 'destructive500'
                    : undefined
                }
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Spacing ph={category === 'text' ? 0 : 4}>
                  <Box
                    justifyContent={'center'}
                    alignItems={'center'}
                    alignSelf={'stretch'}
                  >
                    {children}
                  </Box>
                </Spacing>
              </Box>
            </Shadow>
          </Box>
        </Border>
      </TouchableOpacity>
    </Box>
  );
};

type ButtonType = {
  category?: 'fill' | 'ghost' | 'text';
  status?: 'disabled' | 'active' | 'default';
  type?: 'primary' | 'destructive';
  size?: 'l' | 's';
  width?: number | string;
  height?: number | string;
  onPress: Function;
  children?: any;
};