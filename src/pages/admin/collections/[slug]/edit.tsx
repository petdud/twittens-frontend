import { HeadPage } from '../../../../layouts/head-page';
import { MainSlot } from '../../../../layouts/main-slot';
import { AdminCollectionEdit } from '../../../../components/admin/admin-collection-edit/admin-collection-edit';

export default function Admin() {
  return (
    <div>
      <HeadPage 
        title="Twitten - Admin panel" 
        description="Twittens helps you to find your twitter frens in your favorite NFT collections."
      >
        <script src="https://upload-widget.cloudinary.com/global/all.js" async type="text/javascript" />
      </HeadPage>

      <MainSlot>
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8 my-12 px-4">
          <AdminCollectionEdit />
        </div>
      </MainSlot>
    </div>
  );
}
