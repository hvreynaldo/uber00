import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { TimeInput } from './TimeInput';
import { ReportOptions } from './ReportOptions';
import { useEmailSettings } from '../../hooks/useEmailSettings';
import { toast } from './Toast';

export function EmailSettings() {
  const { settings, updateSettings, isLoading } = useEmailSettings();
  const [time, setTime] = useState(settings?.time || '');
  const [reportOptions, setReportOptions] = useState({
    expiringSoon: settings?.expiringSoon || false,
    summary: settings?.summary || false,
    recentlyExpired: settings?.recentlyExpired || false,
    fullList: settings?.fullList || false
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    
    try {
      await updateSettings({ time, ...reportOptions });
      toast.success('Your daily email settings have been updated');
    } catch (error) {
      toast.error('Failed to update settings. Please try again.');
      console.error('Settings update error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="glass-effect rounded-lg p-6 max-w-md">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Daily Email Settings</h2>
      </div>

      <div className="space-y-6">
        <TimeInput 
          value={time} 
          onChange={setTime} 
          disabled={isSaving}
        />
        <ReportOptions 
          value={reportOptions} 
          onChange={setReportOptions}
          disabled={isSaving}
        />
        
        <button
          onClick={handleSave}
          disabled={isSaving || isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg 
                   hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed 
                   transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}