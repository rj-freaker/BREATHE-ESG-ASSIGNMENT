import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';
import firebaseConfig from './firebase-config';


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();