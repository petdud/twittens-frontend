import { useUsersByCommunity } from "../../hooks/use-users-by-community";
import { MainViewHeader } from "../main-view-header/main-view-header";
import { TwitterList, TwitterListSkeleton } from "../twitter-list/twitter-list";

export const CollectionViewContent = ({slug}: {slug: string}) => {
  const { data, isLoading, error } = useUsersByCommunity(slug);

  if (error) {
    return (
      <div className="py-6">
        <MainViewHeader title={<div>Sorry, something went wrong 🫣.</div>} />
      </div>
    )
  }

  if (!data && !isLoading) {
    return (
      <div className="py-6">
        <MainViewHeader title={<div>Sorry, we didn&apos;t find a collection called {slug} 🫣.</div>} />
      </div>
    )
  }

  if (isLoading || !data) {
    return <TwitterListSkeleton />;
  }

  const { users } = data;

  return <TwitterList users={users} />;
}
