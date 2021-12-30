import React, { useState,useEffect} from 'react';
import { ImageBackground,StyleSheet,View,Image,TextInput,Text,Linking,TouchableOpacity,TouchableWithoutFeedback,FlatList,Modal,Button,Alert,ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,useDrawerStatus } from '@react-navigation/drawer';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth, { firebase } from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';

import storage from '@react-native-firebase/storage';
import SplashScreen from 'react-native-splash-screen';
import firestore from '@react-native-firebase/firestore';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

const listings =[
  {Title: 'Cloths for Sale' ,userId:'grefaf',name:'Muhammad ali', bid: 10, image: require('./android/data/images/cloths.jpg') ,value:1,time:'2 Am',location:'Lahore',contact:12344,description:'huh'},
  {Title: 'Camera for Sale' , userId:'grefaf',name:'Muhammad umair', bid: 20, image: require('./android/data/images/camera.jpg') ,value:2,time:'3 Am',location:'Lahore',contact:12344,description:'huh'},
  {Title: 'Jacket for Sale' ,userId:'grefaf',name:'Muhammad wahaj', bid: 13,image: require('./android/data/images/jacket.jpg') ,value:3,time:'3 Am',location:'Lahore',contact:12344,description:'huh'},
]

const Categories = [
  {label: 'Furniture' , value: 1},
  {label: 'SmartPhone' , value: 2},
  {label: 'Camera' , value: 3},
  {label: 'Clothing' , value: 4},
  {label: 'Sports' , value: 5},
  {label: 'Other' , value: 6}
]

const Locations = [
  {label: 'Lahore' , value: 1},
  {label: 'Islamabad' , value: 2},
  {label: 'Karachi', value: 3},
  {label: 'Faisalabad' , value: 4},
  {label: 'Rawalpindi' , value: 5},
  {label: 'other' , value: 6}
]

const item =[
  {Title: 'Cloths for Sale' , price: 10, bid: 10, image: require('./android/data/images/cloths.jpg')},
  
]

const menuItems = [
  {
    title: "My Listings",
    image: require('./android/data/images/account.png')
  },
  {
    title: "My Messages",
    image: require('./android/data/images/gmail.png')
  },
];

const DATA = [
  {
    title: 'Ali Jahanzaib',
    msg: 'Whatsupp?',
    pic: '',
    time: '6:51 PM',
    unread: '2'
    
  },
  {
    title: 'Ahmad',
    msg: 'Hi',
    pic: '',
    time: '6:49 PM',
    unread: '1'
  },
  {
    title: 'Waleed',
    msg: 'Where are you?',
    pic: '',
    time: '6:45 PM',
    unread: '5'
  },

  {
    title: 'Faizan',
    msg: 'wanna go?',
    pic: '',
    time: '6:33 PM',
    unread: '1'
  },
  {
    title: 'Anas',
    msg: 'Very nice!',
    pic: '',
    time: '6:22 PM',
    unread: '3'
  },
  {
    title: 'Dad',
    msg: 'Come home',
    pic: '',
    time: '5:51 PM',
    unread: '1'
  },

  {
    title: 'Mom',
    msg: 'Where are you going?',
    pic: '',
    time: '1:12 PM',
    unread: '1'
  },
  {
    title: 'Zain',
    msg: 'lets party',
    pic: '',
    time: '8:54 PM',
    unread: '3'
  },
  {
    title: 'Wahaj',
    msg: 'Join meeting',
    pic: '',
    time: '4:50 PM',
    unread: '2'
  },

  {
    title: 'Ali Ahmad',
    msg: 'Dude, Lets meet',
    pic: '',
    time: '9:24 PM',
    unread: '4'
  },
  {
    title: 'Amina',
    msg: 'Tommorrow?',
    pic: '',
    time: '7:55 PM',
    unread: '9'
  },
  {
    title: 'Client',
    msg: 'Excellent job',
    pic: '',
    time: '3:59 PM',
    unread: '3'
  },
];


const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password")
})

const ValidationSchema2 = Yup.object().shape({
  enterName: Yup.string().required().label("UserName"),
  mobilenum: Yup.number().optional().label("MobileNumber"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password")
})

function LoginView({navigation}) {
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    
  
  
  return (
      <ImageBackground blurRadius={3} style = {styles.background} source={require('./android/data/images/background.jpg')}>
       <View style={{flex:1}}>
          <View style={{flex:3,justifyContent:'center'}}>
          <Image style={styles.logo} source={require('./android/data/images/logo.png')}></Image>
          </View>

          <Formik
                  initialValues={{email: '' , password: ''}}
                  onSubmit={(values) => {
                      auth().signInWithEmailAndPassword(values.email,values.password).then(() => {
                          console.log('User signed in')
                          navigation.navigate("Tab")
                          
                            
                          
                          
                      }  )
                        
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
                  <View><Image style = {{height:30,width:30,marginTop:15}} source={require('./android/data/images/email.png')}/></View>
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
                  <View><Image style = {{height:30,width:30,marginTop:15}} source={require('./android/data/images/lock.png')}/></View>
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
                      width: 150,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      
                      borderRadius: 50,
                      marginTop:20
                      
                      

                  }} onPress={() => navigation.navigate("Tab")}>
                  <Image source = {require('./android/data/images/gmail.png')}
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
                      width: 150,
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
                          navigation.navigate('Tab')
                      })
                      .catch(error => {
                          if (error.code === 'auth/operation-not-allowed') {
                          console.log('Enable anonymous in your firebase console.');
                          }

                          console.error(error);
                      })
                  } >
                  <Image source = {require('./android/data/images/anonymous.png')}
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
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{color:'#f37c7c',fontWeight:'bold',fontFamily:'roboto'}}> Sign up</Text></TouchableOpacity>
              </View>
          </View>

       </View>



      </ImageBackground>
  );
} else {
  return (
    <ImageBackground blurRadius={3} style = {styles.background} source={require('./android/data/images/background.jpg')}>
      <View style={{flex:1,alignItems:'center',marginTop:10,justifyContent:'center'}}> 
      <View>
      <Text style={{fontSize:20,fontFamily:'roboto',color:'black'}}>Welcome {user.email}</Text>
      </View>

      <View style={{marginTop:10}}>
          <TouchableOpacity
              style={{
                  width:300,
                  height:40,
                  backgroundColor:'#f37c7c',
                  borderRadius:50,
                  alignItems:'center',
                  justifyContent:'center'
              }} onPress={ () => navigation.navigate("Tab")}
              ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>CONTINUE SELLING</Text></TouchableOpacity>
         </View>
          </View>
      
          </ImageBackground>
  );
}
                
}

function RegisterScreen({navigation}) {
  return (
      <ImageBackground blurRadius={3} style = {styles.background} source={require('./android/data/images/background.jpg')}>
      <View style={{flex:1}}> 
          <View style={{flex:2,justifyContent:'center'}}>
          <Image style={styles.logo} source={require('./android/data/images/logo.png')}></Image>
          </View>
     
          <Formik
                  initialValues={{enterName:'',mobilenum: '',email: '' , password: ''}}
                  onSubmit={(values)=> {
                    try {
                      auth().createUserWithEmailAndPassword(values.email, values.password)
                      .then(() => {
                        
                        firestore().collection('users').doc(auth().currentUser.uid)
                        .set({
                            name: values.enterName,
                            email: values.email,
                            createdAt: firestore.Timestamp.fromDate(new Date()),
                            contact: values.mobilenum
                        })
                        navigation.navigate('Tab')
                        //ensure we catch any errors at this stage to advise us if something does go wrong
                        .catch(error => {
                            console.log('Something went wrong with added user to firestore: ', error);
                        })
                      
                      })
                      //we need to catch the whole sign up process if it fails too.
                      .catch(error => {
                          console.log('Something went wrong with sign up: ', error);
                      });
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                    

                  

                  validationSchema={ValidationSchema2}
                  >
                  {({handleChange,handleSubmit,errors,setFieldTouched,touched}) => (
                      <>
          <View style={{flex:3,alignItems:'center'}}>
                      <View>
                      <TextInput
                      
                      style={styles.TextField2}
                      placeholder="Enter Name"
                      keyboardType="default"
                      autoCapitalize="sentences"
                      autoCorrect={false}
                      onChangeText={handleChange('enterName')}
                      onBlur={() => setFieldTouched('enterName')}
                      />
                      </View>
                      {touched.enterName && <Text style={{color:'red',marginLeft:-150}}>{errors.enterName}</Text>}
                      <View>
                      <TextInput
                      
                      style={styles.TextField2}
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
                      
                      style={styles.TextField2}
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
                      
                      style={styles.TextField2}
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
              }} onPress={handleSubmit}
              ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>SIGN UP</Text></TouchableOpacity>
          </View>
          </>
                  )
                  }
                  </Formik>

          <View style={{flex:0.5,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <View><Text style={{fontFamily:'roboto'}}>Already have an account?</Text></View>
              <View>
                  <TouchableOpacity ><Text style={{color:'#f37c7c',fontWeight:'bold',fontFamily:'roboto'}}> Sign in</Text></TouchableOpacity>
              </View>
          </View>
      </View>
      </ImageBackground>
  );
}

function MyName({id}) {
  
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    
     getUser();
   
  }, []);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(id)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        } 
        
      });
  };
  return(
    <Text style={{fontFamily:'roboto',fontSize:18,color:'#2abcc8',fontWeight:'bold'}}>{userData.name}</Text>

  );
}

function MyNameindetail({id}) {
  
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    
     getUser();
   
  }, []);

  const getUser = async () => {
    setLoading(true)
    await firestore()
      .collection('users')
      .doc(id)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        } 
        
      });
      setLoading(false)
  };
  return(
    <View>
    {loading ? 
      <ActivityIndicator size='small' color="#0000ff" />
      :
    <Text style={{fontWeight: 'bold', fontFamily: 'roboto'}}>{userData.name}</Text>
    }
    </View>
  );
}

function ListingsScreen({navigation}){
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingname, setLoadingname] = useState(true);
  const [fetching, setFetching] = useState(false);
  
  const user = firebase.auth().currentUser
  const [deleted, setDeleted] = useState(false);

  const [err, setErr] = useState('ggadf');
  const [masterdata, setMasterdata] = useState([]);
  const [search, setSearch] = useState('');

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };

  

  const fetchPosts = async () => {
    
    try {
      setFetching(true)
      setLoadingname(true)
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);
           
          querySnapshot.forEach((doc) => {
            const {
              userId,
              title,
              postImg,
              postTime,
              bid,
              location,
              contact,
              description
              
            } = doc.data();
            list.push({
              value: doc.id,
              userId,
              name: 'Test Name',
              time: postTime,
              Title:title,
              bid,
              image:postImg,
              location,
              contact,
              description
            });
          });
        });

      setPosts(list);
      setMasterdata(list);
     
      if (loading) {
        setLoading(false);
      }
      setLoadingname(false)
      setFetching(false)
      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };
 

  useEffect(() => {
    fetchPosts();
    
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  useEffect(() => {
    fetchPosts();
    return () => {

    }
  }, []);

  const SearchFilter = (text) => {
    if (text) {
      const newData = masterdata.filter((item) => {
        const itemData = item.Title ? item.Title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
        setPosts(newData);
        setSearch(text);

    } else {
      setPosts(masterdata)
      setSearch(text);
      
    }
  }

  return(
    <>
    <View style={{marginBottom:10}}>
            <TextInput
                    
                    style={styles.TextField3}
                    placeholder="Search Ad"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={search}
                    onChangeText={(e) => SearchFilter(e)}
                  />
            </View>
      {fetching ? 
      <View style={{flex:0.75,justifyContent:'center'}}>
      <ActivityIndicator size="large" color="#0000ff"  />
      </View>
      :
    <FlatList
    data={posts}
    style={{paddingHorizontal:15}}
    keyExtractor={item => item.value.toString()}
    renderItem={({item}) =>
      
      <View style={{borderWidth:1,borderColor:'#e5e4e2',backgroundColor:'#e5e4e2',borderRadius:20,marginBottom:10}}>
            <View style={{flexDirection:'row'}}>
          <View style={{flex:4,padding:15}}>
            {loadingname ? 
            <ActivityIndicator size='small' color='#0000ff' />
            :
            <MyName id={item.userId}/>
            }
            <Text style={{color:'green',fontWeight:'bold',fontFamily:'roboto'}}>{moment(item.time.toDate()).fromNow()}</Text>
            <View style={{alignContent:'flex-end'}}><Text>{item.location}</Text></View>
          </View>
           {user.uid == item.userId ?
          <View style={{flex:1,justifyContent:'center'}}>
            <TouchableOpacity onPress={() => handleDelete(item.value)}>
              <Image
              style={{
                width:30,
                height:30
              }} source={require('./android/data/images/trash.png')}/>
            </TouchableOpacity>
          </View>
          : null}
          </View>
          
          <TouchableOpacity onPress={() => navigation.navigate('ListingDetails',item,{userId:item.userId})}>

          <Image source={{uri: item.image}} style={{height:300,width:380,alignSelf:'center'}}/>
       <View style={{marginTop:10}}>
        <View style={{padding:15}}>
            <Text style={{marginBottom:5,color:'red',fontWeight:'bold',fontFamily:'roboto',fontSize:18}}>{item.Title}</Text>
            <Text style={{marginBottom:5,color:'black',fontWeight:'bold',fontFamily:'roboto',fontSize:16}}>Bid: ${item.bid}</Text>
        </View>
        
        </View>
          </TouchableOpacity>
      </View>
    

    }
     
     />
  }
     </>
  )
}

function TotalListings({id}){
  const [loading,setLoading] = useState(false);
  const [listings,setListings] = useState();
  const fetchPosts = async () => {
    try {
      setLoading(true)

      await firestore()
        .collection('posts')
        .where("userId",'==',id)
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          console.log('Total Posts: ', querySnapshot.size);
          setListings(querySnapshot.size)
          
        });

        setLoading(false)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
    
    
  }, []);
   return (
     <View>
     {loading ? 
      <ActivityIndicator size='small' color="#0000ff" />
      : 
     
    <Text style={{fontWeight: 'bold', fontFamily: 'roboto'}}>{listings} listings</Text>
    
     }
     </View>
   );
}

function GetContact({id}) {
  const user = firebase.auth().currentUser
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    
     getUser();
   
  }, []);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(id)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        } 
        
      });
  };
  return(
    <View style={{alignItems:'center',marginTop:10}}> 
          <TouchableOpacity
              style={{
                  width:300,
                  height:40,
                  backgroundColor:'#f37c7c',
                  borderRadius:50,
                  alignItems:'center',
                  justifyContent:'center'
              }} onPress={
                () => { if (user) Alert.alert("Contact", "Press Call to Contact Seller", [
                  { text: "Call", onPress: () => 
                  {let phoneNumber = ''; 
                  phoneNumber = 'tel:$'.concat(userData.contact); 
                  Linking.openURL(phoneNumber);  }},
                  { text: "Cancel" },
                ])
                else 
                Alert.alert("Sorry", "You need to Login to Contact", [
                  { text: "Yes",},
                  { text: "No" },
                ])
              }
            }
              ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>Contact</Text></TouchableOpacity>
          </View>

  );
}

function ListingDetailsScreen({navigation,route}) {
  const [modalVisible,setModalVisible]= useState(false);
  const [newBid , setNewBid] = useState();
  const listing = route.params;
  const user = firebase.auth().currentUser

  const [present,setPresent] = useState(false)
  const [currentUser,setCurrentUser] = useState(false)
  const [loading,setLoading] = useState(false)
  const [bidrefresh,setBidrefresh] = useState(false)

  useEffect(() => {
    
    getUser();
  
 }, []);

 const getUser = async () => {
  setLoading(true)
   await firestore()
     .collection('users')
     .doc(user.uid)
     .get()
     .then((documentSnapshot) => {
       if (documentSnapshot.exists) {
         
         
         setPresent(true);
       } 
       setLoading(false)
     });
 };

//  if (user.uid == listing.userId) {
//    setCurrentUser(true)
//  }

 
  
  return (
    
      <>
      <View style={{borderWidth:1,borderColor:'#e5e4e2',backgroundColor:'#e5e4e2',borderRadius:20,marginBottom:10}}>
          
          

          <Image source={{uri :listing.image}} style={{borderRadius:20,height:300,width:370,alignSelf:'center'}}/>
       <View style={{marginTop:10}}>
        <View style={{padding:20}}>
            <Text style={{marginBottom:5,color:'red',fontWeight:'bold',fontFamily:'roboto',fontSize:18}}>{listing.Title}</Text>
            <Text style={{marginBottom:5,color:'black',fontWeight:'bold',fontFamily:'roboto',fontSize:16}}>{listing.description}</Text>
            <Text style={{marginBottom:5,color:'black',fontWeight:'bold',fontFamily:'roboto'}}>Bid: ${listing.bid}</Text>
            
        </View>
        
        </View>
          
      </View>
      
          <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
              <View >
                  <Image source={require('./android/data/images/user.png')} style={{height:35,width:35}}/>
              </View>
              <View style={{marginLeft:5}}>
                  <MyNameindetail id={listing.userId}/>
                  <TotalListings id={listing.userId}/>
                  
              </View>
          </View>
          
          
          {present && ( 
          <View>
          <View style={{alignItems:'center',marginTop:10}}> 
          
     {loading ? 
      <ActivityIndicator size='small' color="#0000ff" />
      : 
          <TouchableOpacity onPress={()=>setModalVisible(true)}
              style={{
                  width:300,
                  height:40,
                  backgroundColor:'#f37c7c',
                  borderRadius:50,
                  alignItems:'center',
                  justifyContent:'center'
              }} 
              ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>Add Your Bid</Text></TouchableOpacity>
            }
               <Modal visible={modalVisible} animationType="slide" >
               
                 <View style={{alignItems:'flex-end',marginRight:10,marginTop:10}}>
                   <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Image style={{height:30,width:30}} source={ require("./android/data/images/close.png")} />
                    </TouchableOpacity>
                 </View>
                
               <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                 <Text style={{fontSize:18,fontWeight:'bold'}}>Make Resonable Bid</Text>
                 <Text style={{fontSize:18,fontWeight:'bold'}}>Best of Luck!</Text>

                 </View>
               <View style={{flex:2,alignItems:'center',backgroundColor:'white'}}>
                 
               <TextInput
                    
                    style={styles.TextField2}
                    placeholder="New Bid"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(e) => setNewBid(e)}
                  />

              <TouchableOpacity style={{
                marginTop: 20,
                marginLeft:10,
                  width:300,
                  height:40,
                  backgroundColor:'#f37c7c',
                  borderRadius:50,
                  alignItems:'center',
                  justifyContent:'center'
              }} onPress={
              () => {
                
                firestore()
                .collection('posts')
                .doc(listing.value)
                .update({
                  bid: newBid,
                })
                .then(() => {
                  console.log('User updated!');
                  setModalVisible(false)
                 
                });
              }
              }> 
                <Text style={{color:'white',fontWeight:'bold'}}>Add</Text>
              </TouchableOpacity>
            </View>
               
               
           </Modal>
          </View>
          
          
           <GetContact id={listing.userId}/>
          </View>
           )}
          {!present && (
            <View style={{alignItems:'center',marginTop:10}}> 
          <TouchableOpacity
              style={{
                  width:300,
                  height:40,
                  backgroundColor:'#f37c7c',
                  borderRadius:50,
                  alignItems:'center',
                  justifyContent:'center'
              }} onPress={
                () => Alert.alert("Contact", "You need to Login first", [
                  { text: "Login", onPress: () => navigation.navigate("Login")},
                  
                  { text: "Cancel" },
                ])
              
            }
              ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>Contact</Text></TouchableOpacity>
          </View>
          )}
          
          </>
  );
}


function AddScreen({navigation}){
  const user = firebase.auth().currentUser
  const [present, setPresent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
   
    getUser();
  }, []);

  

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setPresent(true)
          
        } 
      });
  };
  
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
    const [modalVisible,setModalVisible]= useState(false);
    const [modalVisible2,setModalVisible2]= useState(false);

    const [title,setTitle]= useState('');
    
    const [description,setDescription]= useState('');
    const [bid,setBid]= useState('');
   
    const [image,setImage] = useState();
  //   const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   {label: 'Lahore', value: 'lahore'},
  //   {label: 'Islamabad', value: 'islamabad'},
  //   {label: 'Karachi', value: 'karachi'},
  //   {label: 'Multan', value: 'multan'},
  //   {label: 'Faisalabad', value: 'faisalabad'}
  // ]);

    const [selectCategory,setSelectCategory]= useState('Category');
    const [selectLocation,setSelectLocation]= useState('Choose Location');

    

    const choosePhotoFromLibrary = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7
      }).then(image => {
        console.log(image);
        setImage(image.path);
        console.log(image.path)
      });
    }

    const handlePress = () => {
      if (!image) choosePhotoFromLibrary();
      else
        Alert.alert("Delete", "Are you sure you want to delete this image?", [
          { text: "Yes", onPress: () => setImage(null) },
          { text: "No" },
        ]);
    };

    const submitPost = async () => {
      const imageUrl = await uploadImage();
      console.log('Image Url: ', imageUrl);
      // console.log('Post: ', post);
  
      firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        title: title,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
       
        description: description,
        category:selectCategory,
        bid:bid,
        location:selectLocation
      })
      .then(() => {
        console.log('Post Added!');
        Alert.alert(
          'Post published!',
          'Your post has been published Successfully!',
        );
         setTitle('')
         setDescription('')
         setBid('')
        navigation.navigate("Submit")
        setSubmitted(true)
      })
      .catch((error) => {
        console.log('Something went wrong with added post to firestore.', error);
      });
    }
    
    const uploadImage = async () => {
      if( image == null ) {
        return null;
      }
      const uploadUri = image;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  
      // Add timestamp to File Name
      const extension = filename.split('.').pop(); 
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;
  
      setUploading(true);
      setTransferred(0);
  
      const storageRef = storage().ref(`photos/${filename}`);
      const task = storageRef.putFile(uploadUri);
  
      // Set transferred state
      task.on('state_changed', (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
  
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      });
  
      try {
        await task;
  
        const url = await storageRef.getDownloadURL();
  
        setUploading(false);
        setImage(null);
  
        // Alert.alert(
        //   'Image uploaded!',
        //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
        // );
        return url;
  
      } catch (e) {
        console.log(e);
        return null;
      }
  
    };

    useEffect(() => {
      setSubmitted(false);
    }, [submitted]);

    return (
        <View>
          <View style={{alignItems:'center',marginTop:10}}>
            <TouchableOpacity onPress={handlePress}>
          <View style={{backgroundColor:'lightgrey',height:200,width:200,borderRadius:30,overflow:'hidden',alignItems:'center',justifyContent:'center'}}>
          {!image && (
          <Image source={{uri: "https://img.icons8.com/fluency/96/000000/image-gallery.png" }} style={{height:50,width:50}} />
        )}
            
            { image && <Image source={{uri: image}} style={{height:200,width:200}}/> } 
          </View>
          </TouchableOpacity>
          </View>
          <View style={{alignItems:'center'}}>
          {uploading ? (
            <>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
            </>
        ) : (
          <Text style={{color:'black',fontWeight:'bold',fontSize:12}}></Text>
        )}
          </View>
            <View>
            <TextInput
                    
                    style={styles.TextField3}
                    placeholder="Title"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(e) => setTitle(e)}
                  />
            </View>

            <View>
           <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
               <Text style={styles.TextField3} >{selectCategory}</Text>
           </TouchableWithoutFeedback>
           <Modal visible={modalVisible} animationType="slide">
           <View style={{alignItems:'flex-end',marginRight:10,marginTop:10,backgroundColor:'white'}}>
                   <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Image style={{height:30,width:30}} source={ require("./android/data/images/close.png")} />
                    </TouchableOpacity>
                 </View>
               <FlatList
               data={Categories}
               keyExtractor={item => item.value.toString()}
               numColumns={3}
               style={{backgroundColor:'white',paddingHorizontal:30,}}
               renderItem={({item})=> 
               <TouchableOpacity style={{marginTop:20,marginRight:10,paddingHorizontal:12,borderRadius:50,borderWidth:1,borderColor:'black'}} onPress={() => {setSelectCategory(item.label) 
               setModalVisible(false)}}>
               <Text style= {{padding:10,fontWeight:'bold',fontFamily:'roboto'}}> {item.label}</Text> 
               </TouchableOpacity>
            }
               />
           </Modal>
            </View>

            <View>
            <TextInput
                    
                    style={styles.TextField3}
                    placeholder="Description"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(e) => setDescription(e)}
                    
                    />
            </View>

            <View>
            <TextInput
                    
                    style={styles.TextField3}
                    placeholder="Enter Bid"
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(e) => setBid(e)}
                    
                    />
            </View>

            <View >
            <TouchableWithoutFeedback onPress={() => setModalVisible2(true)}>
               <Text style={styles.TextField3} >{selectLocation}</Text>
           </TouchableWithoutFeedback>
           <Modal visible={modalVisible2} animationType="fade">
           <View style={{alignItems:'flex-end',marginRight:10,marginTop:10,backgroundColor:'white'}}>
                   <TouchableOpacity onPress={() => setModalVisible2(false)}>
                    <Image style={{height:30,width:30}} source={ require("./android/data/images/close.png")} />
                    </TouchableOpacity>
                 </View>
               <FlatList
               data={Locations}
               keyExtractor={item => item.value.toString()}
               numColumns={3}
               style={{backgroundColor:'white',paddingHorizontal:30,}}
               renderItem={({item})=> 
               <TouchableOpacity style={{marginTop:20,marginRight:10,paddingHorizontal:12,borderRadius:50,borderWidth:1,borderColor:'black'}} onPress={() => {setSelectLocation(item.label) 
                setModalVisible2(false)}}>
               <Text style= {{padding:10,fontWeight:'bold',fontFamily:'roboto'}}> {item.label}</Text> 
               </TouchableOpacity>
            }
               />
           </Modal>
            </View>

            {present && (
              <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
            <TouchableOpacity
                style={{
                    width:300,
                    height:40,
                    backgroundColor:'#f37c7c',
                    borderRadius:50,
                    alignItems:'center',
                    justifyContent:'center'

                }} onPress={submitPost} 
                ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>POST</Text></TouchableOpacity>
            </View>
            )}

              {!present && (
              <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
            <TouchableOpacity
                style={{
                    width:300,
                    height:40,
                    backgroundColor:'#f37c7c',
                    borderRadius:50,
                    alignItems:'center',
                    justifyContent:'center'

                }} onPress={() => navigation.navigate('Login')} 
                ><Text style={{color:'white',fontWeight:'bold',fontFamily:'roboto'}}>LOGIN</Text></TouchableOpacity>
            </View>
            )}        


            
                        
                 

        </View>
  )
}

function SubmitScreen({navigation}){
  return (
    <View style={{flex:1,alignItems:'center'}}>
    <Text style={{fontFamily:'robot',fontSize:20,marginTop:150}}>Post Submitted Successfully</Text>
    </View>
  )
}

function AccountScreen({navigation}){
  return(
    <View>
        <View style={{backgroundColor:'white', padding:10,borderBottomWidth:5,borderBottomColor:'white',marginBottom:20}}>


                <View style={{backgroundColor:'white',flexDirection:'row'}}>

                <View style={{flex:1, backgroundColor:'white',alignContent:'center'}}>
                <Image source={require('./android/data/images/user.png')}
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
                                        <Image source={require('./android/data/images/logout.png')}
                                        style={{marginLeft:8,height:35,width:35}}/>
                                    </View>
                                    <View style={{}}>
                                        <Text style={{marginLeft:27,fontSize:15, color:'black',fontFamily:'roboto'}}>LOG OFF</Text>
                                    </View>
                                
                                </View>

                               </TouchableOpacity>
                            </View>
           
            </View>
  )
}

function MessageScreen(){
  return(
    <View style={{flex:5}}>

          <FlatList
              
          data={DATA}
          
          keyExtractor={(item, index) => index}
          
          renderItem={({item,index}) =>

          


          <View style={{backgroundColor:'white', padding:10,borderBottomWidth:5,borderBottomColor:'white'}}>


              <View style={{flex:1,backgroundColor:'white',flexDirection:'row'}}>

                <View style={{flex:1, backgroundColor:'white'}}>
                 <Image source={require('./android/data/images/user.png')}
                style={{height:39,width:39}}
                /> 
               </View>
                
               <View style={{flex:6, backgroundColor:'white'}}>
                

                <Text style={{marginLeft:10,fontSize:15, color:'black',fontFamily:'times'}}> {item.title} </Text>
                <Text style={{marginLeft:10,fontSize:14,marginTop:2, color:'#2f4f4f',fontFamily:'times'}}> {item.msg}</Text> 


               </View>

               <View style={{flex:3, backgroundColor:'white', alignItems:'flex-end'}}>
                
                <Text style={{fontSize:12,color:'#0BCB54'}}> {item.time} </Text>
                <Text style={{color:'white',fontSize:13,marginTop:4,borderRadius:1000,width:17,height:17,borderColor:'#0BCB54',borderWidth:1,backgroundColor:'#0BCB54'}}> {item.unread} </Text>
               </View>

              </View>

                          

            
          </View>
          
          

        }
          />

        </View>
  )
}

const BuyStack = createNativeStackNavigator();

function BuyStackScreen() {
  return (
    <BuyStack.Navigator>
      <BuyStack.Screen name="Listings" component={ListingsScreen} options={{ headerShown: false }} />
      <BuyStack.Screen name="ListingDetails" component={ListingDetailsScreen} options={{ headerShown: false }} />
      
      
    </BuyStack.Navigator>
  );
}

const AddStack = createNativeStackNavigator();
function AddStackScreen(){
  return (
    <AddStack.Navigator>
        <AddStack.Screen name="Add" component={AddScreen} options={{ headerShown: false }} />
        <AddStack.Screen name="Submit" component={SubmitScreen} options={{ headerShown: false }} />
    </AddStack.Navigator>
  )
  }

const MeessagesStack = createNativeStackNavigator();
function MessagesStackScreen(){
  return (
    <MeessagesStack.Navigator>
        <MeessagesStack.Screen name="Messages" component={MessageScreen} options={{ headerShown: false }} />
    </MeessagesStack.Navigator>
  )
  }

function MytotalListings({navigation}){
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = firebase.auth().currentUser
  const [userData, setUserData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [present, setPresent] = useState(false);
  const [masterdata, setMasterdata] = useState([]);
  const [search, setSearch] = useState('');
  const [fetching,setFetching] = useState(false);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setPresent(true)
          setUserData(documentSnapshot.data());
        }
      });
  };

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };


  const fetchPosts = async () => {
    try {
      setFetching(true)
      const list = [];

      await firestore()
        .collection('posts')
        .where("userId",'==',user.uid)
        .orderBy('postTime', 'desc')
        .get()
        
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              title,
              postImg,
              postTime,
              bid,
              location
              
            } = doc.data();
            list.push({
              value: doc.id,
              userId,
              name: 'Test Name',
              time: postTime,
              Title:title,
              bid,
              image:postImg,
              location
            });
          });
        });

      setPosts(list);
      setMasterdata(list);

      if (loading) {
        setLoading(false);
      }
      setFetching(false)
      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation,loading]);

  useEffect(() => {
    fetchPosts();
    return () => {

    }
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const SearchFilter = (text) => {
    if (text) {
      const newData = masterdata.filter((item) => {
        const itemData = item.Title ? item.Title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
        setPosts(newData);
        setSearch(text);

    } else {
      setPosts(masterdata)
      setSearch(text);
      
    }
  }

  return(
    <View>
            
     
      {present && ( 
     <View>
     <View style={{marginBottom:10}}>
            <TextInput
                    
                    style={styles.TextField3}
                    placeholder="Search Ad"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={search}
                    onChangeText={(e) => SearchFilter(e)}
                  />
            </View>
            {fetching ? 
      <View style={{flex:0.75,justifyContent:'center',marginTop:30}}>
      <ActivityIndicator size="large" color="#0000ff"  />
      </View>
      :
    <FlatList
    data={posts}
    style={{paddingHorizontal:15}}
    keyExtractor={item => item.value.toString()}
    renderItem={({item}) =>
    
      <View style={{borderWidth:1,borderColor:'#e5e4e2',backgroundColor:'#e5e4e2',borderRadius:20,marginBottom:10}}>
          
          <View style={{flexDirection:'row'}}>
          <View style={{flex:4,padding:15}}>
            <MyName id={item.userId}/>
            
            <Text style={{color:'green',fontWeight:'bold',fontFamily:'roboto'}}>{moment(item.time.toDate()).fromNow()}</Text>
            <View style={{alignContent:'flex-end'}}><Text>{item.location}</Text></View>
          </View>
           {user.uid == item.userId ?
          <View style={{flex:1,justifyContent:'center'}}>
            <TouchableOpacity onPress={() => handleDelete(item.value)}>
              <Image
              style={{
                width:30,
                height:30
              }} source={require('./android/data/images/trash.png')}/>
            </TouchableOpacity>
          </View>
          : null}
          </View>
          
          
          <TouchableOpacity >

          <Image source={{uri: item.image}} style={{height:300,width:380,alignSelf:'center'}}/>
       <View style={{marginTop:10}}>
        <View style={{padding:15}}>
            <Text style={{marginBottom:5,color:'red',fontWeight:'bold',fontFamily:'roboto',fontSize:18}}>{item.Title}</Text>
            <Text style={{marginBottom:5,color:'black',fontWeight:'bold',fontFamily:'roboto',fontSize:16}}>Bid: ${item.bid}</Text>
        </View>
        
        </View>
          </TouchableOpacity>
      </View>
    

    }
     
     />
  }
  </View>
      )}

   {!present && (
     <View style={{alignContent:'center',alignItems:'center',marginTop:100}}>
     <Text style={{fontSize:20,fontFamily:'roboto'}}>For Logged in Users</Text>
     </View>
   )}
  </View>
  )
}

const Tab = createBottomTabNavigator();
const TabBar = () => {
  return (
    
      <Tab.Navigator 
      screenOptions = {{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
             position: 'absolute',
             left: 20,
             right: 20,
             bottom: 25,
             elevation: 0,
             borderRadius: 15,
             height: 70,
            ...styles.shadow 

          }

      }}
      
      >
        <Tab.Screen name="BuyTab" component={BuyStackScreen}  options={{ 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <Image source = {require('./android/data/images/buy.png')} 
              resizeMode='contain'
               style={{
                 width:25,
                 height:25,
                 tintColor: focused ? '#e32f45' : '#748c94'
                 
               }}
              />
              <Text style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}>Buy</Text>
            </View>
          ),
         }}/>
        <Tab.Screen name="AddTab" component={AddStackScreen}  options={{ 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <Image source = {require('./android/data/images/add.png')} 
              resizeMode='contain'
               style={{
                 width:25,
                 height:25,
                 tintColor: focused ? '#e32f45' : '#748c94'
                 
               }}
              />
              <Text style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}>Add</Text>
            </View>
          ),
         }}/>
        <Tab.Screen name="AccountTab" component={MyDrawer}  options={{ 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <Image source = {require('./android/data/images/account.png')} 
              resizeMode='contain'
               style={{
                 width:25,
                 height:25,
                 tintColor: focused ? '#e32f45' : '#748c94'
                 
               }}
              />
              <Text style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}>Account</Text>
            </View>
          ),
         }}/>
        
      </Tab.Navigator>
    
  );

}

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const [userData, setUserData] = useState([]);
  const user = firebase.auth().currentUser
  const navigation = useNavigation();

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };
  useEffect(() => {
    
    getUser();
  }, []);

  return(
    <View style={{flex:1}}>
     <DrawerContentScrollView {...props}  >
      <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,alignItems:'center',backgroundColor:'#f6f6f6',marginBottom:10}}>
        <View>

        {!userData.name && (<Text>Guest User</Text>)}
        {userData.name && (<Text>{userData.name}</Text>)}
        <Text>{userData.email}</Text>
        </View>
        <View>
          <Image source={require('./android/data/images/user.png')} 
          style={{
              height:40,
              width: 40,
              borderRadius:30

          }}
          />
        </View>
      
      </View>
     <DrawerItemList {...props} />
     
     </DrawerContentScrollView>
     <TouchableOpacity
     style={{position:'absolute',bottom:200,left:0,right:0,padding:10,backgroundColor:'#f6f6f6',borderRadius:10,margin:5}}
     onPress={ () => {
       auth()
      .signOut()
      .then(() => navigation.navigate("Login"));
     }
    }
     >
    
    <Text style={{color:'#f37c7c',marginLeft:5,fontWeight:'bold'}}>Logout</Text>
     </TouchableOpacity>
     </View>
  );
}

const MyDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{

      headerStyle: {
        backgroundColor:'transparent',
        elevation:5,
      },
      headerTintColor:'#e32f45'
    }} 
    
    drawerContent= {(props) => <CustomDrawer{...props} />}
    
    >
      <Drawer.Screen name="My Listings" component={MytotalListings} />
      <Drawer.Screen name="My Messages" component={MessagesStackScreen} />
    </Drawer.Navigator>
  );
};

const Stack = createNativeStackNavigator();
function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginView} options={{headerShown:false}} />
          
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
          <Stack.Screen name="Tab" component={TabBar} options={{headerShown:false}} />
          
        </Stack.Navigator>
      </NavigationContainer>
  );
}

// function App() {
//   return (
//     <LoginScreen/>
//   );
// }

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
  },
  TextField2: {
    borderRadius:50,
    borderWidth:1,
    borderColor:'#83CB87',
    height: 40,
    marginLeft: 10,
    marginTop:20,
    backgroundColor:'#83CB87',
    padding: 10,
    width: 330
  },
  TextField3: {
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
})

export default App;