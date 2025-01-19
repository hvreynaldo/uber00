import React from 'react';

interface PowerBIReportProps {
  title: string;
  reportId: string;
  ctid: string;
}

export function PowerBIReport({ title, reportId, ctid }: PowerBIReportProps) {
  const embedUrl = `https://app.powerbi.com/reportEmbed?reportId=${reportId}&autoAuth=true&ctid=${ctid}`;

  return (
    <div className="glass-effect rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="bg-blue-500 w-1 h-8 rounded mr-3"></span>
        {title}
      </h2>
      <div className="aspect-video w-full">
        <iframe 
          title={title}
          width="100%" 
          height="100%" 
          src={embedUrl}
          frameBorder="0" 
          allowFullScreen={true}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}