// Firebase setup script for Sahayak AI Teaching Assistant
// This script initializes Firebase services and creates necessary collections

import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

// Setup initial collections and documents
async function setupFirebaseCollections() {
  try {
    console.log("Setting up Firebase collections...")

    // Create sample user document
    await setDoc(doc(db, "users", "demo-teacher"), {
      email: "demo@sahayak.ai",
      name: "Demo Teacher",
      schoolName: "Demo School",
      location: "Demo Location",
      preferredLanguage: "english",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Create sample content generation
    await setDoc(doc(db, "contentGenerations", "sample-1"), {
      userId: "demo-teacher",
      contentType: "story",
      prompt: "Create a story about farmers and soil types",
      language: "english",
      gradeLevel: "3-5",
      generatedContent: "Once upon a time, there was a farmer who wanted to learn about different types of soil...",
      createdAt: new Date(),
    })

    // Create sample lesson plan
    await setDoc(doc(db, "lessonPlans", "sample-1"), {
      userId: "demo-teacher",
      subject: "science",
      topic: "Water Cycle",
      duration: 45,
      targetGrades: ["grade3", "grade4"],
      objectives: "Students will understand the water cycle process",
      lessonContent: {
        phases: [
          {
            name: "Introduction",
            duration: 7,
            activities: ["Greet students", "Introduce water cycle topic"],
          },
          {
            name: "Main Teaching",
            duration: 23,
            activities: ["Explain evaporation", "Discuss condensation"],
          },
        ],
        materials: ["Blackboard", "Water", "Charts"],
        assessment: ["Observe participation", "Check understanding"],
      },
      createdAt: new Date(),
    })

    // Create sample knowledge query
    await setDoc(doc(db, "knowledgeQueries", "sample-1"), {
      userId: "demo-teacher",
      question: "Why is the sky blue?",
      language: "english",
      gradeLevel: "4-6",
      answer: {
        explanation:
          "The sky looks blue because of tiny particles in the air that scatter blue light more than other colors.",
        analogy: "Think of it like throwing different colored balls at a wall - blue balls bounce back to you more.",
        activities: ["Look at the sky at different times", "Shine a flashlight through water"],
      },
      createdAt: new Date(),
    })

    console.log("Firebase collections setup completed successfully!")
  } catch (error) {
    console.error("Error setting up Firebase collections:", error)
  }
}

// Run the setup
setupFirebaseCollections()

export { app, db, auth, storage }
