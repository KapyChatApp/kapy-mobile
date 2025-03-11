import { getMusicList, searchMusic } from "@/lib/music";
import { bgLight500Dark10 } from "@/styles/theme";
import { MusicTrack } from "@/types/music";
import React, { useEffect, useState } from "react";
import { View, Modal, TouchableWithoutFeedback, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MusicBox from "./MusicBox";
import Search from "../function/Search";

const MusicSelector = ({ visible, onClose, setSelectedMusic }:{visible:boolean, onClose:()=>void, setSelectedMusic:(music:MusicTrack)=>void}) => {
    const [musics, setMusics] = useState<MusicTrack[]>([]);
    const [q, setQ] = useState<string>("");
    const [searchResult, setSearchResult] = useState<MusicTrack[]>([]);

    const fetchMusic = async ()=>{
        const musics = await getMusicList();
        setMusics(musics);
    }

    const handleSearch = async ()=>{
        const result:MusicTrack[]= await searchMusic(q);
        setSearchResult(result);
    }
    
    useEffect(() => {
        const handler = setTimeout(() => {
            handleSearch();
        }, 500);

        return () => clearTimeout(handler);
    }, [q]);

    useEffect(()=>{
        fetchMusic();
    },[])
    return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
   
            <View className={`h-4/5 w-full ${bgLight500Dark10} pt-[20px]`} style={{rowGap:10}}>
            <Search onChangeText={setQ}/>
            <ScrollView contentContainerStyle={{rowGap:4, paddingHorizontal:16, paddingVertical:8}}>
                {q===""? musics.map((item)=><MusicBox {...item} setSelectedMusic={()=>{setSelectedMusic(item); onClose();}}/>):searchResult.map((item)=><MusicBox {...item} />)} 
            </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền đen mờ
    justifyContent: "flex-end",
  }
});

export default MusicSelector;