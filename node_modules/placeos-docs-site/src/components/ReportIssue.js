import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function ReportIssue({title, body, children}) {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {organizationName, projectName} = siteConfig;

  const url = `https://github.com/${organizationName}/${projectName}/issues/new?title=${title || ''}&body=${body || ''}`;

  return (
    <a href={url} target="_blank">
      {children}
    </a>
  );
}

export default ReportIssue;
