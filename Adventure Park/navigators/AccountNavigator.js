import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParkDetails from '../screens/ParkDetails';
import Search from '../screens/Search';
import Wishlist from '../screens/Wishlist';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const AccountNavigator = ()  => { 
    return(
        <Tab.Navigator initialRouteName='ParkDetails'>
            <Tab.Screen 
                name='Park Details' 
                component={ParkDetails} 
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Icon name="planet-outline" size={24}/>
                    )
                }}
            />

            <Tab.Screen 
                name='Activities' 
                component={Search} 
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Icon name="search-outline" size={24}/>
                    )
                }}
            />

            <Tab.Screen 
                name='Wishlist' 
                component={Wishlist}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Icon name="heart-outline" size={24}/>
                    )
                }}
            />

            <Tab.Screen 
                name='Profile' 
                component={Profile}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person-outline" size={24}/>
                    )
                }}
            />

        </Tab.Navigator>

    );
}

export default AccountNavigator;