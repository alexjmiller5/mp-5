import getCollection, { URLS_COLLECTION } from '../../../../mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { url, alias } = await request.json();

  // Validate URL
  const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm;
  if (!urlRegex.test(url)) {
    return NextResponse.json({ error: 'Invalid URL format. URL must start with http:// or https:// and contain valid characters' }, { status: 400 });
  }

  // Validate alias
  const aliasRegex = /^[a-zA-Z0-9-_]+$/;
  if (!aliasRegex.test(alias)) {
    return NextResponse.json({ error: 'Invalid alias. Use only letters, numbers, hyphens, and underscores' }, { status: 400 });
  }

  const urlsCollection = await getCollection(URLS_COLLECTION);

  // Check if alias already exists
  const existing = await urlsCollection.findOne({ alias });
  if (existing) {
    return NextResponse.json({ error: 'Alias already exists' }, { status: 400 });
  }

  // Store URL and alias in database
  await urlsCollection.insertOne({ url, alias });

  return NextResponse.json({ message: 'URL shortened successfully' });
}