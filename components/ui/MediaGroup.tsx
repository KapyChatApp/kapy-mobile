import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { FileProps } from "@/types/file";
import VideoPlayer from "../shared/multimedia/VideoPlayer";
import MediaViewer from "./MediaViewer";

const MediaGroup = ({ medias }: any) => {
  const [isMediaViewerVisible, setMediaViewerVisible] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handleMediaPress = (index: number) => {
    setCurrentMediaIndex(index);
    setMediaViewerVisible(true);
  };

  const renderMedia = () => {
    if (medias) {
      switch (medias.length) {
        case 0:
          return null;
  
        case 1:
          return (
            <View className="flex-1">
              <Pressable onPress={() => handleMediaPress(0)}>
                {medias[0].type === "Image" ? (
                  <Image
                    source={{ uri: medias[0].url }}
                    resizeMode="cover"
                    style={{
                      width: 'auto',
                      height: 'auto',
                      aspectRatio: medias[0].width/medias[0].height
                    }}
                  />
                ) : (
                  <View className="flex-1 " style={{width:'auto', height:'auto',aspectRatio:medias[0].width/medias[0].height}}>
                    <VideoPlayer videoSource={medias[0].url} />
                  </View>
                )}
              </Pressable>
            </View>
          );
  
        case 2:
          return (
            <View className="flex-1 flex-row" style={{ columnGap: 4 }}>
              {medias.map((media: FileProps, index: number) => (
                <Pressable
                  key={index}
                  style={{ flex: 1 }}
                  onPress={() => handleMediaPress(index)}
                >
                  {media.type === "Image" ? (
                    <Image
                      source={{ uri: media.url }}
                      resizeMode="cover"
                      style={{
                        width: "100%",
                        height: 150,
                      }}
                    />
                  ) : (
                    <View style={{ height: 150 }}>
                      <VideoPlayer videoSource={media.url!} />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          );
  
        case 3:
          return (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
              {medias.map((media: FileProps, index: number) => (
                <Pressable
                  key={index}
                  style={{
                    width: index === 0 ? "100%" : "48%",
                    height: index === 0 ? 200 : 100,
                  }}
                  onPress={() => handleMediaPress(index)}
                >
                  {media.type === "Image" ? (
                    <Image
                      source={{ uri: media.url }}
                      resizeMode="cover"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <VideoPlayer videoSource={media.url!} />
                  )}
                </Pressable>
              ))}
            </View>
          );
  
        case 4:
          return (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
              {medias.map((media: FileProps, index: number) => (
                <Pressable
                  key={index}
                  style={{
                    width: "48%",
                    height: 100,
                  }}
                  onPress={() => handleMediaPress(index)}
                >
                  {media.type === "Image" ? (
                    <Image
                      source={{ uri: media.url }}
                      resizeMode="cover"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <VideoPlayer videoSource={media.url!} />
                  )}
                </Pressable>
              ))}
            </View>
          );
  
          case 5:
            return (
              <View style={{ flexDirection: "column", gap: 4 }}>
                {/* Hàng trên: 2 ảnh lớn */}
                <View style={{ flexDirection: "row", gap: 4 }}>
                  {medias.slice(0, 2).map((media: FileProps, index: number) => (
                    <Pressable
                      key={index}
                      style={{
                        flex: 1,
                        height: 150, // Ảnh lớn
                      }}
                      onPress={() => handleMediaPress(index)}
                    >
                      {media.type === "Image" ? (
                        <Image
                          source={{ uri: media.url }}
                          resizeMode="cover"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      ) : (
                        <VideoPlayer videoSource={media.url!} />
                      )}
                    </Pressable>
                  ))}
                </View>
          
                {/* Hàng dưới: 3 ảnh nhỏ */}
                <View style={{ flexDirection: "row", gap: 4 }}>
                  {medias.slice(2).map((media: FileProps, index: number) => (
                    <Pressable
                      key={index}
                      style={{
                        flex: 1,
                        height: 100, // Ảnh nhỏ hơn
                      }}
                      onPress={() => handleMediaPress(index + 2)} // Cộng thêm vì đây là ảnh từ chỉ số 2 trở đi
                    >
                      {media.type === "Image" ? (
                        <Image
                          source={{ uri: media.url }}
                          resizeMode="cover"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      ) : (
                        <VideoPlayer videoSource={media.url!} />
                      )}
                    </Pressable>
                  ))}
                </View>
              </View>
            );
          
  default:
  return (
    <View className="flex-1">
      {/* Hàng trên: 2 hình ảnh đầu tiên */}
      <View className="flex-row" style={{ columnGap: 4 }}>
        {medias.slice(0, 2).map((media: FileProps, index: number) => (
          <Pressable
            key={index}
            style={{
              flex: 1,
              height: 150, // Kích thước của 2 hình ảnh đầu tiên
            }}
            onPress={() => handleMediaPress(index)}
          >
            {media.type === "Image" ? (
              <Image
                source={{ uri: media.url }}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <View style={{ height: "100%" }}>
                <VideoPlayer videoSource={media.url!} />
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {/* Hàng dưới: 3 hình ảnh còn lại và thông báo số lượng ảnh/video còn lại */}
      {medias.length > 2 && (
        <View className="flex-row" style={{ columnGap: 4, marginTop: 4 }}>
          {/* Các hình ảnh còn lại */}
          {medias.slice(2, 5).map((media: FileProps, index: number) => (
            <Pressable
              key={index}
              style={{
                flex: 1,
                height: 150, // Kích thước cho các ảnh còn lại
              }}
              onPress={() => handleMediaPress(index + 2)} // Điều chỉnh chỉ số cho đúng
            >
              {media.type === "Image" ? (
                <Image
                  source={{ uri: media.url }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <View style={{ height: "100%" }}>
                  <VideoPlayer videoSource={media.url!} />
                </View>
              )}
            </Pressable>
          ))}

          {/* Nếu có ảnh/video còn lại */}
          {medias.length > 5 && (
            <Pressable onPress={()=>handleMediaPress(6)}>
            <View
              className="flex-1 h-[150px] bg-light-320 justify-center items-center flex"
            >
              <Text className="font-helvetica-regular text-18 text-light-510 p-[30px]">
                +{medias.length - 5}
              </Text>
              </View>
              </Pressable>
          )}
        </View>
      )}
    </View>
  );

      }
    } else {
      return;
    }
  };
  

  return (
    <View>
      {renderMedia()}

      {/* Hiển thị MediaViewer */}
      {isMediaViewerVisible && (!(medias.length<2&&medias[0].type==="Video"))? (
        <MediaViewer
          visible={isMediaViewerVisible}
          medias={medias}
          initialIndex={currentMediaIndex}
          onClose={() => setMediaViewerVisible(false)}
        />
      ):null}
    </View>
  );
};

export default MediaGroup;
