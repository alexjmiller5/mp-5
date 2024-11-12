import getCollection, { URLS_COLLECTION } from '../../../mongodb';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ alias: string }>;
}

export default async function AliasPage({
  params
}: PageProps) {
  let url: string | undefined;

  try {
    const resolvedParams = await params;
    const { alias } = resolvedParams;
    const urlsCollection = await getCollection(URLS_COLLECTION);
    const record = await urlsCollection.findOne({ alias });
    url = record?.url;
  } catch (error) {
    console.error('Error processing request:', error);
    return (
      <div>
        <h1>Error occurred</h1>
      </div>
    );
  }

  if (url) {
    redirect(url);
  }

  return (
    <div>
      <h1>Alias not found</h1>
    </div>
  );
}