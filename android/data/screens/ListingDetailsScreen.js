import React from 'react';
import { View, Image, StyleSheet,TouchableWithoutFeedback,Text,TouchableOpacity } from "react-native";

const item =[
    {Title: 'Cloths for Sale' , price: 10, bid: 10, image: require('../images/cloths.jpg')},
    
]
function ListingDetailsScreen(props) {
    return (
        
        <><View style={{ alignItems: 'center', borderWidth: 1, borderColor: '#2abcc8', backgroundColor: '#2abcc8', borderRadius: 20, marginBottom: 10 }}>
            <TouchableWithoutFeedback>
                <Image source={item.image} style={{borderRadius:80, width: 300, height: 300, alignSelf: 'center' }} />
            </TouchableWithoutFeedback>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View>
                    <Text style={{ marginBottom: 5, color: 'red', fontWeight: 'bold', fontFamily: 'roboto' }}>{item.Title}</Text>
                    <Text style={{ marginBottom: 5, color: 'black', fontWeight: 'bold', fontFamily: 'roboto' }}>{item.price}</Text>
                </View>
                <View style={{ marginLeft: 195 }}>
                    <Text style={{ color: 'green', fontWeight: 'bold', fontFamily: 'roboto' }}>Bid: {item.bid}</Text>
                </View>
            </View>

        </View>
        
            <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
                <View >
                    <Image source={require('../images/user.png')} style={{height:35,width:35}}/>
                </View>
                <View style={{marginLeft:5}}>
                    <Text style={{fontWeight: 'bold', fontFamily: 'roboto'}}>Muhammad Umair</Text>
                    <Text style={{fontWeight: 'bold', fontFamily: 'roboto'}}>3 listings</Text>
                </View>
            </View>

            <View style={{alignItems:'center',marginTop:10}}>
            <TouchableOpacity
                style={{
                    width:300,
                    height:40,
                    backgroundColor:'#f37c7c',
                    borderRadius:50,
                    alignItems:'center',
                    justifyContent:'center'
                }} 
                ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>POST</Text></TouchableOpacity>
            </View>
            </>
    );
}

const styles = StyleSheet.create({
    
})

export default ListingDetailsScreen;