import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { EMPTY_USER_IMAGE, EMPTY_USER_THUMBNAIL } from 'src/common/constants';

import { env } from '../../common/env';
import { toBase64 } from './cloudinary.utils';

@Injectable()
export class CloudinaryService {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [, api_key, api_secret, cloud_name] = /cloudinary:\/\/(\d+):(.+)@(\w+)/.exec(env.CLOUDINARY_URL);

    cloudinary.config({ api_key, api_secret, cloud_name });
  }

  async uploadUserImage(fileOrPath: File | string, fileName?: string): Promise<string> {
    const image = typeof fileOrPath === 'string' ? fileOrPath : toBase64(fileOrPath);

    const data = await cloudinary.uploader.upload(image, {
      folder: `codersboard-${env.NODE_ENV}/users/images`,
      allowed_formats: ['jpg', 'png'],
      overwrite: true,
      unique_filename: false,
      public_id: fileName,
    });

    return data.secure_url;
  }

  async deleteUserImage(fileName: string): Promise<string> {
    const path = `codersboard-${env.NODE_ENV}/users/images/${fileName}`;

    await cloudinary.uploader.destroy(path);

    return EMPTY_USER_IMAGE;
  }

  async uploadUserThumbnail(fileOrPath: File | string, fileName?: string): Promise<string> {
    const image = typeof fileOrPath === 'string' ? fileOrPath : toBase64(fileOrPath);

    const data = await cloudinary.uploader.upload(image, {
      folder: `codersboard-${env.NODE_ENV}/users/thumbnails`,
      allowed_formats: ['jpg', 'png'],
      overwrite: true,
      unique_filename: false,
      public_id: fileName,
    });

    return data.secure_url;
  }

  async deleteUserThumbnail(fileName: string): Promise<string> {
    const path = `codersboard-${env.NODE_ENV}/users/thumbnails/${fileName}`;

    await cloudinary.uploader.destroy(path);

    return EMPTY_USER_THUMBNAIL;
  }
}
