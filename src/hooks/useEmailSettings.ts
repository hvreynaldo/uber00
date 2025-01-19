import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface EmailSettings {
  time: string;
  expiringSoon: boolean;
  summary: boolean;
  recentlyExpired: boolean;
  fullList: boolean;
}

const DEFAULT_SETTINGS: EmailSettings = {
  time: '9:00 AM',
  expiringSoon: true,
  summary: true,
  recentlyExpired: false,
  fullList: false
};

const WEBHOOK_URL = 'https://hook.us2.make.com/qc11k592rkkcg1fah3rm44ldepuhv4qi';

export function useEmailSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<EmailSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('user_preferences')
          .select('email_settings')
          .eq('user_id', user.id)
          .single();

        if (!error && data?.email_settings) {
          setSettings(data.email_settings as EmailSettings);
        }
      } catch (error) {
        console.error('Error fetching email settings:', error);
      }
    }

    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: EmailSettings) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      // First try to update existing record
      const { error: updateError } = await supabase
        .from('user_preferences')
        .update({ email_settings: newSettings })
        .eq('user_id', user.id);

      // If no record exists, insert a new one
      if (updateError) {
        const { error: insertError } = await supabase
          .from('user_preferences')
          .insert({
            user_id: user.id,
            email_settings: newSettings
          });

        if (insertError) throw insertError;
      }
      
      // Notify webhook only after successful database update
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          settings: newSettings,
          timestamp: new Date().toISOString()
        })
      });

      setSettings(newSettings);
    } catch (error) {
      console.error('Error updating email settings:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { settings, updateSettings, isLoading };
}