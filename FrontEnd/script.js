document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const findShopsBtn = document.getElementById('find-shops-btn');
  
    findShopsBtn.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });
  
    function showPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      // Initialize the map
      const map = L.map('map').setView([lat, lon], 13);
  
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      // Add a marker for the user's location
      L.marker([lat, lon]).addTo(map)
        .bindPopup('You are here')
        .openPopup();
  
      // Fetch and display nearby shops
      fetch('http://localhost:8000/api/shops')
        .then(response => response.json())
        .then(data => {
          const shopList = document.getElementById('shop-list');
          shopList.innerHTML = ''; // Clear any existing content
          data.forEach(shop => {
            const shopItem = document.createElement('div');
            shopItem.className = 'col-md-4 mb-3';
            shopItem.innerHTML = `
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${shop.name}</h5>
                  <p class="card-text">Location: ${shop.location}</p>
                  <p class="card-text">Hours:</p>
                  <ul class="list-group list-group-flush">
                    ${Object.keys(shop.hours).map(day => `
                      <li class="list-group-item">${day}: ${shop.hours[day].open} - ${shop.hours[day].close}</li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            `;
            shopList.appendChild(shopItem);
  
            // Add a marker for each shop
            L.marker([shop.latitude, shop.longitude]).addTo(map)
              .bindPopup(`<b>${shop.name}</b><br>${shop.location}`)
              .openPopup();
          });
  
          // Hide the loading screen
          loadingScreen.style.display = 'none';
        })
        .catch(error => {
          console.error('Error fetching shops:', error);
          const shopList = document.getElementById('shop-list');
          shopList.innerHTML = '<p class="text-danger">Failed to load shops. Please try again later.</p>';
          loadingScreen.style.display = 'none';
        });
    }
  
    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert('User denied the request for Geolocation.');
          break;
        case error.POSITION_UNAVAILABLE:
          alert('Location information is unavailable.');
          break;
        case error.TIMEOUT:
          alert('The request to get user location timed out.');
          break;
        case error.UNKNOWN_ERROR:
          alert('An unknown error occurred.');
          break;
      }
      loadingScreen.style.display = 'none';
    }
  
    // Hide the loading screen after 10 seconds if fetch fails
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 10000);
  });
  document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const findShopsBtn = document.getElementById('find-shops-btn');
  
    findShopsBtn.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });
  
    function showPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      // Initialize the map
      const map = L.map('map').setView([lat, lon], 13);
  
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      // Add a marker for the user's location
      L.marker([lat, lon]).addTo(map)
        .bindPopup('You are here')
        .openPopup();
  
      // Display predefined shops near the user's location
      shops.forEach(shop => {
        L.marker([shop.latitude, shop.longitude]).addTo(map)
          .bindPopup(`<b>${shop.name}</b><br>${shop.location}`)
          .openPopup();
      });
  
      // Hide the loading screen
      loadingScreen.style.display = 'none';
    }
  
    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert('User denied the request for Geolocation.');
          break;
        case error.POSITION_UNAVAILABLE:
          alert('Location information is unavailable.');
          break;
        case error.TIMEOUT:
          alert('The request to get user location timed out.');
          break;
        case error.UNKNOWN_ERROR:
          alert('An unknown error occurred.');
          break;
      }
      loadingScreen.style.display = 'none';
    }
  
    // Hide the loading screen after 10 seconds if fetch fails
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 10000);
  });
  