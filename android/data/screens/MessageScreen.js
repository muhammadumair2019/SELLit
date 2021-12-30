import React from 'react';
import { Text,View,Image,StyleSheet,FlatList,TouchableHighlight } from 'react-native';

const initialMessages = [
    {
        value :1,
      title: "Muhammad Umair",
      description: "Hey! Is this item still available?",
      image: require('../images/user.png'),
    },
    {
        value:2,
      title: "Muhammad Umair",
      description:
        "I'm interested in this item. When will you be able to post it?",
      image: require('../images/user.png'),
    },
  ];

function MessageScreen(props) {
    return (
        
        <FlatList
        data={initialMessages}
        
        keyExtractor={item => item.value.toString()}
        renderItem={({item}) =>
        <TouchableHighlight >
            <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
            <View >
                <Image source={item.image} style={{height:35,width:35}}/>
            </View>
            <View style={{marginLeft:5}}>
                <Text style={{fontWeight: 'bold', fontFamily: 'roboto'}}>{item.title}</Text>
                <Text style={{fontWeight: 'bold', fontFamily: 'roboto'}}>{item.description}</Text>
            </View>
        </View>
        </TouchableHighlight>
          
        

        }
         
         />


            
        
    );
}



const styles = StyleSheet.create({
    container: {
      backgroundColor: 'red',
      width: 70,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default MessageScreen;