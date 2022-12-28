import { HeadPage } from '../../../../layouts/head-page';
import { MainSlot } from '../../../../layouts/main-slot';
import { AdminCollectionEdit } from '../../../../components/admin/admin-collection-edit/admin-collection-edit';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MainViewHeader } from '../../../../components/main-view-header/main-view-header';

export default function Admin() {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/admin/login");
    },
  })

  const isLoading = status === "loading";

  return (
    <>
      <HeadPage 
        title="Twittens - Admin panel" 
        description="Twittens helps you to find your twitter frens in your favorite NFT collections."
      >
        <>
          <meta name="robots" content="noindex,follow" />
          <script src="https://upload-widget.cloudinary.com/global/all.js" async type="text/javascript" />
        </>
      </HeadPage>

      <MainSlot>
        <>
          {isLoading ?
              <MainViewHeader title="Loading..." />
            : !data ? 
              <MainViewHeader title="Error" /> 
            : (
              <div className="mx-auto max-w-3xl sm:px-6 lg:px-8 my-12 px-4">
                <AdminCollectionEdit />
              </div>
            )
          }
        </>
      </MainSlot>
    </>
  );
}
