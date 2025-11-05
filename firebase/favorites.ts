/**
 * Simple favorites helpers using Firestore.
 * Functions expect the caller to have an authenticated user (auth.currentUser.uid).
 */
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, auth } from './client';

export type FavoriteItem = {
  id: number | string;
  name: string;
  availableSeats?: number;
  totalSeats?: number;
  distance?: string;
  image?: string;
  createdAt?: any;
};

function userFavoritesCol(uid: string) {
  return collection(db, 'users', uid, 'favorites');
}

export async function listFavoritesOnce(uid: string) {
  const col = userFavoritesCol(uid);
  const q = query(col, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as FavoriteItem);
}

export function listenFavorites(uid: string, onChange: (items: FavoriteItem[]) => void) {
  const col = userFavoritesCol(uid);
  return onSnapshot(col, (snap) => {
    onChange(snap.docs.map((d) => d.data() as FavoriteItem));
  });
}

export async function addFavorite(uid: string, item: FavoriteItem) {
  const ref = doc(db, 'users', uid, 'favorites', String(item.id));
  await setDoc(ref, { ...item, createdAt: new Date() });
}

export async function removeFavorite(uid: string, id: number | string) {
  const ref = doc(db, 'users', uid, 'favorites', String(id));
  await deleteDoc(ref);
}

export async function toggleFavorite(uid: string, item: FavoriteItem) {
  const ref = doc(db, 'users', uid, 'favorites', String(item.id));
  // naive toggle: try to delete if exists otherwise set
  // caller may want to check existence first for UI purposes
  await setDoc(ref, { ...item, createdAt: new Date() });
}
