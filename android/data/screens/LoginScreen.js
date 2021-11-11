import React from 'react';
import { ImageBackground,StyleSheet,View,Image,TextInput,Text,TouchableOpacity } from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

const ValidationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})
function LoginView(props) {
    return (
        <ImageBackground blurRadius={3} style = {styles.background} source={require('../images/background.jpg')}>
         <View style={{flex:1}}>
            <View style={{flex:3,justifyContent:'center'}}>
            <Image style={styles.logo} source={require('../images/logo.png')}></Image>
            </View>

            <Formik
                    initialValues={{email: '' , password: ''}}
                    onSubmit={(values) => {
                        auth().signInWithEmailAndPassword(values.email,values.password).then(() => {
                            console.log('User signed in');
                        })
                          .catch( (error) => {
                              var errorcode = error.errorcode;
                              var errorMessage = error. errorMessage;
                          }
                          ) 
                    } } 

                    

                    validationSchema={ValidationSchema}
                    >
                    {({handleChange,handleSubmit,errors,setFieldTouched,touched}) => (
                        <>
                    <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                    <View><Image style = {{height:30,width:30,marginTop:15}} source={require('../images/email.png')}/></View>
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
                    {touched.email && <Text style={{color:'red'}}>{errors.email}</Text>}
                    </View>
                </View>

                    <View style={{flex:1,flexDirection:'row'}}>
                    <View><Image style = {{height:30,width:30,marginTop:15}} source={require('../images/lock.png')}/></View>
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
                    { touched.password && <Text style={{color:'red'}}>{errors.password}</Text>}
                    </View>
                </View>
            </View>

            <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                style={{
                    width:300,
                    height:40,
                    backgroundColor:'#f37c7c',
                    borderRadius:50,
                    alignItems:'center',
                    justifyContent:'center'
                }} onPress={handleSubmit}
                ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>SIGN IN</Text></TouchableOpacity>
            </View>
                        </>
                    )
                    }
                    </Formik>

            

            <View style={{flex:0.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View>
                        <TouchableOpacity style={{
                        backgroundColor: '#2abcc8',
                        width: 100,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        borderRadius: 50,
                        marginTop:20
                        
                        
                        

                    }}>
                    <Image source = {require('../images/fb.png')}
                        style={{width: 28,
                        height: 22
                    }}
                    />
                    
                    </TouchableOpacity>

                </View>

                <View>
                        <TouchableOpacity style={{
                        backgroundColor: '#2abcc8',
                        width: 100,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        borderRadius: 50,
                        marginTop:20
                        
                        

                    }}>
                    <Image source = {require('../images/gmail.png')}
                        style={{width: 28,
                        height: 22,
                        tintColor:'white'
                    }}
                    />
                    
                    </TouchableOpacity>

                </View>

                <View>
                        <TouchableOpacity style={{
                        backgroundColor: '#2abcc8',
                        width: 100,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                        borderRadius: 50,
                        marginTop:20
                        
                        
                        

                    }} onPress={
                        () => auth()
                        .signInAnonymously()
                        .then(() => {
                            console.log('User signed in anonymously');
                        })
                        .catch(error => {
                            if (error.code === 'auth/operation-not-allowed') {
                            console.log('Enable anonymous in your firebase console.');
                            }

                            console.error(error);
                        })
                    } >
                    <Image source = {require('../images/anonymous.png')}
                        style={{width: 28,
                        height: 22,
                        tintColor: 'white'
                    }}
                    />
                    
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <View><Text style={{fontFamily:'roboto'}}>Don't have an account?</Text></View>
                <View>
                    <TouchableOpacity><Text style={{color:'#f37c7c',fontWeight:'bold',fontFamily:'roboto'}}> Sign up</Text></TouchableOpacity>
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
        borderBottomWidth:1,
        borderColor:'grey',
        height: 40,
        marginLeft: 10,
        marginTop:10,
        
        padding: 10,
        width: 300
    }
})

export default LoginView;