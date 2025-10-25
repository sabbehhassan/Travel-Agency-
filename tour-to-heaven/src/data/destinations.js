const destinations = [
  {
    id: 1,
    name: "Hunza Valley",
    image: "/assets/hunza/hunza-valley.jpg",
    shortDescription:
      "Hunza Valley — the crown jewel of Gilgit-Baltistan, Pakistan. A paradise of snow-capped peaks, turquoise lakes, and the legendary hospitality of the Hunzokuts people.",
    location: "Gilgit-Baltistan, Pakistan",
    mapLink: "https://www.google.com/maps/place/Altit+Fort/@36.3172554,74.6811672,17z/data=!3m1!4b1!4m6!3m5!1s0x38e8a0b2478f1125:0x25316547da011a9d!8m2!3d36.3172554!4d74.6811672!16zL20vMGNwNW5o?hl=en&entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D",

    highlights: [
      {
        title: "Karimabad",
        description:
          "The cultural heart of Hunza, home to the centuries-old Baltit and Altit Forts. Wander through its cobblestone lanes, local markets, and terraced apricot orchards.",
        image: "/assets/hunza/karimabad.jpg",
      },
      {
        title: "Attabad Lake",
        description:
          "A striking turquoise lake formed after a landslide in 2010. Enjoy boating, jet skiing, and incredible reflections of surrounding mountains.",
        image: "/assets/hunza/attabad.jpeg",
      },
      {
        title: "Passu Cones",
        description:
          "The iconic, sharply pointed peaks of Passu stand proudly along the Karakoram Highway, often photographed by travelers from across the globe.",
        image: "/assets/hunza/Pasu-cone.jpg",
      },
      {
        title: "Eagle’s Nest Viewpoint",
        description:
          "A panoramic viewpoint located above Duikar village, offering the best sunrise and sunset views over Hunza, Ultar Sar, and Rakaposhi Peak.",
        image: "/assets/hunza/eagle-nest.jpg",
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
          image: "/assets/hunza/spring.jpeg",
        },
        {
          season: "Summer (June–August)",
          detail:
            "The weather is cool and refreshing. Perfect for trekking, exploring glaciers, and enjoying local festivals.",
          image: "/assets/hunza/summer.jpg",
        },
        {
          season: "Autumn (October–November)",
          detail:
            "Hunza glows with shades of gold, red, and orange. It’s the most colorful time of the year — a dream season for photographers.",
          image: "/assets/hunza/autumn.jpeg",
        },
        {
          season: "Winter (December–February)",
          detail:
            "Snow blankets the valley, offering serene beauty and peaceful isolation for those seeking a winter escape.",
          image: "/assets/hunza/winter.jpg",
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
  {
    id: 2,
    name: "Skardu Valley",
    image: "/assets/skardu/skardu.jpg",
    shortDescription:
      "Skardu Valley — the gateway to the mighty Karakoram and home to lakes, peaks, and rugged landscapes unlike anywhere else in Pakistan.",
    location: "Gilgit-Baltistan, Pakistan",
    mapLink: "https://goo.gl/maps/exampleSkardu", // replace with actual map link

    highlights: [
      {
        title: "Kharpocho (Skardu) Fort",
        description:
          "A 16th-century hill-fort that overlooks Skardu town and the confluence of the Indus and Shigar Rivers. Built by King Ali Sher Khan Anchan, it remains a symbol of the region’s royal past. :contentReference[oaicite:1]{index=1}",
        image: "/assets/skardu/kharpocho.jpg",
      },
      {
        title: "Shangrila Resort & Lower Kachura Lake",
        description:
          "A scenic lakeside resort built around the ‘heart-shaped’ Lower Kachura Lake, surrounded by orchards and mountains — often called ‘Heaven on Earth’. :contentReference[oaicite:2]{index=2}",
        image: "/assets/skardu/Shangrila.jpeg",
      },
      {
        title: "Deosai National Park (Land of Giants)",
        description:
          "At over 4,000 m elevation, this vast high-altitude plateau is a wonder of wildflowers, wildlife (including Himalayan brown bears) and sweeping mountain views. :contentReference[oaicite:3]{index=3}",
        image: "/assets/skardu/deosai.jpg",
      },
      {
        title: "Manthal Buddha Rock",
        description:
          "An ancient rock carving dating back to the 8th century, reflecting Skardu’s Buddhist heritage before the arrival of Islam. :contentReference[oaicite:4]{index=4}",
        image: "/assets/skardu/manthal.jpeg",
      },
    ],

    travelInfo: {
      howToGetThere:
        "Skardu can be reached by flight from Islamabad (approx. 1 hour) or by scenic road via the Karakoram Highway and Skardu Road from Gilgit (approx. 5–6 hours). The journey itself is part of the experience, with dramatic mountain vistas and river valleys. :contentReference[oaicite:5]{index=5}",
      bestTime: [
        {
          season: "Spring (March–May)",
          detail:
            "Snow begins to melt, cherry and apricot orchards bloom, and the weather is fresh — perfect for exploring lakes and valleys.",
          image: "/assets/skardu/spring.jpeg",
        },
        {
          season: "Summer (June–August)",
          detail:
            "Ideal time for trekking, visiting Deosai, lakeside adventures and cooler mountain evenings.",
          image: "/assets/skardu/summer.jpeg",
        },
        {
          season: "Autumn (September–October)",
          detail:
            "Golden foliage, clear skies and crisp air make this season a photographer’s favourite in Skardu.",
          image: "/assets/skardu/autumn.avif",
        },
        {
          season: "Winter (November–February)",
          detail:
            "Snow blankets the valley, roads may be tougher but the landscape turns into a white wonderland for the hardy traveller.",
          image: "/assets/skardu/winter.jpeg",
        },
      ],
    },

    accommodations: [
      { type: "Luxury", list: ["Serena Shigar Lodge", "Khan­bah­dur Homestay & Boutique"] },
      { type: "Mid-range", list: ["Shangrila Resort Skardu", "Satpara Lake Resort"] },
      { type: "Budget", list: ["Local guesthouses in Skardu city", "Homestays in Shigar Valley"] },
    ],

    cuisine: [
      "Balti Lamb Stew",
      "Apricot Jam & Local Nuts",
      "Garma-Chai (Hot Tea) with Butter",
      "Buckwheat Bread (Thukpa style)",
    ],

    history:
      `Skardu has a rich and layered heritage spanning centuries. In the 16th century, under King Ali Sher Khan Anchan, Baltistan reached a golden age: the construction of forts like Kharpocho, the rise of the Balti kingdom, and strong trade links with Tibet and Central Asia. :contentReference[oaicite:6]{index=6}
      <br /><br />
      Prior to the spread of Islam, the region was a stronghold of Buddhist and Bon traditions, evidenced by monuments like the Manthal Buddha Rock. :contentReference[oaicite:7]{index=7}
      In the 19th century, Baltistan fell under Dogra rule and later became part of Pakistan in 1948. Today, Skardu serves as a hub for mountaineering expeditions to peaks including K2, and tourism has grown rapidly while local culture and architecture remain deeply rooted in Balti tradition. :contentReference[oaicite:8]{index=8}
      <br /><br />
      From royal palaces and ancient monasteries to glacial lakes and high-altitude plains, Skardu offers a unique blend of nature, culture and history — where each winding river valley and stone fort tells a story of mountain kingdoms and travellers seeking the peaks.`,
  },
  {
    id: 3,
    name: "Astore Valley",
    image: "/assets/astore/Astore.jpg",
    shortDescription:
      "Astore Valley — the lush, serene and lesser-known gem of Gilgit-Baltistan, Pakistan, nestled between mighty peaks, pristine lakes and ancient villages.",
    location: "Astore District, Gilgit-Baltistan, Pakistan",
    mapLink: "https://www.google.com/maps/place/Astore+Morr+(Chowk)+KKH/@35.5695126,74.5079054,12.21z/data=!4m10!1m2!2m1!1sastore!3m6!1s0x38e68b7686e44027:0x6dc4e96cfd8715f0!8m2!3d35.568647!4d74.6249369!15sCgZhc3RvcmWSARNoaXN0b3JpY2FsX2xhbmRtYXJr4AEA!16s%2Fg%2F11hz98sh2_?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D",  // update with actual link

    highlights: [
      {
        title: "Rama Meadows & Rama Lake",
        description:
          "A breathtaking alpine meadow and lake set beneath the north face of Nanga Parbat. Pine forests, green pastures and a calm lake make this one of the valley’s signature spots. :contentReference[oaicite:1]{index=1}",
        image: "/assets/astore/rama.jpg",
      },
      {
        title: "Minimarg Valley",
        description:
          "Remote and pristine, Minimarg lies in the eastern side of Astore and features wild meadows, dense forests, and the seldom-visited route through Burzil Pass. :contentReference[oaicite:2]{index=2}",
        image: "/assets/astore/minimarg.jpg",
      },
      {
        title: "Deosai Plateau Access via Astore",
        description:
          "Astore is one of the main gateways to the vast high-altitude Deosai Plains — ‘Land of the Giants’ — offering wildflowers, large wildlife and open skies. :contentReference[oaicite:4]{index=4}",
        image: "/assets/astore/deosai.jpg",
      },
      {
        title: "Gorikot & Bubin Villages",
        description:
          "Traditional Shina-language villages tucked in the valley, offering cultural authenticity, trout-filled rivers and genuine local hospitality. :contentReference[oaicite:5]{index=5}",
        image: "/assets/astore/gorikot.jpg",
      },
    ],

    travelInfo: {
      howToGetThere:
        "From Gilgit drive east along the Astore road (approx. 4-5 hours) which branches from the Karakoram Highway. Roads may be rough and high-altitude. :contentReference[oaicite:6]{index=6}",
      bestTime: [
        { season: "Spring (April–May)", detail: "Fresh green meadows, snow-capped peaks melting and wildflowers emerging.", image: "/assets/astore/Spring.jpeg" },
        { season: "Summer (June–August)", detail: "Peak season for trekking, lakes and alpine vistas.", image: "/assets/astore/summer.jpeg" },
        { season: "Autumn (Sept–October)", detail: "Crisp air, golden foliage and fewer tourists make it a photographer’s dream.", image: "/assets/astore/autumn.jpeg" },
        { season: "Winter (Nov–March)", detail: "Heavy snow blankets the valley, roads may be closed — for experienced travellers only.", image: "/assets/astore/winter.jpeg" },
      ],
    },

    accommodations: [
      { type: "Mid-range", list: ["PTDC Rama Lake Motel", "Astore Continental Hotel"] },
      { type: "Budget", list: ["Guesthouses in Gorikot", "Homestays in Bubin"] },
      { type: "Camping & Trekking", list: ["Rama Meadows campsites", "Minimarg remote tents"] },
    ],

    cuisine: [
      "Trout fish from mountain streams",
      "Apricot jam & local nuts",
      "Butter chai with yak milk",
      "Buckwheat bread (popular in high altitude valleys)"
    ],

    history:
      `Astore Valley has served as a corridor and highland refuge for centuries. Nestled between the great ranges of the Himalayas and the Karakoram, it was historically part of trade and movement routes linking the north with Kashmir and beyond. :contentReference[oaicite:7]{index=7}  
      
Before the modern era, local Shina-speaking communities cultivated subsistence agriculture, livestock and traditional crafts in this mountainous terrain. With the opening of roads and the arrival of tourism in recent decades, the valley has begun to share its remote beauty with the world.  
      
Despite modern access, Astore retains a quieter, less commercialised character compared to its neighbouring hotspots. From ancient pine forests in Rama to hidden passes in Minimarg, the valley invites travellers to slow down and immerse themselves in nature, culture and high-altitude serenity. `,

  },
   {
    id: 4,
    name: "Ghizer Valley",
    image: "/assets/ghizer/ghizer.jpg",
    shortDescription:
      "Ghizer Valley — the westernmost gem of Gilgit-Baltistan, Pakistan, where lush meadows, turquoise lakes and age-old cultures meet high mountain peaks.",
    location: "Gupis-Yasin / Ghizer District, Gilgit-Baltistan, Pakistan",
    mapLink: "https://www.google.com/maps/search/ghizer+valley+address/@36.3051655,73.5562134,10z?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D",  // replace with actual map link

    highlights: [
      {
        title: "Phander Lake & Meadows",
        description:
          "A peaceful alpine lake with emerald green waters and surrounding wildflower meadows in the heart of Ghizer — perfect for photography and nature walks. :contentReference[oaicite:1]{index=1}",
        image: "/assets/ghizer/Phander.jpg",
      },
      {
        title: "Shandur Pass – World’s Highest Polo Ground",
        description:
          "A high-altitude plateau linking Ghizer and Chitral, famed for the annual polo festival held at some 12,500 ft above sea level. :contentReference[oaicite:2]{index=2}",
        image: "/assets/ghizer/shandur.jpg",
      },
      {
        title: "Khalti Lake & Gupis Valley",
        description:
          "Crystal clear lake near Gupis where trout fishing, ice-skating in winter and scenic calm waters make it a standout attraction. :contentReference[oaicite:3]{index=3}",
        image: "/assets/ghizer/Khalti.jpg",
      },
      {
        title: "Yasin & Ishkoman Valleys",
        description:
          "Remote valleys of Ghizer rich in heritage, mountain passes, and traditional Shina/Khowar culture, offering trekking and wild landscapes. :contentReference[oaicite:4]{index=4}",
        image: "/assets/ghizer/ishkoman.jpg",
      },
    ],

    travelInfo: {
      howToGetThere:
        "Ghizer Valley is accessible by road from Gilgit via the Gilgit-Chitral highway, passing Gupis and onward to the valley’s many sub-valleys. The journey itself offers dramatic scenery of rivers, forests and high peaks. :contentReference[oaicite:5]{index=5}",
      bestTime: [
        {
          season: "Spring (April–June)",
          detail:
            "Green meadows come alive, rivers swell with snowmelt, and the weather is mild — good for photography and nature walks.",
          image: "/assets/ghizer/spring.jpeg",
        },
        {
          season: "Summer (July–August)",
          detail:
            "Warm but not hot, perfect for trekking, valley exploration and exploring remote villages in Ghizer.",
          image: "/assets/ghizer/summer.jpg",
        },
        {
          season: "Autumn (September–October)",
          detail:
            "Foliage turns gold, skies are clear, fewer tourists and the valley atmosphere is calm and serene.",
          image: "/assets/ghizer/autumn.jpg",
        },
        {
          season: "Winter (November–March)",
          detail:
            "Snow blankets the higher reaches, some roads may be closed — great for experienced travellers seeking solitude and snowy wilderness.",
          image: "/assets/ghizer/winter.jpg",
        },
      ],
    },

    accommodations: [
      { type: "Mid-range", list: ["Gahkuch Guesthouse", "Phander Lake View Lodge"] },
      { type: "Budget", list: ["Homestays in Gupis", "Camping sites in Ishkoman"] },
      { type: "Luxury (select)", list: ["Boutique lodge near Shandur Pass"] },
    ],

    cuisine: [
      "Local trout fish (fresh-caught in alpine streams)",
      "Apricot jam & walnut bread",
      "Butter chai with yak milk",
      "Wild herb tea from Ghizer forests",
    ],

    history: `
Ghizer Valley has an ancient and diverse heritage that spans mountain kingdoms, trade routes and cultural migration. Historically referred to as “Koh-i-Ghizer” or “Valley of Refugees” (from the Khowar term “Gherz”), it served as a refuge for tribes migrating from Chitral and beyond. :contentReference[oaicite:6]{index=6}

Under the rule of local Rajas, the area was part of trade networks linking the Hindu Kush, Karakoram and Pamir regions, with passes like Darkot and Qurumbar facilitating movement of people and goods. :contentReference[oaicite:7]{index=7}

In modern times, Ghizer remains a quieter and less-visited counterpart to its neighbouring tourist hubs, offering rich culture (Shina, Khowar and Burushaski languages), warm Ismaili and Sunni communities, and incredible natural diversity — from low riverside orchards to high altitude glaciers. :contentReference[oaicite:8]{index=8}

Today, Ghizer Valley is increasingly recognised for its potential in sustainable tourism, trekking, fishing and cultural exchange — a true “land of lakes and peaks” waiting to be discovered.
    `,
  },
  {
    id: 5,
    name: "Nagar District",
    image: "/assets/nagar/n.jpg",
    shortDescription:
      "Nagar District — a majestic high-mountain region of Gilgit-Baltistan, Pakistan, known for towering peaks, hidden meadows, gemstone mines and rich cultural heritage.",
    location: "Gilgit-Baltistan, Pakistan",
    mapLink: "https://goo.gl/maps/exampleNagar",  // update with actual link

    highlights: [
      {
        title: "Rakaposhi Peak",
        description:
          "Soaring at 7,788 m, Rakaposhi dominates the skyline of Nagar Valley and is considered one of the most beautiful mountains in the world. :contentReference[oaicite:1]{index=1}",
        image: "/assets/nagar/spring.jpg",
      },
      {
        title: "Hoper & Hisper Valleys",
        description:
          "These remote valleys in upper Nagar offer glaciers, alpine meadows and quiet trekking routes — far from the crowds. :contentReference[oaicite:2]{index=2}",
        image: "/images/hoper-valley.jpg",
      },
      {
        title: "Gemstone Mines of Sumayar & Minapin",
        description:
          "Nagar is famed for its precious stones — aquamarine, topaz and others mined in Sumayar & Minapin valleys. :contentReference[oaicite:3]{index=3}",
        image: "/images/sumayar-gemstone-mine.jpg",
      },
      {
        title: "Kacheli Lake & Meadows",
        description:
          "A high-altitude lake set within Miacher valley of Nagar District — tranquil, scenic and off-beat. :contentReference[oaicite:4]{index=4}",
        image: "/images/kacheli-lake.jpg",
      },
    ],

    travelInfo: {
      howToGetThere:
        "Nagar can be reached via the Karakoram Highway from Gilgit. The district spans from lower valleys along the KKH to the remote upper valleys such as Hisper and Hoper. :contentReference[oaicite:5]{index=5}",
      bestTime: [
        {
          season: "Spring (April–May)",
          detail:
            "Snow recedes, orchards bloom, and meadows open up — a wonderful time to visit lower Nagar and enjoy fruit blossoms.",
          image: "/assets/nagar/spring.jpg",
        },
        {
          season: "Summer (June–August)",
          detail:
            "Clear skies, full access to high-altitude valleys and glaciers — optimal for trekking and mountain photography.",
          image: "/assets/nagar/summm.jpg",
        },
        {
          season: "Autumn (September–October)",
          detail:
            "The valley changes colors, fewer tourists and crisp air make it ideal for a peaceful escape.",
          image: "/assets/nagar/aut.jpeg",
        },
        {
          season: "Winter (November–March)",
          detail:
            "Heavy snow blankets many of the higher passes and tracks; only lower regions may be accessible — a time for solitude and winter landscapes.",
          image: "/assets/nagar/winter.jpeg",
        },
      ],
    },

    accommodations: [
      { type: "Mid-range", list: ["Nagar Khas Guesthouse", "Bar Valley View Lodge"] },
      { type: "Budget", list: ["Homestays in Minapin", "Guesthouses in Chaprote"] },
      { type: "Adventure Camping", list: ["Hoper Valley campsites", "Hisper glacier base-camp tents"] },
    ],

    cuisine: [
      "Apricot jam and local fruits of Nagar orchards",
      "Yak meat stew (traditional northern fare)",
      "Buckwheat bread (alpine high-valley staple)",
      "Butter tea with local mountain herbs",
    ],

    history: `
Nagar has a long and layered history. Originally a princely state for over a millennium, it maintained its own Mir (ruler) and autonomous status until 1974 when it was integrated into Pakistan’s Northern Areas. :contentReference[oaicite:6]{index=6}  
The region was also part of old mountain trade routes and is rich in gem-mining traditions. Ecologically, its terrain spans from fertile orchards to permanent snowfields and glaciers — less than 1 % of the land is used for agriculture. :contentReference[oaicite:7]{index=7}  
Today, Nagar balances its heritage, mountain culture and growing tourism, while offering some of the most dramatic mountain scenery in the Karakoram range.`,
  },

  {
    id: 6,
    name: "Deosai Plains",
    image: "/images/deosai-main.jpg",
    shortDescription:
      "Deosai Plains — the vast alpine plateau of Gilgit-Baltistan, Pakistan known as the “Land of Giants”, offering wildflower carpets, high-altitude lakes and wildlife above the clouds.",
    location: "Skardu / Astore Districts, Gilgit-Baltistan, Pakistan",
    mapLink: "https://goo.gl/maps/exampleDeosai", // replace with actual link

    highlights: [
      {
        title: "Sheosar Lake",
        description:
          "A stunning high-altitude lake at 4,250 m inside Deosai — crystal blue waters set against snow-capped peaks and wildflower meadows. :contentReference[oaicite:1]{index=1}",
        image: "/images/sheosar-lake.jpg",
      },
      {
        title: "Himalayan Brown Bear Habitat",
        description:
          "Deosai is one of the few places where the endangered Himalayan brown bear roams freely across open plains and glacial streams. :contentReference[oaicite:2]{index=2}",
        image: "/images/brown-bear-deosai.jpg",
      },
      {
        title: "Wildflower Carpet in Summer",
        description:
          "In summer months the plateau melts from white into a vibrant sea of wildflowers, with hundreds of plant species blooming across the plains. :contentReference[oaicite:3]{index=3}",
        image: "/images/deosai-wildflowers.jpg",
      },
      {
        title: "Jeep Safari & Adventure Drive",
        description:
          "A thrilling 4×4 ride from Skardu or Astore across rugged terrain leads visitors into Deosai’s remote wilderness. :contentReference[oaicite:4]{index=4}",
        image: "/images/deosai-jeep-safari.jpg",
      },
    ],

    travelInfo: {
      howToGetThere:
        "From Skardu town, take the Skardu-Deosai road via Sadpara Lake and enter the plateau (requires 4×4). Access is typically open from June to September. :contentReference[oaicite:5]{index=5}",
      bestTime: [
        {
          season: "Summer (June–August)",
          detail:
            "The plateau is accessible, wildflowers bloom, and weather is moderate — the ideal time to visit Deosai.",
          image: "/images/deosai-summer.jpg",
        },
        {
          season: "Spring (May)",
          detail:
            "Snow begins melting, wildflower buds appear and the landscape transitions — early access possible.",
          image: "/images/deosai-spring.jpg",
        },
        {
          season: "Autumn (September–October)",
          detail:
            "Wildflowers fade to golden hues, skies clear and it’s quieter — a peaceful time to visit before snow returns.",
          image: "/images/deosai-autumn.jpg",
        },
        {
          season: "Winter (November–April)",
          detail:
            "The plateau is snow-bound, roads often closed — only experienced travellers or special tours may access.",
          image: "/images/deosai-winter.jpg",
        },
      ],
    },

    accommodations: [
      { type: "Camping & Glamping", list: ["Bara Pani Camping", "Glamping at Sheosar Lake"] },
      { type: "Mid-range", list: ["Plateau View Lodge (Skardu)", "Deosai View Guesthouse"] },
      { type: "Budget", list: ["Skardu City Guesthouses", "Homestays in Sadpara/Chilam"] },
    ],

    cuisine: [
      "Local trout fish (fresh-caught in alpine streams)",
      "Apricot jam & wild herb tea",
      "Buckwheat bread (Thukpa style)",
      "Yak meat curry (traditional high-altitude fare)",
    ],

    history:
      `Deosai Plains have been known in Balti language as “Ghbiarsa” meaning “Summer’s Place” because the high-altitude plateau remains snow-covered for much of the year. :contentReference[oaicite:6]{index=6}  
      
Declared a national park in 1993 to protect its unique ecosystem dominated by the Himalayan brown bear, ibex, marmots and high-altitude wetlands, Deosai spans over ~358,400 hectares and sits at an average elevation of 4,114 m above sea level. :contentReference[oaicite:7]{index=7}  
      
Historically, seasonal pastoralists used these plains to graze herds during the short summer window, and the region featured in local folklore and mountain-route stories linking Baltistan, Ladakh and Astore. Today, Deosai is an ecological marvel — a sweeping high wilderness where the air is thin, the wildflowers abundant, the silence deep, and the skies wide — one of Pakistan’s most enchanting remote destinations.`,
  },

];


export default destinations;
