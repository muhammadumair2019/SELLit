import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const listings =[
    {Title: 'Cloths for Sale' , price: 10, image: require('../images/cloths.jpg') ,value:1},
    {Title: 'Camera for Sale' , price: 100, image: require('../images/camera.jpg') ,value:2},
    {Title: 'Jacket for Sale' , price: 20, image: require('../images/jacket.jpg') ,value:3},
]
function ListingsScreen(props) {
    return (
        
         <FlatList
        data={listings}
        keyExtractor={item => item.value.toString()}
        renderItem={({item}) =>
        
          <View>
              <TouchableWithoutFeedback>
              <Image source={item.image} style={{width:300,height:300,alignSelf:'center'}}/>
              </TouchableWithoutFeedback>
          </View>
        

        }
         
         />
        
    );
}

export default ListingsScreen;