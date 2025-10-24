const destinations = [
  {
    id: 1,
    name: "Hunza Valley",
    image: "/images/hunza-valley.jpg",
    shortDescription:
      "Hunza Valley — the crown jewel of Gilgit-Baltistan, Pakistan. A paradise of snow-capped peaks, turquoise lakes, and the legendary hospitality of the Hunzokuts people.",
    location: "Gilgit-Baltistan, Pakistan",
    mapLink: "https://goo.gl/maps/2y2R8pFDPqf6yZPQ6",

    highlights: [
      {
        title: "Karimabad",
        description:
          "The cultural heart of Hunza, home to the centuries-old Baltit and Altit Forts. Wander through its cobblestone lanes, local markets, and terraced apricot orchards.",
        image: "/images/karimabad.jpg",
      },
      {
        title: "Attabad Lake",
        description:
          "A striking turquoise lake formed after a landslide in 2010. Enjoy boating, jet skiing, and incredible reflections of surrounding mountains.",
        image: "/images/attabad-lake.jpg",
      },
      {
        title: "Passu Cones",
        description:
          "The iconic, sharply pointed peaks of Passu stand proudly along the Karakoram Highway, often photographed by travelers from across the globe.",
        image: "/images/passu-cones.jpg",
      },
      {
        title: "Eagle’s Nest Viewpoint",
        description:
          "A panoramic viewpoint located above Duikar village, offering the best sunrise and sunset views over Hunza, Ultar Sar, and Rakaposhi Peak.",
        image: "/images/eagles-nest.jpg",
      },
    ],

    travelInfo: {
      howToGetThere:
        "Hunza is easily accessible via the Karakoram Highway (KKH). From Gilgit, it’s a 2.5-hour scenic drive, while from Islamabad, the journey takes 18–20 hours by road. Alternatively, travelers can fly from Islamabad to Gilgit and continue to Hunza by car.",
      bestTime: [
        {
          season: "Spring (March–May)",
          detail:
            "The valley bursts into life with cherry blossoms and apricot blooms — an ideal time for photography and cultural exploration.",
          image: "/images/spring-hunza.jpg",
        },
        {
          season: "Summer (June–August)",
          detail:
            "The weather is cool and refreshing. Perfect for trekking, exploring glaciers, and enjoying local festivals.",
          image: "/images/summer-hunza.jpg",
        },
        {
          season: "Autumn (October–November)",
          detail:
            "Hunza glows with shades of gold, red, and orange. It’s the most colorful time of the year — a dream season for photographers.",
          image: "/images/autumn-hunza.jpg",
        },
        {
          season: "Winter (December–February)",
          detail:
            "Snow blankets the valley, offering serene beauty and peaceful isolation for those seeking a winter escape.",
          image: "/images/winter-hunza.jpg",
        },
      ],
    },

    accommodations: [
      { type: "Luxury", list: ["Serena Hunza", "Luxus Hunza"] },
      { type: "Mid-range", list: ["Hunza Embassy Hotel", "Roomy Dastakari"] },
      { type: "Budget", list: ["Local guesthouses", "Homestays"] },
    ],

    cuisine: [
      "Apricot Soup",
      "Chapshuro (meat pie)",
      "Hunza Bread",
      "Yak Meat Curry",
    ],

    history: `
      Hunza Valley has a deep-rooted history that dates back over a thousand years. 
      Once an independent princely state, Hunza was ruled by the Mirs (local kings) until 1974, when it was integrated into Pakistan. 
      Due to its location on the ancient Silk Route, Hunza was a major stop for traders traveling between China and Central Asia. 
      Its people, the Hunzokuts, have preserved a rich cultural heritage, a unique language (Burushaski), and remarkable longevity, often attributed to their natural diet and pure mountain lifestyle.
      <br /><br />
      The ancient forts of Baltit and Altit still stand as silent witnesses of Hunza’s royal past and defensive importance. 
      Throughout history, Hunza has also been known for its strategic significance — overlooking trade passages, glaciers, and high mountain passes such as Khunjerab, the modern gateway to China.
      Today, Hunza stands as a symbol of peace, natural splendor, and cultural preservation — a place where history, nature, and hospitality converge.
    `,
  },
];

export default destinations;
