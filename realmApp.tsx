import Realm from "realm";


// Invokes the shared instance of the Realm app.
const app = new Realm.App({id: "langerhans-uclpm"}); // Set Realm app ID here.
export default app;