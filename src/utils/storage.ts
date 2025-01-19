import { StorageError } from '@supabase/storage-js';
import { supabase } from '../lib/supabase';

const BUCKET_NAME = 'lease-documents';

export class StorageService {
  private static instance: StorageService;
  private bucketInitialized = false;

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async uploadFile(file: File, userId: string): Promise<string> {
    try {
      // Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      if (error instanceof StorageError && error.statusCode === 404) {
        throw new Error('Storage bucket not found. Please ensure the bucket is properly configured.');
      }
      throw error;
    }
  }
}