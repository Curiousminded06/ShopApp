const express = require('express');
const router = express.Router();

// Sample data
let shops = [
    {
      id: 1,
      name: 'Shop 1',
      location: 'Location 1',
      latitude: 22.7196,
      longitude: 75.8577,
      hours: {
        monday: { open: '09:00', close: '21:00' },
        tuesday: { open: '09:00', close: '21:00' },
        wednesday: { open: '09:00', close: '21:00' },
        thursday: { open: '09:00', close: '21:00' },
        friday: { open: '09:00', close: '21:00' },
        saturday: { open: '10:00', close: '22:00' },
        sunday: { open: '10:00', close: '20:00' },
      },
    },
    {
      id: 2,
      name: 'Shop 2',
      location: 'Location 2',
      latitude: 22.7200,
      longitude: 75.8600,
      hours: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '20:00' },
        friday: { open: '08:00', close: '20:00' },
        saturday: { open: '09:00', close: '21:00' },
        sunday: { open: '09:00', close: '19:00' },
      },
    },
    {
      id: 3,
      name: 'Shop 3',
      location: 'Location 3',
      latitude: 22.7210,
      longitude: 75.8620,
      hours: {
        monday: { open: '10:00', close: '22:00' },
        tuesday: { open: '10:00', close: '22:00' },
        wednesday: { open: '10:00', close: '22:00' },
        thursday: { open: '10:00', close: '22:00' },
        friday: { open: '10:00', close: '22:00' },
        saturday: { open: '11:00', close: '23:00' },
        sunday: { open: '11:00', close: '21:00' },
      },
    },
  ];
  
  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;
  
    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;
    const lat2 = coords2.latitude;
    const lon2 = coords2.longitude;
  
    const R = 6371; // Radius of the Earth in km
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
  
    return d;
  };
  // Get shops near a specific location
router.get('/nearby', (req, res) => {
    const { latitude, longitude, radius } = req.query;
    if (!latitude || !longitude || !radius) {
      return res.status(400).send('Latitude, longitude, and radius are required');
    }
  
    const userLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    const nearbyShops = shops.filter(shop => {
      const shopLocation = { latitude: shop.latitude, longitude: shop.longitude };
      const distance = haversineDistance(userLocation, shopLocation);
      return distance <= parseFloat(radius);
    });
  
    res.json(nearbyShops);
  });
  
// Get all shops
router.get('/', (req, res) => {
  res.json(shops);
});

// Get a specific shop by ID
router.get('/:id', (req, res) => {
  const shop = shops.find(s => s.id === parseInt(req.params.id));
  if (!shop) return res.status(404).send('Shop not found');
  res.json(shop);
});

module.exports = router;
