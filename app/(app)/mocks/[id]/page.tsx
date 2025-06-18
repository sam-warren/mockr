import MockGenerationView from './mock-generation-view'

export default async function MockPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <MockGenerationView generationId={id} />;
}
