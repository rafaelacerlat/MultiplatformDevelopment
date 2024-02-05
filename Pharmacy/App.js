import OnBoardingScreen from './components/OnBoardingScreen';
import FreeAccessScreen from './components/FreeAccessScreen';
import {NavigationContainer} from '@react-navigation/native' 
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as firebase from './Firebase.config.js';
import RegisterLoginScreens from './components/LoginScreen';
import PharmacyAccountScreen from './components/PharmacyAccountScreen';
import EditProfileScreen from './components/EditProfileScreen';
import LoginScreen from './components/LoginScreen';
import RegistrationScreen from './components/RegistrationScreen';
import PharmacyBrowser from './components/PharmacyBrowser';
import PharmacyAccess from './components/PharmacyAccess';
import AdminServiceDistribution from './components/AdminServiceDistribution';
import AdminAccountScreen from './components/AdminAccountScreen';
import PickRangeScreen from './screens/PickRangeScreen';
import SwitchRequestScreen from './screens/SwitchRequestScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  // async componentDidMount () {
  //   await Expo.Font.loadAsync({
  //       Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
  //   });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouterName="OnBoarding">
        <Stack.Screen name="OnBoarding" component ={OnBoardingScreen}/>
        <Stack.Screen name="FreeAccess" component ={FreeAccessScreen}/>
        <Stack.Screen name="Login" component ={LoginScreen}/>
        <Stack.Screen name="Registration" component ={RegistrationScreen}/>
        <Stack.Screen name="EditProfile" component ={EditProfileScreen}/>
        <Stack.Screen name="SwitchRequest" component ={SwitchRequestScreen}/>
        <Stack.Screen name="PharmacyAccess" component ={PharmacyAccess}/>
        <Stack.Screen name="Admin" component ={AdminAccountScreen}/>
        <Stack.Screen name="ServiceDistribution" component ={AdminServiceDistribution}/>
        <Stack.Screen name="PickRange" component ={PickRangeScreen}/>
      </Stack.Navigator>
     </NavigationContainer>
  );
}
