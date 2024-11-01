import React from "react";
import { View, SafeAreaView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import SidebarHeader from "./SidebarHeader";
import SidebarLinkList from "./SidebarLinkList";
import SidebarRecents from "./SidebarRecents";
import { useClickOutside } from "react-native-click-outside";

const SideBar = ({ isOpen, setIsOpen }: any) => {
  
  const [isVisible, setIsVisible] = React.useState(isOpen);


  const translateX = useSharedValue(isOpen ? 0 : -1000);


  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(translateX.value, { duration: 500 }) }],
    };
  });

  React.useEffect(() => {
    if (isOpen) {
   
      setIsVisible(true);
      translateX.value = 0;
    } else {
     
      translateX.value = -1000;

      runOnJS(hideSidebar)();
    }
  }, [isOpen]);

  const hideSidebar = () => {

    setTimeout(() => {
      setIsVisible(false);
    }, 10);
  };

  const ref = useClickOutside<View>(() => setIsOpen(false));

  return isVisible ? (
    <SafeAreaView
      className={`h-screen absolute w-full flex z-50 `}
      style={{ zIndex: 100 }}
    >
      <View className="bg-black opacity-70 w-screen h-screen absolute" style={{ zIndex: 10 }}></View>
      <Animated.View
        ref={ref}
        style={[animatedStyles, { zIndex: 20 }]}
        className="h-full w-3/4 bg-white dark:bg-black opacity-100 absolute pt-[24px]"
      >
        <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen} />
        <SidebarLinkList />
        <SidebarRecents />
      </Animated.View>
    </SafeAreaView>
  ) : null;
};

export default SideBar;
