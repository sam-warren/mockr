export default async function TemplatePage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
  
    return <div>Template {id}</div>;
  }
  