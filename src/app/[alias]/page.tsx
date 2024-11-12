import { redirect } from 'next/navigation';
import getCollection, { URLS_COLLECTION } from '@/utils/mongodb';

// Define PageProps interface with Promise params
interface PageProps {
  params: Promise<{ alias: string }>;
}

export default async function AliasPage({ 
  params 
}: PageProps) {
  try {
    const resolvedParams = await params;
    const { alias } = resolvedParams;
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
        <h1>Error occurred</h1>
      </div>
    );
  }
}