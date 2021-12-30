import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const listings =[
    {Title: 'Cloths for Sale' , price: 10, bid: 10, image: require('../images/cloths.jpg') ,value:1},
    {Title: 'Camera for Sale' , price: 100, bid: 20, image: require('../images/camera.jpg') ,value:2},
    {Title: 'Jacket for Sale' , price: 20, bid: 13,image: require('../images/jacket.jpg') ,value:3},
]
function ListingsScreen(props) {
    return (
        
         <FlatList
        data={listings}
        style={{paddingHorizontal:20}}
        keyExtractor={item => item.value.toString()}
        renderItem={({item}) =>
        
          <View style={{alignItems:'center',borderWidth:1,borderColor:'#2abcc8',backgroundColor:'#2abcc8',borderRadius:20,marginBottom:10}}>
              <TouchableWithoutFeedback>
              <Image source={item.image} style={{borderRadius:80,height:300,width:300,alignSelf:'center'}}/>
           <View style={{flexDirection:'row',marginTop:10}}>
            <View>
                <Text style={{marginBottom:5,color:'red',fontWeight:'bold',fontFamily:'roboto'}}>{item.Title}</Text>
                <Text style={{marginBottom:5,color:'black',fontWeight:'bold',fontFamily:'roboto'}}>${item.price}</Text>
            </View>
            <View style={{marginLeft:195}}>
            <Text style={{color:'green',fontWeight:'bold',fontFamily:'roboto'}}>Bid: ${item.bid}</Text>
            </View>
            </View>
              </TouchableWithoutFeedback>
          </View>
        

        }
         
         />
        
    );
}

export default ListingsScreen;