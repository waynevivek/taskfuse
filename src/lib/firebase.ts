import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { 
  getAuth, 
  type Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged, 
  type User 
} from 'firebase/auth';
import rawConfig from '../../firebase-applet-config.json';

let appInstance: FirebaseApp | null = null;
let firestoreInstance: Firestore | null = null;
let authInstance: Auth | null = null;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const auth = authInstance;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function getFirebaseApp(): FirebaseApp | null {
  if (appInstance) return appInstance;
  try {
    const config = rawConfig as Record<string, string>;
    if (!config || !config.apiKey) {
      return null;
    }

    if (!getApps().length) {
      appInstance = initializeApp(config);
    } else {
      appInstance = getApps()[0];
    }
    return appInstance;
  } catch (err) {
    console.warn('Firebase initialization note:', err);
    return null;
  }
}

export async function getFirestoreDb(): Promise<Firestore | null> {
  if (firestoreInstance) return firestoreInstance;
  const app = getFirebaseApp();
  if (!app) return null;

  try {
    const config = rawConfig as Record<string, string>;
    const dbId = config.firestoreDatabaseId;
    firestoreInstance = dbId ? getFirestore(app, dbId) : getFirestore(app);
    return firestoreInstance;
  } catch (err) {
    console.warn('Firestore instance note:', err);
    return null;
  }
}

export function getFirebaseAuth(): Auth | null {
  if (authInstance) return authInstance;
  const app = getFirebaseApp();
  if (!app) return null;

  try {
    authInstance = getAuth(app);
    return authInstance;
  } catch (err) {
    console.warn('Firebase Auth note:', err);
    return null;
  }
}

export async function signInWithGoogle(): Promise<User | null> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Firebase Auth is not initialized');
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOutUser(): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) return;
  await fbSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  const auth = getFirebaseAuth();
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
