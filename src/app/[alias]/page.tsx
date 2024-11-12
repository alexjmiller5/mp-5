import { redirect } from 'next/navigation';
import getCollection, { URLS_COLLECTION } from '@/utils/mongodb';

interface Params {
  alias: string;
}

export default async function AliasPage({ params }: { params: Params }) {
  try {
    const { alias } = params;
    const urlsCollection = await getCollection(URLS_COLLECTION);
    const record = await urlsCollection.findOne({ alias });

    if (record) {
      redirect(record.url);
    }
    return (
      <div>
        <h1>Alias not found</h1>
      </div>
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return (
      <div>
        <h1>Service Unavailable</h1>
        <p>Please try again later</p>
      </div>
    );
  }
}