import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Box, Text, BookIcon, ProfileIcon, HomeIcon } from '../components';
const { width } = Dimensions.get('window');
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabIcons: any = {
  Home: HomeIcon,
  Course: BookIcon,
  Profile: ProfileIcon,
};

const tabNames: any = {
  Home: 'Нүүр',
  Course: 'Хичээл',
  Profile: 'Профайл',
};

export const BottomTab: React.FC<any> = ({
  state,
  descriptors,
  navigation,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const xVal = useRef(new Animated.Value(0)).current;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.spring(xVal, {
      toValue: state.index,
      velocity: 0.1,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <Box
      flexDirection="row"
      width="100%"
      height={65 + insets.bottom}
      position="relative"
    >
      <Box height={2} width="100%" role="gray" position="absolute" />
      <Animated.View
        style={[
          {
            height: 2,
            width: width / 3,
            backgroundColor: '#00DCF0',
            position: 'absolute',
          },
          {
            transform: [
              {
                translateX: Animated.multiply(width / 3, xVal),
              },
            ],
          },
        ]}
      />
      {state.routes.map((route: any, index: any) => {
        const CustomIcon = tabIcons[route.name];
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: 65,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomIcon role={isFocused ? 'accentNest' : 'black'} />
            <Text
              role={isFocused ? 'accentNest' : 'black'}
              type="caption2"
              textAlign="center"
              fontFamily="Montserrat"
            >
              {tabNames[label]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};
