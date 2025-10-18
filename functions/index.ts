// Dynamic month generation starting from current month
export const generateDynamicMonths = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
    const currentYear = currentDate.getFullYear();
    
    const months = [];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    // Generate 12 months starting from current month
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth - 1 + i) % 12;
      const year = currentYear + Math.floor((currentMonth - 1 + i) / 12);
      const monthValue = (monthIndex + 1).toString().padStart(2, '0');
      
      months.push({
        value: monthValue,
        label: `${monthNames[monthIndex]} - ${year}`,
        sortKey: year * 100 + (monthIndex + 1) // Create sort key for chronological ordering
      });
    }
    
    // Sort by chronological order (already sorted by generation, but ensure consistency)
    return months.sort((a, b) => a.sortKey - b.sortKey);
  };