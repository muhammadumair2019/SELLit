import React, { useState ,useEffect,useRef} from 'react';
import { Image,View,TextInput,StyleSheet,TouchableWithoutFeedback,TouchableOpacity,Text,Modal, Button, FlatList,ScrollView} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const Categories = [
    {label: 'Furniture' , value: 1},
    {label: 'SmartPhone' , value: 2},
    {label: 'Camera' , value: 3},
    {label: 'Clothing' , value: 4},
    {label: 'Sports' , value: 5},
    {label: 'Other' , value: 6}
]



function NewPosting(props) {
    const [modalVisible,setModalVisible]= useState(false);

    const [title,setTitle]= useState('');
    const [price,setPrice]= useState('');
    const [description,setDescription]= useState('');
    const [bid,setBid]= useState('');
    const [image,setImage] = useState();

    const [selectCategory,setSelectCategory]= useState('Category');
    return (
        <View>
            
            <ImageInput imageUri={images}/>

            <View>
            <TextInput
                    
                    style={styles.TextField}
                    placeholder="Title"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(e) => setTitle(e)}
                  />
            </View>

            <View>
            <TextInput
                    
                    style={styles.TextField}
                    placeholder="Price"
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(e) => setPrice(e)}
                    />
            </View>

            <View>
           <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
               <Text style={styles.TextField} >{selectCategory}</Text>
           </TouchableWithoutFeedback>
           <Modal visible={modalVisible} animationType="slide">
               <Button title='close'  onPress={() => setModalVisible(false)}></Button>
               <FlatList
               data={Categories}
               keyExtractor={item => item.value.toString()}
               numColumns={3}
               style={{backgroundColor:'#2abcc8',paddingHorizontal:30,}}
               renderItem={({item})=> 
               <TouchableOpacity style={{marginTop:20,marginRight:10,paddingHorizontal:12,borderRadius:50,borderWidth:1,borderColor:'white'}} onPress={() => {setSelectCategory(item.label) 
               setModalVisible(false)}}>
               <Text style= {{padding:10,fontWeight:'bold',fontFamily:'roboto'}}> {item.label}</Text> 
               </TouchableOpacity>
            }
               />
           </Modal>
            </View>

            <View>
            <TextInput
                    
                    style={styles.TextField}
                    placeholder="Description"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(e) => setDescription(e)}
                    
                    />
            </View>

            <View>
            <TextInput
                    
                    style={styles.TextField}
                    placeholder="Enter Bid"
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(e) => setBid(e)}
                    
                    />
            </View>

            <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
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
                        
                 

        </View>
    );
}
const styles = StyleSheet.create({
    TextField: {
        borderRadius:50,
        borderWidth:1,
        borderColor:'grey',
        height: 40,
        marginLeft: 20,
        marginTop:10,
        fontFamily:'roboto',
        padding: 10,
        width: 370
    },
    container: {
        alignItems: "center",
        backgroundColor: 'lightgrey',
        borderRadius: 15,
        height: 100,
        justifyContent: "center",
        marginVertical: 10,
        overflow: "hidden",
        width: 100,
      },
      image: {
        height: "100%",
        width: "100%",
      },
      containerlist: {
        flexDirection: "row",
      },
      imagelist: {
        marginRight: 10,
      },
})

export default NewPosting;