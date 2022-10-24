// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAj_mP5ZlemWgG1htH_7sUBGq1By9auXd4",
    authDomain: "clubactivitymanagementsystem.firebaseapp.com",
    projectId: "clubactivitymanagementsystem",
    storageBucket: "clubactivitymanagementsystem.appspot.com",
    messagingSenderId: "481529237761",
    appId: "1:481529237761:web:78cb657411c44b8753cb00",
    measurementId: "G-CR0WVKWHM2"
  };

// Initialize Firebase
const app =!getApps.length? initializeApp(firebaseConfig): getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage,app };
