import { useActiveUsersFromCommunity } from "../../hooks/use-active-users-from-community";
import { MainViewHeader } from "../main-view-header/main-view-header";
import { UserList, UserListSkeleton } from "../user-list/user-list";

export const CollectionViewContent = ({slug}: {slug: string}) => {
  const { data, isLoading, error } = useActiveUsersFromCommunity(slug);

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
    return <UserListSkeleton />;
  }

  const { users } = data;

  return <UserList users={users} slug={slug} />;
}
