export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const shortenedAddress = (address: string | undefined) =>
  address && address.slice(0, 5) + '...' + address.slice(address.length - 5, address.length);

export const capitalizeFirstLetter = (string: string) => 
  string.charAt(0).toUpperCase() + string.slice(1);