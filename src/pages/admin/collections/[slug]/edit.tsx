import { HeadPage } from '../../../../layouts/head-page';
import { MainSlot } from '../../../../layouts/main-slot';
import { AdminCollectionEdit } from '../../../../components/admin/admin-collection-edit/admin-collection-edit';
import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();
  const slug = router.query.slug as string;
  
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
          <AdminCollectionEdit slug={slug} />
        </div>
      </MainSlot>
    </div>
  );
}
