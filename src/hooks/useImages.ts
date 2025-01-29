// import { useInfiniteQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import imageService from '../services/images';
import { OrderBy } from 'unsplash-js';

interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface Links {
  self: string;
  html: string;
  photos?: string;
  likes?: string;
  portfolio?: string;
  download?: string;
  download_location?: string;
}

interface User {
  id: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  instagram_username: string;
  twitter_username: string;
  profile_image: ProfileImage;
  links: Links;
}

interface Collection {
  id: number;
  title: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  cover_photo: string | null;
  user: User | null;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface Photo {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: User;
  current_user_collections: Collection[];
  urls: Urls;
  links: Links;
}

export default function () {
  return useQuery<Photo[], Error>({
    queryKey: ['boards-images'],
    queryFn: imageService.collections
      .getPhotos({
        collectionId: '317099',
        orderBy: 'latest' as OrderBy,
        page: 1,
      })
      .then((res) => res.response!.results as Photo[]) as Promise<Photo[]>,
  });
}
