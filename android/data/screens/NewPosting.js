import React, { useState } from 'react';
import { View,TextInput,StyleSheet,TouchableWithoutFeedback,TouchableOpacity,Text,Modal, Button, FlatList} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
const Categories = [
    {label: 'Furniture' , value: 1},
    {label: 'SmartPhone' , value: 2},
    {label: 'Camera' , value: 3},
    {label: 'Clothing' , value: 4},
    {label: 'Sports' , value: 5},
    {label: 'Other' , value: 6}
]
const ValidationSchema = Yup.object().shape({
    title: Yup.string().required().label("Title"),
    price: Yup.string().required().max(100000).label("Price"),
    description: Yup.string().required().label("Title")
})

function NewPosting(props) {
    const [modalVisible,setModalVisible]= useState(false);
    const [selectCategory,setSelectCategory]= useState('Category');
    return (
        <View>
            <Formik
                    initialValues={{title: '' , price: '',description: ''}}
                    onSubmit={(values) => {console.log(values)} } 

                    

                    validationSchema={ValidationSchema}
                    >
                    {({handleChange,handleSubmit,errors,setFieldTouched,touched}) => (
                        <>

            <View>
            <TextInput
                    
                    style={styles.TextField}
                    placeholder="Title"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={handleChange('title')}
                    onBlur={() => setFieldTouched('title')}
                    
                    />
                    {touched.title && <Text style={{color:'red',marginLeft:25}}>{errors.title}</Text>}
            </View>

            <View>
            <TextInput
                    
                    style={styles.TextField}
                    placeholder="Price"
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={handleChange('price')}
                    onBlur={() => setFieldTouched('price')}
                    
                    />
                    {touched.price && <Text style={{color:'red',marginLeft:25}}>{errors.price}</Text>}
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
                    onChangeText={handleChange('description')}
                    onBlur={() => setFieldTouched('description')}
                    
                    />
                    {touched.description && <Text style={{color:'red',marginLeft:25}}>{errors.description}</Text>}
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
                }} onPress={handleSubmit}
                ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>POST</Text></TouchableOpacity>
            </View>
                       
            </>
                    )
                    }
                    </Formik>      

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
    }
})

export default NewPosting;