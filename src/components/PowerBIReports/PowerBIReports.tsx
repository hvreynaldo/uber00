import React, { useState } from 'react';
import { PowerBIReport } from './PowerBIReport';
import { TabButton } from './TabButton';

const REPORTS = [
  {
    id: 'headcount',
    title: 'Global Headcount Report',
    reportId: '704564e0-0091-4f51-8e79-ef4bac5a6877',
    ctid: '966cc0e1-40a3-4921-98d2-4207f6210298'
  },
  {
    id: 'jira',
    title: 'Jira Project Dashboard',
    reportId: 'a7dd2dc8-cd5e-4faa-a80f-962a6de45441',
    ctid: '966cc0e1-40a3-4921-98d2-4207f6210298'
  }
];

export function PowerBIReports() {
  const [activeTab, setActiveTab] = useState(REPORTS[0].id);

  const activeReport = REPORTS.find(report => report.id === activeTab);

  return (
    <div className="glass-effect rounded-lg p-6">
      <div className="flex gap-2 mb-6">
        {REPORTS.map(report => (
          <TabButton
            key={report.id}
            active={activeTab === report.id}
            onClick={() => setActiveTab(report.id)}
          >
            {report.title}
          </TabButton>
        ))}
      </div>
      
      {activeReport && (
        <PowerBIReport
          title={activeReport.title}
          reportId={activeReport.reportId}
          ctid={activeReport.ctid}
        />
      )}
    </div>
  );
}