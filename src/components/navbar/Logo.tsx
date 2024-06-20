import Image, { ImageProps } from 'next/image';

export function Logo(props: ImageProps) {
  return <Image {...props} alt='' />;
}
