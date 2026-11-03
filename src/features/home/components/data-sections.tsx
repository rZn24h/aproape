import { getLocalBusinesses } from "@/features/businesses/server/businesses.service";
import { getPromotedListings, getRecentListings } from "@/features/listings/server/listings.service";
import { BusinessesSectionView } from "./businesses-section";
import { ListingsSectionView } from "./listings-section";

/* Componente server async: fiecare secțiune își încarcă datele independent,
   iar o eroare rămâne izolată în secțiunea ei. */

export async function PromotedListingsSection() {
  return <ListingsSectionView kind="promoted" result={await getPromotedListings()} />;
}

export async function RecentListingsSection() {
  return <ListingsSectionView kind="recent" result={await getRecentListings()} />;
}

export async function LocalBusinessesSection() {
  return <BusinessesSectionView result={await getLocalBusinesses()} />;
}
