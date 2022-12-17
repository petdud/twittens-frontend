import { HeadPage } from '../../../layouts/head-page';
import { MainSlot } from '../../../layouts/main-slot';
import { AdminCollectionList } from '../../../components/admin/admin-collection-list/admin-collection-list';
import { AdminAddCollection } from '../../../components/admin/admin-add-collection/admin-add-collection';

export default function Admin() {
  return (
    <div>
      <HeadPage 
        title="Twitten - Admin panel" 
        description="Twittens helps you to find your twitter frens in your favorite NFT collections."
      />

      <MainSlot>
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8 my-12 px-4">
          <AdminAddCollection />
          <AdminCollectionList />
        </div>
      </MainSlot>
    </div>
  );
}
