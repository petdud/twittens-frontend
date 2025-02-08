import { ILensPicture } from '../../core/collection.interface';

export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const formatPicture = (picture: ILensPicture | undefined) => {
  if (!picture) {
    return '../lens_default.png';
  }
  if (picture.__typename === 'MediaSet') {
    if (picture.original.url.startsWith('ipfs://')) {
      let result = picture.original.url.substring(7, picture.original.url.length);
      return `http://lens.infura-ipfs.io/ipfs/${result}`;
    } else if (picture.original.url.startsWith('ar://')) {
      let result = picture.original.url.substring(4, picture.original.url.length);
      return `http://arweave.net/${result}`;
    } else {
      return picture.original.url;
    }
  } else if (picture.__typename === 'NftImage') {
    return picture.uri;
  } else {
    return picture;
  }
};

export const shortenedAddress = (address: string | undefined) =>
  address &&
  address.slice(0, 5) + '...' + address.slice(address.length - 5, address.length);

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
