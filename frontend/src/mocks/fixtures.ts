let nextId = 100;
export const getId = () => nextId++;

export const mockTrips = [
  // ═══════════════════════════════════════════
  // Trip 1 — Paris Getaway
  // ═══════════════════════════════════════════
  {
    id: 1,
    owner_id: 1,
    name: "Paris Getaway",
    start_date: "2026-07-10",
    end_date: "2026-07-14",
    days: [
      {
        id: 1, trip_id: 1, date: "2026-07-10", label: "Arrival & Explore",
        items: [
          { id: 1, day_id: 1, place_name: "Louvre Museum", latitude: 48.8606, longitude: 2.3376, scheduled_time: "10:00", note: "Book tickets in advance — Mona Lisa room gets crowded", order_index: 0 },
          { id: 2, day_id: 1, place_name: "Cafe de Flore", latitude: 48.8540, longitude: 2.3326, scheduled_time: "13:00", note: "Classic Parisian cafe — try the croque monsieur", order_index: 1 },
          { id: 3, day_id: 1, place_name: "Musee d'Orsay", latitude: 48.8600, longitude: 2.3266, scheduled_time: "15:00", note: "Impressionist collection on top floor", order_index: 2 },
        ],
      },
      {
        id: 2, trip_id: 1, date: "2026-07-11", label: "Museums & Culture",
        items: [
          { id: 4, day_id: 2, place_name: "Eiffel Tower", latitude: 48.8584, longitude: 2.2945, scheduled_time: "09:00", note: "Sunrise visit — book summit tickets online", order_index: 0 },
          { id: 5, day_id: 2, place_name: "Arc de Triomphe", latitude: 48.8738, longitude: 2.2950, scheduled_time: "11:30", note: "Walk up the spiral stairs for panoramic view", order_index: 1 },
          { id: 6, day_id: 2, place_name: "Montmartre", latitude: 48.8867, longitude: 2.3431, scheduled_time: "14:00", note: "Visit Sacre-Coeur and explore artist square", order_index: 2 },
        ],
      },
      {
        id: 3, trip_id: 1, date: "2026-07-12", label: "Versailles Day Trip",
        items: [
          { id: 7, day_id: 3, place_name: "Palace of Versailles", latitude: 48.8049, longitude: 2.1204, scheduled_time: "10:00", note: "RER C from Paris — allow full day", order_index: 0 },
          { id: 8, day_id: 3, place_name: "Marie-Antoinette's Estate", latitude: 48.8195, longitude: 2.1064, scheduled_time: "14:00", note: "The Petit Trianon and Queen's Hamlet", order_index: 1 },
        ],
      },
      {
        id: 4, trip_id: 1, date: "2026-07-13", label: "Food & Shopping",
        items: [
          { id: 9, day_id: 4, place_name: "Le Marais", latitude: 48.8595, longitude: 2.3623, scheduled_time: "10:00", note: "Trendy boutiques and falafel on Rue des Rosiers", order_index: 0 },
          { id: 10, day_id: 4, place_name: "Galeries Lafayette", latitude: 48.8738, longitude: 2.3276, scheduled_time: "14:00", note: "Art deco dome and rooftop view", order_index: 1 },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // Trip 2 — Tokyo Adventure
  // ═══════════════════════════════════════════
  {
    id: 2,
    owner_id: 1,
    name: "Tokyo Adventure",
    start_date: "2026-09-15",
    end_date: "2026-09-22",
    days: [
      {
        id: 5, trip_id: 2, date: "2026-09-15", label: "Arrival & Shinjuku",
        items: [
          { id: 11, day_id: 5, place_name: "Shinjuku Gyoen National Garden", latitude: 35.6852, longitude: 139.7100, scheduled_time: "14:00", note: "Stroll the Japanese garden after landing", order_index: 0 },
          { id: 12, day_id: 5, place_name: "Tokyo Metropolitan Observatory", latitude: 35.6896, longitude: 139.6917, scheduled_time: "17:30", note: "Free sunset view of the city", order_index: 1 },
          { id: 13, day_id: 5, place_name: "Omoide Yokocho", latitude: 35.6942, longitude: 139.7005, scheduled_time: "19:00", note: "Narrow alley with yakitori — cash only", order_index: 2 },
        ],
      },
      {
        id: 6, trip_id: 2, date: "2026-09-16", label: "Traditional Tokyo",
        items: [
          { id: 14, day_id: 6, place_name: "Senso-ji Temple", latitude: 35.7148, longitude: 139.7967, scheduled_time: "09:00", note: "Oldest temple — go early to avoid crowds", order_index: 0 },
          { id: 15, day_id: 6, place_name: "Nakamise-dori", latitude: 35.7143, longitude: 139.7955, scheduled_time: "10:30", note: "Shopping street leading to the temple", order_index: 1 },
          { id: 16, day_id: 6, place_name: "Ueno Park", latitude: 35.7151, longitude: 139.7730, scheduled_time: "13:00", note: "Visit the museums and zoo", order_index: 2 },
        ],
      },
      {
        id: 7, trip_id: 2, date: "2026-09-17", label: "Modern Tokyo",
        items: [
          { id: 17, day_id: 7, place_name: "Shibuya Crossing", latitude: 35.6595, longitude: 139.7004, scheduled_time: "10:00", note: "Iconic scramble — view from Starbucks above", order_index: 0 },
          { id: 18, day_id: 7, place_name: "Meiji Jingu", latitude: 35.6764, longitude: 139.6993, scheduled_time: "11:30", note: "Serene forest shrine in the heart of Tokyo", order_index: 1 },
          { id: 19, day_id: 7, place_name: "Takeshita Street", latitude: 35.6717, longitude: 139.7026, scheduled_time: "14:00", note: "Harajuku — crepes and quirky fashion", order_index: 2 },
          { id: 20, day_id: 7, place_name: "Tokyo Tower", latitude: 35.6586, longitude: 139.7454, scheduled_time: "18:00", note: "Evening illumination view", order_index: 3 },
        ],
      },
      {
        id: 8, trip_id: 2, date: "2026-09-18", label: "Day Trip — Mount Fuji",
        items: [
          { id: 21, day_id: 8, place_name: "Mount Fuji 5th Station", latitude: 35.3606, longitude: 138.7272, scheduled_time: "08:00", note: "Book bus from Shinjuku Highway Bus Terminal", order_index: 0 },
          { id: 22, day_id: 8, place_name: "Lake Kawaguchi", latitude: 35.5136, longitude: 138.7570, scheduled_time: "13:00", note: "Reflection of Mount Fuji — rent a bike", order_index: 1 },
        ],
      },
      {
        id: 9, trip_id: 2, date: "2026-09-19", label: "Akihabara & Ueno",
        items: [
          { id: 23, day_id: 9, place_name: "Akihabara Electric Town", latitude: 35.7023, longitude: 139.7745, scheduled_time: "10:00", note: "Anime, manga, and electronics district", order_index: 0 },
          { id: 24, day_id: 9, place_name: "Yanaka Ginza", latitude: 35.7279, longitude: 139.7703, scheduled_time: "14:00", note: "Old-school shopping street — great street food", order_index: 1 },
        ],
      },
      {
        id: 10, trip_id: 2, date: "2026-09-20", label: "Shibuya & Harajuku",
        items: [
          { id: 25, day_id: 10, place_name: "TeamLab Borderless", latitude: 35.6264, longitude: 139.7840, scheduled_time: "10:00", note: "Digital art museum — book ahead", order_index: 0 },
          { id: 26, day_id: 10, place_name: "Roppongi Hills", latitude: 35.6600, longitude: 139.7292, scheduled_time: "14:00", note: "Mori Art Museum and observation deck", order_index: 1 },
        ],
      },
      {
        id: 11, trip_id: 2, date: "2026-09-21", label: "Tsukiji & Departure",
        items: [
          { id: 27, day_id: 11, place_name: "Tsukiji Outer Market", latitude: 35.6654, longitude: 139.7707, scheduled_time: "07:00", note: "Fresh sushi breakfast — arrive early", order_index: 0 },
          { id: 28, day_id: 11, place_name: "Ginza", latitude: 35.6717, longitude: 139.7667, scheduled_time: "10:00", note: "High-end shopping district", order_index: 1 },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // Trip 3 — Bali Retreat
  // ═══════════════════════════════════════════
  {
    id: 3,
    owner_id: 1,
    name: "Bali Retreat",
    start_date: "2026-05-01",
    end_date: "2026-05-07",
    days: [
      {
        id: 12, trip_id: 3, date: "2026-05-01", label: "Arrival & Ubud",
        items: [
          { id: 29, day_id: 12, place_name: "Ubud Monkey Forest", latitude: -8.5181, longitude: 115.2590, scheduled_time: "14:00", note: "Watch your belongings — the monkeys are cheeky", order_index: 0 },
          { id: 30, day_id: 12, place_name: "Ubud Palace", latitude: -8.5068, longitude: 115.2624, scheduled_time: "17:00", note: "Traditional dance performance at 7pm", order_index: 1 },
        ],
      },
      {
        id: 13, trip_id: 3, date: "2026-05-02", label: "Ubud Culture",
        items: [
          { id: 31, day_id: 13, place_name: "Campuhan Ridge Walk", latitude: -8.5113, longitude: 115.2560, scheduled_time: "07:00", note: "Beautiful morning walk through rice fields", order_index: 0 },
          { id: 32, day_id: 13, place_name: "Tegallalang Rice Terrace", latitude: -8.4307, longitude: 115.2799, scheduled_time: "10:00", note: "Iconic rice terraces — small donation at entrance", order_index: 1 },
          { id: 33, day_id: 13, place_name: "Tirta Empul Temple", latitude: -8.4152, longitude: 115.3156, scheduled_time: "13:00", note: "Holy water temple — bring a sarong", order_index: 2 },
        ],
      },
      {
        id: 14, trip_id: 3, date: "2026-05-03", label: "Temples & Rice Terraces",
        items: [
          { id: 34, day_id: 14, place_name: "Tanah Lot Temple", latitude: -8.6213, longitude: 115.0868, scheduled_time: "16:00", note: "Sunset temple on the rocks", order_index: 0 },
        ],
      },
      {
        id: 15, trip_id: 3, date: "2026-05-04", label: "Seminyak & Beaches",
        items: [
          { id: 35, day_id: 15, place_name: "Seminyak Beach", latitude: -8.6914, longitude: 115.1552, scheduled_time: "10:00", note: "Surf lessons available on the beach", order_index: 0 },
          { id: 36, day_id: 15, place_name: "Potato Head Beach Club", latitude: -8.6939, longitude: 115.1569, scheduled_time: "14:00", note: "Iconic beach club — book a daybed", order_index: 1 },
        ],
      },
      {
        id: 16, trip_id: 3, date: "2026-05-05", label: "Uluwatu & Cliffs",
        items: [
          { id: 37, day_id: 16, place_name: "Uluwatu Temple", latitude: -8.8291, longitude: 115.0849, scheduled_time: "16:00", note: "Clifftop temple — Kecak fire dance at sunset", order_index: 0 },
        ],
      },
      {
        id: 17, trip_id: 3, date: "2026-05-06", label: "Nusa Penida Day Trip",
        items: [
          { id: 38, day_id: 17, place_name: "Kelingking Beach", latitude: -8.7693, longitude: 115.5866, scheduled_time: "09:00", note: "T-Rex shaped cliff — steep hike down", order_index: 0 },
          { id: 39, day_id: 17, place_name: "Angel's Billabong", latitude: -8.7770, longitude: 115.5924, scheduled_time: "13:00", note: "Natural infinity pool — check tide times", order_index: 1 },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // Trip 4 — NYC Explorer
  // ═══════════════════════════════════════════
  {
    id: 4,
    owner_id: 1,
    name: "NYC Explorer",
    start_date: "2026-10-01",
    end_date: "2026-10-05",
    days: [
      {
        id: 18, trip_id: 4, date: "2026-10-01", label: "Arrival & Downtown",
        items: [
          { id: 40, day_id: 18, place_name: "Statue of Liberty", latitude: 40.6892, longitude: -74.0445, scheduled_time: "09:00", note: "Book ferry tickets online — pedestal access included", order_index: 0 },
          { id: 41, day_id: 18, place_name: "Wall Street", latitude: 40.7074, longitude: -74.0113, scheduled_time: "13:00", note: "See the Charging Bull and NYSE", order_index: 1 },
          { id: 42, day_id: 18, place_name: "Brooklyn Bridge Walk", latitude: 40.7061, longitude: -73.9969, scheduled_time: "15:00", note: "Walk from Manhattan to DUMBO at sunset", order_index: 2 },
        ],
      },
      {
        id: 19, trip_id: 4, date: "2026-10-02", label: "Midtown & Central Park",
        items: [
          { id: 43, day_id: 19, place_name: "Central Park", latitude: 40.7829, longitude: -73.9654, scheduled_time: "08:00", note: "Morning stroll — rent a rowboat at The Loeb Boathouse", order_index: 0 },
          { id: 44, day_id: 19, place_name: "Metropolitan Museum of Art", latitude: 40.7794, longitude: -73.9632, scheduled_time: "11:00", note: "The Met — pay-what-you-wish for NY residents", order_index: 1 },
          { id: 45, day_id: 19, place_name: "Times Square", latitude: 40.7580, longitude: -73.9855, scheduled_time: "19:00", note: "Neon lights at night — book Broadway show", order_index: 2 },
        ],
      },
      {
        id: 20, trip_id: 4, date: "2026-10-03", label: "Brooklyn & Arts",
        items: [
          { id: 46, day_id: 20, place_name: "DUMBO", latitude: 40.7030, longitude: -73.9893, scheduled_time: "10:00", note: "Brooklyn — best photo spot of Manhattan Bridge", order_index: 0 },
          { id: 47, day_id: 20, place_name: "Brooklyn Flea Market", latitude: 40.6877, longitude: -73.9905, scheduled_time: "12:00", note: "Weekend market — vintage finds and food", order_index: 1 },
          { id: 48, day_id: 20, place_name: "Smorgasburg", latitude: 40.7217, longitude: -73.9609, scheduled_time: "14:00", note: "Outdoor food market with 100+ vendors", order_index: 2 },
        ],
      },
      {
        id: 21, trip_id: 4, date: "2026-10-04", label: "Museums & Shopping",
        items: [
          { id: 49, day_id: 21, place_name: "Empire State Building", latitude: 40.7484, longitude: -73.9857, scheduled_time: "09:00", note: "Go early to avoid queues — 86th floor observatory", order_index: 0 },
          { id: 50, day_id: 21, place_name: "The High Line", latitude: 40.7480, longitude: -74.0048, scheduled_time: "11:30", note: "Elevated park on old rail tracks — Chelsea", order_index: 1 },
          { id: 51, day_id: 21, place_name: "One World Trade Center", latitude: 40.7127, longitude: -74.0134, scheduled_time: "15:00", note: "One World Observatory — 360° skyline views", order_index: 2 },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // Trip 5 — London Explorer
  // ═══════════════════════════════════════════
  {
    id: 5,
    owner_id: 1,
    name: "London Explorer",
    start_date: "2026-08-05",
    end_date: "2026-08-09",
    days: [
      {
        id: 22, trip_id: 5, date: "2026-08-05", label: "Arrival & South Bank",
        items: [
          { id: 52, day_id: 22, place_name: "Tower of London", latitude: 51.5081, longitude: -0.0759, scheduled_time: "10:00", note: "Book tickets online — see the Crown Jewels", order_index: 0 },
          { id: 53, day_id: 22, place_name: "Tower Bridge", latitude: 51.5055, longitude: -0.0754, scheduled_time: "12:30", note: "Glass floor walkway at the top", order_index: 1 },
          { id: 54, day_id: 22, place_name: "Borough Market", latitude: 51.5055, longitude: -0.0910, scheduled_time: "14:00", note: "Best food market in London — try the truffle risotto", order_index: 2 },
        ],
      },
      {
        id: 23, trip_id: 5, date: "2026-08-06", label: "Royal London",
        items: [
          { id: 55, day_id: 23, place_name: "Buckingham Palace", latitude: 51.5014, longitude: -0.1419, scheduled_time: "10:30", note: "Check for Changing of the Guard at 11am", order_index: 0 },
          { id: 56, day_id: 23, place_name: "Westminster Abbey", latitude: 51.4993, longitude: -0.1273, scheduled_time: "12:30", note: "Coronation church — free audio guide", order_index: 1 },
          { id: 57, day_id: 23, place_name: "Big Ben & Parliament", latitude: 51.5007, longitude: -0.1246, scheduled_time: "14:30", note: "Photo stop — book Parliament tour in advance", order_index: 2 },
        ],
      },
      {
        id: 24, trip_id: 5, date: "2026-08-07", label: "Museums & Markets",
        items: [
          { id: 58, day_id: 24, place_name: "British Museum", latitude: 51.5194, longitude: -0.1269, scheduled_time: "10:00", note: "Free entry — see the Rosetta Stone and Elgin Marbles", order_index: 0 },
          { id: 59, day_id: 24, place_name: "Covent Garden", latitude: 51.5118, longitude: -0.1237, scheduled_time: "13:30", note: "Street performers and boutique shops", order_index: 1 },
          { id: 60, day_id: 24, place_name: "Camden Market", latitude: 51.5412, longitude: -0.1480, scheduled_time: "16:00", note: "Alternative market — great for souvenirs", order_index: 2 },
        ],
      },
      {
        id: 25, trip_id: 5, date: "2026-08-08", label: "Day Trip — Windsor",
        items: [
          { id: 61, day_id: 25, place_name: "Windsor Castle", latitude: 51.4838, longitude: -0.6044, scheduled_time: "10:00", note: "30min train from Paddington — State Apartments", order_index: 0 },
          { id: 62, day_id: 25, place_name: "The Long Walk", latitude: 51.4545, longitude: -0.6178, scheduled_time: "13:00", note: "Scenic 3-mile walk from the castle", order_index: 1 },
        ],
      },
    ],
  },
];

export const mockBookings = [
  // Paris bookings
  { id: 1, trip_id: 1, type: "flight", name: "Air France AF1234", starts_at: "2026-07-10T06:00:00Z", ends_at: "2026-07-10T10:30:00Z", confirmation_number: "AF-CONF-98765", notes: "Terminal 2E, Seat 14A" },
  { id: 2, trip_id: 1, type: "hotel", name: "Hotel Le Marais", starts_at: "2026-07-10T15:00:00Z", ends_at: "2026-07-14T11:00:00Z", confirmation_number: "MAR-2026-447", notes: "Room 304, City view" },

  // Tokyo bookings
  { id: 3, trip_id: 2, type: "flight", name: "JAL JL8764", starts_at: "2026-09-15T01:00:00Z", ends_at: "2026-09-15T06:00:00Z", confirmation_number: "JL-CONF-33442", notes: "NRT Terminal 1" },
  { id: 4, trip_id: 2, type: "hotel", name: "Hotel Gracery Shinjuku", starts_at: "2026-09-15T15:00:00Z", ends_at: "2026-09-22T11:00:00Z", confirmation_number: "GRA-2026-221", notes: "Godzilla view room" },
  { id: 5, trip_id: 2, type: "flight", name: "JAL JL8765", starts_at: "2026-09-22T17:00:00Z", ends_at: "2026-09-22T22:00:00Z", confirmation_number: "JL-CONF-33443", notes: "NRT Terminal 1" },

  // Bali bookings
  { id: 6, trip_id: 3, type: "flight", name: "Garuda GA881", starts_at: "2026-05-01T08:00:00Z", ends_at: "2026-05-01T16:00:00Z", confirmation_number: "GA-CONF-5567", notes: "DPS Airport" },
  { id: 7, trip_id: 3, type: "hotel", name: "Bambu Indah Resort", starts_at: "2026-05-01T14:00:00Z", ends_at: "2026-05-07T12:00:00Z", confirmation_number: "BAM-2026-889", notes: "Bamboo suite with river view" },

  // NYC bookings
  { id: 8, trip_id: 4, type: "flight", name: "Delta DL404", starts_at: "2026-10-01T07:00:00Z", ends_at: "2026-10-01T10:30:00Z", confirmation_number: "DL-CONF-10293", notes: "JFK Terminal 4" },
  { id: 9, trip_id: 4, type: "hotel", name: "The William Vale", starts_at: "2026-10-01T15:00:00Z", ends_at: "2026-10-05T11:00:00Z", confirmation_number: "WIL-2026-551", notes: "Williamsburg — rooftop pool" },

  // London bookings
  { id: 10, trip_id: 5, type: "flight", name: "British Airways BA178", starts_at: "2026-08-05T08:00:00Z", ends_at: "2026-08-05T12:00:00Z", confirmation_number: "BA-CONF-7712", notes: "LHR Terminal 5" },
  { id: 11, trip_id: 5, type: "hotel", name: "The Hoxton, Holborn", starts_at: "2026-08-05T14:00:00Z", ends_at: "2026-08-09T12:00:00Z", confirmation_number: "HOX-2026-334", notes: "Cosy double room" },
];
