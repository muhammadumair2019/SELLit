import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

import { ImageBackground,StyleSheet,View,Image,TextInput,Text,TouchableOpacity } from 'react-native';

const ValidationSchema = Yup.object().shape({
    enterName: Yup.string().required().label("UserName"),
    mobilenum: Yup.number().optional().label("MobileNumber"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})
function RegisterScreen(props) {
    return (
        <ImageBackground blurRadius={3} style = {styles.background} source={require('../images/background.jpg')}>
        <View style={{flex:1}}> 
            <View style={{flex:2,justifyContent:'center'}}>
            <Image style={styles.logo} source={require('../images/logo.png')}></Image>
            </View>
       
            <Formik
                    initialValues={{enterName:'',mobilenum: '',email: '' , password: ''}}
                    onSubmit={(values)=>console.log(values)}

                    

                    validationSchema={ValidationSchema}
                    >
                    {({handleChange,handleSubmit,errors,setFieldTouched,touched}) => (
                        <>
            <View style={{flex:3,alignItems:'center'}}>
                        <View>
                        <TextInput
                        
                        style={styles.TextField}
                        placeholder="Enter Name"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        onChangeText={handleChange('enterName')}
                        onBlur={() => setFieldTouched('enterName')}
                        />
                        </View>
                        {touched.enterName && <Text style={{color:'red',marginLeft:15}}>{errors.enterName}</Text>}
                        <View>
                        <TextInput
                        
                        style={styles.TextField}
                        placeholder="Mobile Number"
                        keyboardType="numeric"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange('mobilenum')}
                        onBlur={() => setFieldTouched('mobilenum')}
                        
                        />
                        {touched.mobilenum && <Text style={{color:'red',marginLeft:15}}>{errors.mobilenum}</Text>}
                        </View>

                        <View>
                        <TextInput
                        
                        style={styles.TextField}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                        />
                         {touched.email && <Text style={{color:'red',marginLeft:15}}>{errors.email}</Text>}
                        </View>

                        <View>
                        <TextInput
                        
                        style={styles.TextField}
                        placeholder="Password"
                        keyboardType="numeric"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={()=> setFieldTouched("password")}
                        />
                        { touched.password && <Text style={{color:'red',marginLeft:15}}>{errors.password}</Text>}
                        </View>
                </View>

                

            <View style={{flex:0.5,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity
                style={{
                    width:330,
                    height:40,
                    backgroundColor:'#f37c7c',
                    borderRadius:50,
                    alignItems:'center',
                    justifyContent:'center'
                }}
                ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>SIGN UP</Text></TouchableOpacity>
            </View>
            </>
                    )
                    }
                    </Formik>

            <View style={{flex:0.5,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View><Text style={{fontFamily:'roboto'}}>Already have an account?</Text></View>
                <View>
                    <TouchableOpacity><Text style={{color:'#f37c7c',fontWeight:'bold',fontFamily:'roboto'}}> Sign in</Text></TouchableOpacity>
                </View>
            </View>
        </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex:1
    },
    logo: {
        width:100,
        height: 100,
        alignSelf:'center',
        marginTop: 50,
        marginBottom: 20
    },
    TextField: {
        borderRadius:50,
        borderWidth:1,
        borderColor:'#83CB87',
        height: 40,
        marginLeft: 10,
        marginTop:20,
        backgroundColor:'#83CB87',
        padding: 10,
        width: 330
    }
})

export default RegisterScreen;