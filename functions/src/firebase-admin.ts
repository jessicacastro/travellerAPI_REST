import * as firebaseAdmin from 'firebase-admin';
import serviceAccount from './keys/traveller-api.json';
const key: any = serviceAccount;


const adm  = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(key),
  databaseURL: "https://traveller-5503d.firebaseapp.com"
});

const db = adm.firestore();
const auth = adm.auth();
const storage = adm.storage();
const batch = db.batch()

export {
  db,
  auth,
  storage,
  batch
}
