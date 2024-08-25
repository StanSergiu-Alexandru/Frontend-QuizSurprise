import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useGetCustomFetch from "../../Hooks/useGetCustomFetch.tsx";
import requestUrls from "../../Backend/requestUrls.tsx";
import { UserType } from "../../Types/userType.ts";

const mockData = [
  { name: "John", points: 20 },
  { name: "Doe", points: 15 },
  { name: "Jane", points: 10 },
  { name: "Doe", points: 5 },
  { name: "John", points: 20 },
  { name: "Doe", points: 15 },
  { name: "Jane", points: 10 },
  { name: "Doe", points: 5 },
  { name: "John", points: 20 },
  { name: "Doe", points: 15 },
  { name: "Jane", points: 10 },
  { name: "Doe", points: 5 },
  { name: "John", points: 20 },
  { name: "Doe", points: 15 },
  { name: "Jane", points: 10 },
  { name: "Doe", points: 5 },
];


const RankingsScreen = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const {fetcher, response, error} = useGetCustomFetch<UserType[], any>(requestUrls.getUsersAndPoints);

  useEffect(() => {
    fetcher();
  }, []);

  useEffect(() => {
    if(response){
      setUsers(response);
    }
  }, [response]);

  if(!users[0]){
    return <Text>Loading...</Text>
  }

  return (
    <View
      style={styles.imageBackground}>
    <View style={styles.container}>
      <View style={styles.firstPlaceContainer}>
        <Text style={styles.name}>{users[0] && users[0].firstName} {users[0].lastName[0]}</Text>
        <Text style={styles.points}>{users[0] && users[0].userPoints.totalPoints}</Text>
      </View>
      <View style={styles.secondPlaceContainer}>
        <Text style={styles.name}>{users[1] && users[1].firstName} {users[0].lastName[0]}</Text>
        <Text style={styles.points}>{users[1] && users[1].userPoints.totalPoints}</Text>
      </View>
      <View style={styles.thirdPlaceContainer}>
        <Text style={styles.name}>{users[2] && users[2].firstName} {users[0].lastName[0]}</Text>
        <Text style={styles.points}>{users[2] && users[2].userPoints.totalPoints}</Text>
      </View>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.contentContainer}>
          {users.slice(3).map((item, index) => (
            <View key={index} style={styles.cardContainer}>
              <Text style={styles.name}>{index + 4}. {item.firstName} {item.lastName}</Text>
              <Text style={styles.points}>{item.userPoints.totalPoints}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

    </View>
    </View>
  );
}

export default RankingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  points: {
    fontSize: 30,
    color:'black',
  },
  name:{
    fontSize: 30,
    color:'black',
    fontWeight:'bold',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor:'#B5D2FE'
  },
  firstPlaceContainer: {
     position: 'absolute',
      top: 300,
      width: '25%',
      height: '20%',
      borderRadius: 20,
      backgroundColor:'gold',
      alignItems: 'center',
    paddingTop:50,

    },
    secondPlaceContainer: {
      position: 'absolute',
        top: 330,
        width: '23%',
        height: '17%',
        left:'10%',
        backgroundColor: '#c0c0c0',
        borderRadius: 20,
      alignItems: 'center',
      paddingTop:40,
      },
  thirdPlaceContainer: {
      position: 'absolute',
        top: 360,
        width: '23%',
        height: '15%',
        right:'10%',
        backgroundColor: '#ad8a56',
        borderRadius: 20,
    alignItems: 'center',
    paddingTop:20,
      },
  mainContainer: {
    backgroundColor:'white',
    height: '60%',
    width:'100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  contentContainer: {
    flex: 1,
    marginLeft:45
  },
  cardContainer: {
    width: '90%',
    height:100,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth:2,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal:20,
  },
});


