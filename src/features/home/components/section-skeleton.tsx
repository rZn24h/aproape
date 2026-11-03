import { LoadingState } from "@/components/shared/states";
import { HomeSection } from "./home-section";

export function SectionSkeleton({ id, title, label }: { id: string; title: string; label: string }) {
  return (
    <HomeSection id={id} title={title}>
      <LoadingState variant="cards" label={label} />
    </HomeSection>
  );
}
