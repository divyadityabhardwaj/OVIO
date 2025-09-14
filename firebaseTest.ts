/**
 * How to run:
 * 1. Ensure you have your Firebase config values set in your environment variables.
 * 2. Install dependencies: npm install firebase
 * 3. Run with ts-node: npx ts-node firebaseTest.ts
 *    OR
 *    Compile: tsc firebaseTest.ts && node firebaseTest.js
 */
import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testWrite() {
  try {
    const testDocRef = doc(db, "testCollection", "testDoc");
    await setDoc(testDocRef, {
      message: "Hello, Firebase!",
      timestamp: Timestamp.now(), // Use Firestore Timestamp
    });
    console.log("Test document written successfully!");
  } catch (error) {
    console.error("Error writing test document:", error);
  }
}

testWrite();
