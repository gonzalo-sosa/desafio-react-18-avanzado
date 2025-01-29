import { createApi } from 'unsplash-js';
import config from '@/config';

const unsplash = createApi({
  accessKey: config.unplash_api_key,
});

type src_type = 'full' | 'raw' | 'regular' | 'small' | 'small_s3' | 'thumb';

export function mapData(image, src_type: src_type) {
  const style = image.height > 4000 ? { gridRow: 'span 2' } : {};

  return {
    id: image.id,
    src: image.urls[src_type],
    alt: image.alt_description,
    width: 400,
    created_at: image.created_at,
    likes: image.likes,
    user: {
      username: image.user.username,
      image: image.user.profile_image.medium,
    },
    style,
  };
}

export default unsplash;
