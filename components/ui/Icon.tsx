import { View, Text, Image } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeProviders";

const Icon = ({ iconURL, size }: { iconURL: any; size: number }) => {
  const { theme } = useTheme();

  const modifiedIconURL = 
    typeof iconURL === 'string' && iconURL.includes('_l.png') 
      ? (theme === 'dark' ? iconURL.replace('_l.png', '_d.png') : iconURL)
      : iconURL; 
  
  return (
    <Image 
      source={modifiedIconURL} 
      style={{ width: size, height: size }} 
    />
  );
};

export default Icon;