import { StorageService } from './storage';
import { supabase } from '../lib/supabase';
import type { WebhookResponse } from '../types/webhook';

export async function handleFileUpload(file: File, userId: string) {
  try {
    // 1. Upload to Supabase Storage
    const storageService = StorageService.getInstance();
    const publicUrl = await storageService.uploadFile(file, userId);

    // 2. Send to webhook
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('fileUrl', publicUrl);
    formData.append('fileName', file.name);

    const webhookResponse = await fetch('https://hook.us2.make.com/be72d13s05pse5tc5oqcrqfsr3ymblku', {
      method: 'POST',
      body: formData
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook request failed: ${webhookResponse.statusText}`);
    }

    const response: WebhookResponse = await webhookResponse.json();

    // 3. Create lease record in Supabase
    const { error: dbError } = await supabase
      .from('leases')
      .insert({
        name: response.fileName,
        type: response.fileType,
        document_url: response.fileUrl,
        description: response.description,
        user_id: userId,
        start_date: response.startDate,
        end_date: response.endDate
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Failed to create lease record: ${dbError.message}`);
    }

    return response;
  } catch (error) {
    console.error('Error handling file upload:', error);
    throw error;
  }
}