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

// =========================
// WEATHER API INTEGRATION
// =========================

// Select search bar input & button
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');

// DOM elements to update
const locationLabel = document.querySelector('.location span');
const mainTemp = document.querySelector('.main-temp');
const feelsLike = document.querySelector('.feels-like');
const dateTimeEl = document.querySelector('.date-time');
const conditionIcon = document.querySelector('.today-summary i.large-icon');
const conditionTitle = document.querySelector('.today-summary h3');
const summaryItems = document.querySelectorAll('.today-summary ul li');

async function fetchWeather(location) {
    try {
        const apiKey = "d22a0905e3c64b45aa8122212252211";
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert("Location not found!");
            return;
        }

        // Update location
        locationLabel.textContent = data.location.name;

        // Update date & time
        dateTimeEl.textContent =
            `${data.location.localtime}`;

        // Main Temperature
        mainTemp.textContent = `${data.current.temp_c} °C`;

        // Feels like
        feelsLike.textContent = `Feels ${data.current.feelslike_c} °C`;

        // Weather condition text
        conditionTitle.textContent = data.current.condition.text;

        // Replace main icon with WeatherAPI's icon
        conditionIcon.className = "large-icon";
        conditionIcon.innerHTML = "";
        conditionIcon.style.backgroundImage = `url("https:${data.current.condition.icon}")`;
        conditionIcon.style.width = "100px";
        conditionIcon.style.height = "100px";
        conditionIcon.style.backgroundSize = "contain";
        conditionIcon.style.backgroundRepeat = "no-repeat";

        // Update summary list
        summaryItems[0].innerHTML = `<i class="fa-solid fa-cloud-rain"></i> Precipitation: ${data.current.precip_mm} mm`;
        summaryItems[1].innerHTML = `<i class="fa-solid fa-droplet"></i> Humidity: ${data.current.humidity}%`;
        summaryItems[2].innerHTML = `<i class="fa-solid fa-wind"></i> Wind: ${data.current.wind_kph} km/h`;

        // ⭐⭐⭐ ADD THIS LINE — CHANGE BACKGROUND ⭐⭐⭐
        updateBackgroundFromWeatherAPI(data);

    } catch (error) {
        alert("API error! Check console.");
        console.error(error);
    }
}

// Search button click event
searchBtn.addEventListener('click', () => {
    const location = searchInput.value.trim();
    if (location.length > 0) {
        fetchWeather(location);
    }
});

// Press ENTER to search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// Auto-detect user location on load
window.addEventListener("load", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            fetchWeather(`${lat},${lon}`);
            fetchHourly(`${lat},${lon}`);
            fetchWeekly(`${lat},${lon}`);
        }, () => {
            // If user denies location → fallback to "London"
            fetchWeather("Kolkata");
            fetchHourly("Kolkata");
            fetchWeekly("Kolkata");
        });
    } else {
        fetchWeather("Kolkata");
        fetchHourly("Kolkata");
        fetchWeekly("Kolkata");
    }
});

async function fetchHourly(location) {
    const apiKey = "d22a0905e3c64b45aa8122212252211";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    const container = document.querySelector(".hourly-items");
    container.innerHTML = ""; // Clear old items

    data.forecast.forecastday[0].hour.forEach(hourObj => {
        const timeLabel = hourObj.time.split(" ")[1]; // Extract HH:MM

        const html = `
            <div class="hour-item">
                <p class="time">${timeLabel}</p>
                <img src="https:${hourObj.condition.icon}" class="small-icon">

                <p class="data-value temp">${hourObj.temp_c}°</p>
                <p class="data-value wind hidden">${hourObj.wind_kph} km/h</p>
                <p class="data-value precip hidden">${hourObj.chance_of_rain}%</p>
                <p class="data-value humid hidden">${hourObj.humidity}%</p>
            </div>
        `;
        container.innerHTML += html;
    });
}

async function fetchWeekly(location) {
    const apiKey = "d22a0905e3c64b45aa8122212252211";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`;

    const res = await fetch(url);
    const data = await res.json();

    const weekly = document.querySelector(".weekly-items");
    weekly.innerHTML = ""; // Clear old items

    data.forecast.forecastday.forEach((day, index) => {
        const date = new Date(day.date);

        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const monthDay = date.toLocaleDateString("en-US", { day: "numeric", month: "short" });

        const activeClass = index === 0 ? "active" : "";

        const html = `
            <div class="day-item ${activeClass}">
                <p class="day-name">${monthDay}</p>
                <p class="day-date">${dayName}</p>

                <img src="https:${day.day.condition.icon}" width="45">

                <p class="day-temp">${day.day.maxtemp_c}° / ${day.day.mintemp_c}°</p>
                <p class="day-condition">${day.day.condition.text}</p>

                <p class="day-detail">Rain: ${day.day.daily_chance_of_rain}%</p>
                <p class="day-detail">Humidity: ${day.day.avghumidity}%</p>
            </div>
        `;

        weekly.innerHTML += html;
    });
}

searchBtn.addEventListener('click', () => {
    const location = searchInput.value.trim();
    if (!location) return;

    fetchWeather(location);
    fetchHourly(location);
    fetchWeekly(location);
});

searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// ==============================
// RESPONSIVENESS & MOBILE TWEAKS
// ==============================

(function addResponsiveEnhancements() {
  // 1) Inject responsive CSS into the page
  const respCSS = `
    /* Responsive overrides injected at runtime */
    @media (max-width: 1024px) {
      .weather-dashboard { padding: 20px; border-radius: 16px; }
      .main-header { flex-direction: column; gap: 12px; align-items: stretch; }
      .search-bar { max-width: 100%; margin: 0; order: 2; }
      .location { order: 1; justify-content: space-between; width: 100%; }
      .today-main-forecast { grid-template-columns: 1fr; grid-template-areas:
        "title"
        "datetime"
        "temp"
        "feelslike"
        "summary"; }
      .today-summary { align-items: flex-start; text-align: left; margin-top: 10px; }
      .today-summary .large-icon { font-size: 3.5rem; }
      .main-temp { font-size: 4rem !important; } /* scale down on medium screens */
    }

    @media (max-width: 600px) {
      body { padding: 12px; }
      .weather-dashboard { padding: 16px; }
      .main-temp { font-size: 3.2rem !important; }
      .today-summary .large-icon { font-size: 3rem; }
      .forecast-headers span { padding-top: 10px; font-size: 0.85rem; }
      .hour-item { padding: 8px; min-width: 84px; }
      .hour-item .time { font-size: 0.8rem; }
      .hour-item .data-value { font-size: 0.95rem; }
      .day-item { min-width: 110px; padding: 12px; }
    }

    /* Horizontal scrolling + snap for hourly and weekly */
    .hourly-items, .weekly-items {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      padding-bottom: 8px;
    }
    .hourly-items { padding: 12px; }
    .hourly-items .hour-item, .weekly-items .day-item {
      scroll-snap-align: center;
      flex: 0 0 auto;
    }
    .hourly-items { scroll-snap-type: x mandatory; }
    .weekly-items { scroll-snap-type: x proximity; }

    /* Hide default scrollbar but keep scroll functionality */
    .hourly-items::-webkit-scrollbar, .weekly-items::-webkit-scrollbar {
      height: 8px;
    }
    .hourly-items::-webkit-scrollbar-thumb, .weekly-items::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.08);
      border-radius: 8px;
    }
    .hourly-items::-webkit-scrollbar-track, .weekly-items::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Make forecast header wrap on tiny screens */
    @media (max-width: 420px) {
      .forecast-headers { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }
      .forecast-headers span { min-width: auto; padding-top: 8px; padding-bottom: 8px; }
      .main-temp { font-size: 2.6rem !important; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.setAttribute('id', 'injected-responsive-styles');
  styleEl.appendChild(document.createTextNode(respCSS));
  document.head.appendChild(styleEl);

  // 2) Improve scrolling behavior: add pointer dragging for hourly-items (better UX on desktop and mobile)
  function enableDragScroll(container) {
    if (!container) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('pointerdown', (e) => {
      isDown = true;
      container.setPointerCapture(e.pointerId);
      startX = e.clientX;
      scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
    });

    container.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const x = e.clientX;
      const walk = (startX - x); // how far pointer moved
      container.scrollLeft = scrollLeft + walk;
    });

    function release(e) {
      if (!isDown) return;
      isDown = false;
      try { container.releasePointerCapture(e.pointerId); } catch(_) {}
      container.style.cursor = 'grab';
    }

    container.addEventListener('pointerup', release);
    container.addEventListener('pointerleave', release);
    // set initial cursor
    container.style.cursor = 'grab';
  }

  // find the containers and enable drag scrolling
  const hourlyContainer = document.querySelector('.hourly-items');
  const weeklyContainer = document.querySelector('.weekly-items');
  enableDragScroll(hourlyContainer);
  enableDragScroll(weeklyContainer);

  // 3) Resize handler: small dynamic tweaks (e.g., scale very large fonts on tiny viewports)
  function adaptSizes() {
    const w = window.innerWidth;
    const mainTempEl = document.querySelector('.main-temp');
    if (!mainTempEl) return;

    if (w < 360) {
      mainTempEl.style.fontSize = '2.6rem';
    } else if (w < 480) {
      mainTempEl.style.fontSize = '3.2rem';
    } else if (w < 768) {
      mainTempEl.style.fontSize = '4rem';
    } else {
      // let CSS handle bigger screens
      mainTempEl.style.fontSize = '';
    }
  }
  window.addEventListener('resize', adaptSizes);
  // initial run
  adaptSizes();

  // 4) Accessibility: ensure hourly-items and weekly-items are keyboard scrollable
  function makeKeyboardScrollable(container) {
    if (!container) return;
    container.setAttribute('tabindex', '0'); // make focusable
    container.addEventListener('keydown', (e) => {
      const step = container.clientWidth * 0.6;
      if (e.key === 'ArrowRight') {
        container.scrollBy({ left: step, behavior: 'smooth' });
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        container.scrollBy({ left: -step, behavior: 'smooth' });
        e.preventDefault();
      } else if (e.key === 'Home') {
        container.scrollTo({ left: 0, behavior: 'smooth' });
        e.preventDefault();
      } else if (e.key === 'End') {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        e.preventDefault();
      }
    });
  }
  makeKeyboardScrollable(hourlyContainer);
  makeKeyboardScrollable(weeklyContainer);

  // 5) If hourly items are dynamically replaced later (by your fetchHourly), re-enable behaviors after content is updated.
  // We observe hourly and weekly containers for child changes and re-apply drag + keyboard behaviors.
  const observerConfig = { childList: true };
  const reapply = () => {
    enableDragScroll(document.querySelector('.hourly-items'));
    enableDragScroll(document.querySelector('.weekly-items'));
    makeKeyboardScrollable(document.querySelector('.hourly-items'));
    makeKeyboardScrollable(document.querySelector('.weekly-items'));
  };

  const hourlyObserver = new MutationObserver(reapply);
  const weeklyObserver = new MutationObserver(reapply);
  if (hourlyContainer) hourlyObserver.observe(hourlyContainer, observerConfig);
  if (weeklyContainer) weeklyObserver.observe(weeklyContainer, observerConfig);

  // Done
})();

// =========================
//  DYNAMIC WEATHER BACKGROUND
// =========================

// Your uploaded images
const bgSnow   = "snow.jpg";
const bgNight  = "night.jpg";
let bgDay      = "day.jpg";
let bgCloudy   = "cloudy.jpg";
let bgRain     = "rain.jpg";

// Apply background to body
function setWeatherBackground(condition, isDay) {

    let image = "";

    // ---- Night ----
    if (!isDay) {
        image = bgNight;
    }

    // ---- Weather Specific ----
    else if (condition.includes("snow")) {
        image = bgSnow;
    }
    else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("thunder")) {
        image = bgRain;
    }
    else if (condition.includes("cloud")) {
        image = bgCloudy;
    }
    else {
        image = bgDay; // clear/sunny
    }

    // Apply background
    document.body.style.background = `url('${image}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
}


// =========================
//  CALL THIS AFTER FETCHING WEATHER API
// =========================
// Example:
// const condition = data.current.condition.text.toLowerCase();
// const isDay = data.current.is_day === 1;

function updateBackgroundFromWeatherAPI(data) {
    const condition = data.current.condition.text.toLowerCase();
    const isDay = data.current.is_day === 1;

    setWeatherBackground(condition, isDay);
}
