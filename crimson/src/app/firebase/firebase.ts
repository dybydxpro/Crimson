import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Env } from "./../environment/env";

const app = initializeApp(Env.firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;