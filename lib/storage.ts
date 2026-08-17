import * as SecureStore from 'expo-secure-store';

export type DiaryEntry = {
  id: string;
  text: string;
  createdAt: number;
  updatedAt: number;
};

const ENTRIES_KEY = 'xtrx_entries_v1';
const PIN_KEY = 'xtrx_pin_v1';

export async function getEntries(): Promise<DiaryEntry[]> {
  const raw = await SecureStore.getItemAsync(ENTRIES_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as DiaryEntry[]; } catch { return []; }
}

async function saveAll(entries: DiaryEntry[]) {
  await SecureStore.setItemAsync(ENTRIES_KEY, JSON.stringify(entries));
}

export async function saveNewEntry(text: string): Promise<DiaryEntry> {
  const entries = await getEntries();
  const entry: DiaryEntry = {
    id: Date.now().toString(),
    text: text.trim(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  entries.unshift(entry);
  await saveAll(entries);
  return entry;
}

export async function getEntryById(id: string): Promise<DiaryEntry | null> {
  const entries = await getEntries();
  return entries.find(e => e.id === id) || null;
}

export async function updateEntry(id: string, text: string) {
  const entries = await getEntries();
  const idx = entries.findIndex(e => e.id === id);
  if (idx >= 0) {
    entries[idx].text = text;
    entries[idx].updatedAt = Date.now();
    await saveAll(entries);
  }
}

export async function deleteEntry(id: string) {
  const entries = await getEntries();
  await saveAll(entries.filter(e => e.id!== id));
}

export async function getPin(): Promise<string | null> {
  return await SecureStore.getItemAsync(PIN_KEY);
}

export async function setPin(pin: string) {
  await SecureStore.setItemAsync(PIN_KEY, pin);
}
