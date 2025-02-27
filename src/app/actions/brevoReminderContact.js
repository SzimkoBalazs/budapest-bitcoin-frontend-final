// brevoContactAction.js
import { NextResponse } from "next/server";


const BREVO_API_URL = process.env.BREVO_API_URL;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const PENDING_LIST_ID = process.env.BREVO_REMINDER_LIST_ID;

if (!BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY not defined in environment variables.");
}
if (!PENDING_LIST_ID) {
  throw new Error("BREVO_PENDING_LIST_ID not defined in environment variables.");
}

async function addContact(email) {
    console.log("add contact run");
  const res = await fetch(`${BREVO_API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      email: email,
      listIds: [Number(PENDING_LIST_ID)],
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (errorData.code === 'duplicate_parameter') {
      const updateRes = await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify({
          listIds: [Number(PENDING_LIST_ID)],
        }),
      });
      if (!updateRes.ok) {
        throw new Error(`Failed to update contact: ${await updateRes.text()}`);
      }
      return await updateRes.json();
    }
    throw new Error(`Failed to create contact: ${JSON.stringify(errorData)}`);
  }
  return await res.json();
}

async function removeContact(email) {
    // A Brevo API URL-je (ellenőrizd, hogy a .env-ben helyesen van-e beállítva)
    const url = `${BREVO_API_URL}/contacts/lists/${PENDING_LIST_ID}/contacts/remove`;
    console.log("Removing contact with URL:", url);
  
    const deleteRes = await fetch(url, {
      method: 'POST', // Itt POST metódust használunk!
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({ emails: [email] }),
    });
    
    if (!deleteRes.ok) {
      const responseText = await deleteRes.text();
      throw new Error(`Failed to remove contact: ${responseText}`);
    }
    
    return await deleteRes.json();
  }
  
  

/**
 * Kezeli a kontakt felvételét vagy eltávolítását a Brevo listáról.
 * Ha subscribe=true, felveszi a kontaktot, egyébként eltávolítja.
 */
export async function handleContactSubscription({ email, subscribe = true }) {
  if (subscribe) {
    return await addContact(email);
  } else {
    return await removeContact(email);
  }
}
