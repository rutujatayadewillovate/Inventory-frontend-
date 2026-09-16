export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || !data.length) {
    return;
  }

  // Get headers from first object keys
  const headers = Object.keys(data[0]);
  
  // Format rows
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        let value = row[header];
        // Handle null/undefined
        if (value === null || value === undefined) {
          value = '';
        }
        // Handle strings with commas or quotes
        if (typeof value === 'string') {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
