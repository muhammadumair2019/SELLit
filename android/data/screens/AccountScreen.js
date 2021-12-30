import React from 'react';
import {View, FlatList,TouchableOpacity,Text,Image, TouchableWithoutFeedback } from "react-native";

const menuItems = [
    {
      title: "My Listings",
      image: require('../images/account.png')
    },
    {
      title: "My Messages",
      image: require('../images/gmail.png')
    },
  ];
function AccountScreen(props) {
    return (
        
       <View>
        <View style={{backgroundColor:'white', padding:10,borderBottomWidth:5,borderBottomColor:'white',marginBottom:20}}>


                <View style={{backgroundColor:'white',flexDirection:'row'}}>

                <View style={{flex:1, backgroundColor:'white',alignContent:'center'}}>
                <Image source={require('../images/user.png')}
                style={{height:35,width:35}}
                /> 
                </View>
                
                <View style={{flex:6, backgroundColor:'white'}}>
                

                <Text style={{fontSize:15, color:'black',fontFamily:'roboto'}}>Umair</Text>
                <Text style={{fontSize:14,marginTop:2, color:'#2f4f4f',fontFamily:'roboto'}}>Umairashfaq2015@gmail.com</Text> 


                </View>



                </View>

            


                

        </View>
        
        <View >
                <FlatList
                    data={menuItems}
                    keyExtractor={(menuItem) => menuItem.title}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableWithoutFeedback >
                            <View style={{backgroundColor:'#2abcc8', padding:10,borderBottomWidth:5,borderBottomColor:'white'}}>


                                <View style={{flex:1,backgroundColor:'#2abcc8',flexDirection:'row'}}>

                                <View style={{flex:1, backgroundColor:'#2abcc8'}}>
                                <Image source={item.image}
                                style={{height:35,width:35}}
                                /> 
                                </View>
                                
                                <View style={{flex:6, backgroundColor:'#2abcc8'}}>
                                

                                <Text style={{marginTop:5,fontSize:15, color:'black',fontFamily:'roboto'}}> {item.title} </Text>
                                


                                </View>

                                

                                </View>

                                            


                                </View>
                                </TouchableWithoutFeedback >
                        </View>
                    )} />
            </View>
            
                                <View >
                                <TouchableOpacity >
                            
                                <View style={{backgroundColor:'#f37c7c',height:50,flexDirection:'row',marginTop:40,alignItems:'center'}}>

                                    <View style={{}}>
                                        <Image source={require('../images/logout.png')}
                                        style={{marginLeft:8,height:35,width:35}}/>
                                    </View>
                                    <View style={{}}>
                                        <Text style={{marginLeft:27,fontSize:15, color:'black',fontFamily:'roboto'}}>LOG OFF</Text>
                                    </View>
                                
                                </View>

                               

                                

                                

                                            


                               
                            </TouchableOpacity>
                            </View>
           
            </View>
    );
}



export default AccountScreen;