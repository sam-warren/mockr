import { ResponsiveBreadcrumbs } from "@/components/ui/responsive-breadcrumb";
import { BreadcrumbSegment } from "@/components/ui/responsive-breadcrumb";

export default async function BreadcrumbSlot({
  params,
}: {
  params: Promise<{ all: string[] }>;
}) {
  // Await the params since they are now a Promise in Next.js 15
  const routeParams = await params;

  // Filter out the "app" segment from the breadcrumbs
  const filteredRoutes = routeParams.all.filter((route) => route !== "app");

  const segments: BreadcrumbSegment[] = [
    { label: "Home", href: "/" },
    ...filteredRoutes.map((route, index) => ({
      label: route,
      href:
        index < filteredRoutes.length - 1
          ? `/${routeParams.all
              .slice(0, routeParams.all.indexOf(route) + 1)
              .join("/")}`
          : undefined,
    })),
  ];

  return <ResponsiveBreadcrumbs segments={segments} />;
}
