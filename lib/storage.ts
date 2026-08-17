import * as SecureStore from 'expo-secure-store';
export type DiaryEntry = {
  id: string;
  text: string;
  createdAt: number;
  updatedAt: number;
  imageUri?: string;
  audioUri?: string;
};
const ENTRIES_KEY = 'xtrx_entries_v2';
const PIN_KEY = 'xtrx_pin_v1';
export async function getEntries(): Promise<DiaryEntry[]> {
  const raw = await SecureStore.getItemAsync(ENTRIES_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as DiaryEntry[]; } catch { return []; }
}
async function saveAll(entries: DiaryEntry[]) {
  await SecureStore.setItemAsync(ENTRIES_KEY, JSON.stringify(entries));
}
export async function saveNewEntry(entry: { text: string; imageUri?: string; audioUri?: string }) {
  const entries = await getEntries();
  const newEntry: DiaryEntry = {
    id: Date.now().toString(),
    text: entry.text.trim(),
    imageUri: entry.imageUri,
    audioUri: entry.audioUri,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  entries.unshift(newEntry);
  await saveAll(entries);
  return newEntry;
}
export async function getEntryById(id: string) {
  const entries = await getEntries();
  return entries.find(e => e.id === id) || null;
}
export async function updateEntry(id: string, data: Partial<DiaryEntry>) {
  const entries = await getEntries();
  const idx = entries.findIndex(e => e.id === id);
  if (idx >= 0) { entries[idx] = {...entries[idx],...data, updatedAt: Date.now()}; await saveAll(entries); }
}
export async function deleteEntry(id: string) {
  const entries = await getEntries();
  await saveAll(entries.filter(e => e.id!== id));
}
export async function getPin() { return await SecureStore.getItemAsync(PIN_KEY); }
export async function setPin(pin: string) { await SecureStore.setItemAsync(PIN_KEY, pin); }
