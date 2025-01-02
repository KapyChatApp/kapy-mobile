// import React, { useEffect, useState } from "react";
// import {
//   StreamCall,
//   StreamVideo,
//   StreamVideoClient,
//   User,
//   CallContent
// } from "@stream-io/video-react-native-sdk";
// import { View, Text, Button, StyleSheet } from "react-native";
// import { getLocalAuth } from "@/lib/local";
// import axios from "axios";


// // Stream API credentials (Replace with your values)
// const apiKey = process.env.STREAM_API_KEY!; // Get this from the Stream Dashboard
// const callId = "default_7941b1a6-d4e0-4761-9c33-65c8cd4d5d93"; // Unique call ID for the session

// const CallPage = () => {
//   const [client, setClient] = useState<StreamVideoClient | null>(null);
//   const [call, setCall] = useState<any>(null);
//   const [isJoined, setIsJoined] = useState(false);
  
//   const getToken = async (_id:string) => {
//     try {
//       const response = await axios.get(process.env.EXPO_PUBLIC_BASE_URL + "/calling/call", {
//         headers: {},
//         params: { userId: _id }
//       });
//       console.log("stream token: ", response.data);
//       return response.data.token;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     const initializeStream = async () => {
//       try {
//         const { _id } = await getLocalAuth();
//         const token = await getToken(_id);
//         const user: User = { id:_id}; 
//         const streamClient = new StreamVideoClient({ apiKey, user, token });

//         // Create a call
//         const streamCall = streamClient.call("default", callId);

//         setClient(streamClient);
//         setCall(streamCall);

//         // Join the call
//         await streamCall.join({ create: true });
//         setIsJoined(true);
//         console.log("Successfully joined the call!");
//       } catch (error) {
//         console.error("Error initializing Stream client:", error);
//       }
//     };

//     initializeStream();
//   }, []);

//   if (!client || !call) {
//     return (
//       <View style={styles.centered}>
//         <Text>Initializing...</Text>
//       </View>
//     );
//   }

//   if (!isJoined) {
//     return (
//       <View style={styles.centered}>
//         <Text>Joining the call...</Text>
//       </View>
//     );
//   }

//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <CallContent />
//       </StreamCall>
//     </StreamVideo>
//   );
// };

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default CallPage;
