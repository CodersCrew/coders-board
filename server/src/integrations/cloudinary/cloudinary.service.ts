import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

import { env } from '../../common/env';
import { toBase64 } from './cloudinary.utils';

@Injectable()
export class CloudinaryService {
  constructor() {
    const [, api_key, api_secret, cloud_name] = /cloudinary:\/\/(\d+):(.+)@(\w+)/.exec(env.CLOUDINARY_URL);

    cloudinary.config({ api_key, api_secret, cloud_name });
  }

  async uploadUserImage(fileOrPath: File | string, fileName?: string): Promise<string> {
    const image = typeof fileOrPath === 'string' ? fileOrPath : toBase64(fileOrPath);

    const data = await cloudinary.uploader.upload(image, {
      folder: `codersboard-development/users/images`,
      allowed_formats: ['jpg', 'png'],
      overwrite: true,
      unique_filename: false,
      public_id: fileName,
    });

    return data.secure_url;
  }

  async uploadUserThumbnail(fileOrPath: File | string, fileName?: string): Promise<string> {
    const image = typeof fileOrPath === 'string' ? fileOrPath : toBase64(fileOrPath);

    const data = await cloudinary.uploader.upload(image, {
      folder: `codersboard-development/users/thumbnails`,
      allowed_formats: ['jpg', 'png'],
      overwrite: true,
      unique_filename: false,
      public_id: fileName,
    });

    return data.secure_url;
  }
}
