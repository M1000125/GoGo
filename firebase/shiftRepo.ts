import {
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { ShiftState, AgentDecision, AgentType } from "@/lib/types";

const SHIFTS_COLLECTION = "shifts";

export function getShiftDocRef(shiftId: string) {
  return doc(db, SHIFTS_COLLECTION, shiftId);
}

export async function createShift(shift: ShiftState): Promise<void> {
  const ref = getShiftDocRef(shift.id);
  await setDoc(ref, { ...shift, createdAt: serverTimestamp() });
}

export async function updateShift(
  shiftId: string,
  data: Partial<ShiftState>
): Promise<void> {
  const ref = getShiftDocRef(shiftId);
  await updateDoc(ref, data as Record<string, unknown>);
}

export function subscribeToShift(
  shiftId: string,
  callback: (shift: ShiftState | null) => void
): () => void {
  const ref = getShiftDocRef(shiftId);
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? (snap.data() as ShiftState) : null);
  });
}

export async function logDecision(
  shiftId: string,
  agentType: AgentType,
  decision: AgentDecision
): Promise<void> {
  const ref = collection(
    db,
    SHIFTS_COLLECTION,
    shiftId,
    `${agentType}_decisions`
  );
  await addDoc(ref, { ...decision, loggedAt: serverTimestamp() });
}
