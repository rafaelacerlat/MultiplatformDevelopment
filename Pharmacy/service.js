import {getAuth} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {db} from './Firebase.config';

const getUserData = async (onGetData) => {

    const auth = getAuth();
    const user = auth.currentUser;

    const docReference1 = doc(db, "pharmacies", user.email);
    const pharmacies = await getDoc(docReference1);

    onGetData(pharmacies.data());
}

const getSchedule = async (onGetData) => {
    const colRef = collection(db, "schedule");

    const dates = await getDocs(colRef);
}

export {getUserData, getSchedule};