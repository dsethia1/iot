/**
 * Helpers for uploading sensor readings to Firestore.
 * For low-to-moderate rates this approach is fine; for very high-frequency
 * telemetry consider Realtime Database or a dedicated ingestion pipeline.
 */
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './client';

export type SensorReading = {
  ts?: any;
  type: string;
  payload: any;
};

export async function uploadSensorReading(deviceId: string, reading: SensorReading) {
  const col = collection(db, 'sensors', deviceId, 'readings');
  await addDoc(col, { ...reading, ts: serverTimestamp() });
}

export async function uploadSensorBatch(deviceId: string, readings: SensorReading[]) {
  const col = collection(db, 'sensors', deviceId, 'readings');
  await Promise.all(readings.map((r) => addDoc(col, { ...r, ts: serverTimestamp() })));
}
