// TO GET FIREBASE YOU HAVE TO FILL IN firebase config data from you firebase console
// More info: https://firebase.google.com/docs/database/web/start

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
	apiKey: "AIzaSyB5v1D3JiofFZrucd16dgViXpT-TJXTaew",
  authDomain: "aisyah-zainal.firebaseapp.com",
  databaseURL: "https://aisyah-zainal-default-rtdb.firebaseio.com",
  projectId: "aisyah-zainal",
  storageBucket: "aisyah-zainal.appspot.com",
  messagingSenderId: "348660786999",
  appId: "1:348660786999:web:3af1ba17d2efba55e61cb2",
  measurementId: "G-WG2023H86V"

	// For databases not in the us-central1 location, databaseURL will be of the
	// form https://[databaseName].[region].firebasedatabase.app.
	// For example, https://your-database-123.europe-west1.firebasedatabase.app
	databaseURL: "https://aisyah-zainal-default-rtdb.firebaseio.com/",
	storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
//var database = firebase.database();