import { AdvancedImage, responsive } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { useCloudinaryContext } from '../../core/cloudinary-provider';

interface ICloudinaryImageProps {
  id: string;
}

export const CloudinaryImage = ({ id }: ICloudinaryImageProps) => {
  const cloudinary = useCloudinaryContext();
  const image = cloudinary.image(id);
  const plugins = [responsive()];

  return (
    <AdvancedImage
      cldImg={image.resize(thumbnail().width(20)).roundCorners(byRadius(50))}
      plugins={plugins}
    />
  );
};
