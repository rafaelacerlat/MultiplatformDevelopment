import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PharmacyAccountScreen from './PharmacyAccountScreen';
import PharmacyBrowser from './PharmacyBrowser';

const Tab = createBottomTabNavigator();

const PharmacyAccess = ()  => { 
    return(
        <Tab.Navigator initialRouteName='PharmacyAccount'>
            <Tab.Screen name='PharmacyAccount' component={PharmacyAccountScreen} />
            <Tab.Screen name='Search' component={PharmacyBrowser}/>
        </Tab.Navigator>

    );
}

export default PharmacyAccess;