import React from 'react';

interface PowerBIReportProps {
  title: string;
  reportId: string;
  ctid: string;
}

export function PowerBIReport({ title, reportId, ctid }: PowerBIReportProps) {
  const embedUrl = `https://app.powerbi.com/reportEmbed?reportId=${reportId}&autoAuth=true&ctid=${ctid}`;

  return (
    <div className="w-full">
      <div className="aspect-[21/9] w-full">
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