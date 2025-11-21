document.addEventListener('DOMContentLoaded', () => {
    // 1. Get all header spans and hourly data values
    const forecastHeaders = document.querySelectorAll('.forecast-headers span');
    const allDataValues = document.querySelectorAll('.hourly-items .data-value');

    // Default: Set 'Temperature' as active on load
    const defaultHeader = Array.from(forecastHeaders).find(h => h.textContent.trim() === 'Temperature');
    if (defaultHeader) {
        defaultHeader.classList.add('active');
    }

    // Function to handle the header click event
    function handleHeaderClick(event) {
        // This extracts 'temperature', 'wind', 'precipitation', or 'humidity'
        const selectedDataType = event.target.textContent.toLowerCase().split(' ')[0];
        
        // --- 1. Update Header Visuals ---
        
        // Remove 'active' class from all headers (resets the white underline/bold text)
        forecastHeaders.forEach(header => {
            header.classList.remove('active');
        });
        
        // Add 'active' class to the clicked header (applies the new white underline/bold text)
        event.target.classList.add('active');

        // --- 2. Update Hourly Data Values ---

        // Loop through ALL data values and update visibility
        allDataValues.forEach(dataElement => {
            // Check if the current data element type matches the selected type
            if (dataElement.classList.contains(selectedDataType)) {
                // Show the selected data type
                dataElement.classList.remove('hidden');
            } else {
                // Hide all others
                dataElement.classList.add('hidden');
            }
        });
    }

    // Attach the click listener to all headers
    forecastHeaders.forEach(header => {
        header.addEventListener('click', handleHeaderClick);
    });
    
    // ... rest of your initialization code ...
});