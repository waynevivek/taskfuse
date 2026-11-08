/**
 * Lead capture service for TaskFuse
 * Stores leads into Firestore collection 'leads' with honeypot protection
 */

export interface LeadSubmission {
  email: string;
  source: string;
  tier?: string | null;
  honeypot?: string;
}

export interface LeadResult {
  success: boolean;
  message?: string;
  id?: string;
}

export async function submitLead(payload: LeadSubmission): Promise<LeadResult> {
  // Honeypot check: If bot filled the hidden honeypot field, silently succeed without storing
  if (payload.honeypot && payload.honeypot.trim() !== '') {
    return { success: true };
  }

  const cleanEmail = payload.email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const leadData = {
    email: cleanEmail,
    source: payload.source || 'website',
    tier: payload.tier || null,
    createdAt: new Date().toISOString(),
  };

  try {
    const { getFirestoreDb } = await import('./firebase');
    const db = await getFirestoreDb();
    if (db) {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const docRef = await addDoc(collection(db, 'leads'), {
        ...leadData,
        timestamp: serverTimestamp(),
      });
      return { success: true, id: docRef.id };
    } else {
      console.warn('Firestore database instance not ready');
      return { success: false, message: 'Database connection initializing. Please try again in a moment.' };
    }
  } catch (err) {
    console.error('Firestore write error:', err);
    return { 
      success: false, 
      message: err instanceof Error ? err.message : 'Error recording waitlist entry. Please try again.' 
    };
  }
}
