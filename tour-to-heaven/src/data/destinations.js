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
    image: "/images/skardu-valley.jpg",
    shortDescription:
      "Skardu Valley — the gateway to the mighty Karakoram and home to lakes, peaks, and rugged landscapes unlike anywhere else in Pakistan.",
    location: "Gilgit-Baltistan, Pakistan",
    mapLink: "https://goo.gl/maps/exampleSkardu", // replace with actual map link

    highlights: [
      {
        title: "Kharpocho (Skardu) Fort",
        description:
          "A 16th-century hill-fort that overlooks Skardu town and the confluence of the Indus and Shigar Rivers. Built by King Ali Sher Khan Anchan, it remains a symbol of the region’s royal past. :contentReference[oaicite:1]{index=1}",
        image: "/images/kharpocho-fort.jpg",
      },
      {
        title: "Shangrila Resort & Lower Kachura Lake",
        description:
          "A scenic lakeside resort built around the ‘heart-shaped’ Lower Kachura Lake, surrounded by orchards and mountains — often called ‘Heaven on Earth’. :contentReference[oaicite:2]{index=2}",
        image: "/images/shangrila-lake.jpg",
      },
      {
        title: "Deosai National Park (Land of Giants)",
        description:
          "At over 4,000 m elevation, this vast high-altitude plateau is a wonder of wildflowers, wildlife (including Himalayan brown bears) and sweeping mountain views. :contentReference[oaicite:3]{index=3}",
        image: "/images/deosai-plateau.jpg",
      },
      {
        title: "Manthal Buddha Rock",
        description:
          "An ancient rock carving dating back to the 8th century, reflecting Skardu’s Buddhist heritage before the arrival of Islam. :contentReference[oaicite:4]{index=4}",
        image: "/images/manthal-buddha-rock.jpg",
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
          image: "/images/spring-skardu.jpg",
        },
        {
          season: "Summer (June–August)",
          detail:
            "Ideal time for trekking, visiting Deosai, lakeside adventures and cooler mountain evenings.",
          image: "/images/summer-skardu.jpg",
        },
        {
          season: "Autumn (September–October)",
          detail:
            "Golden foliage, clear skies and crisp air make this season a photographer’s favourite in Skardu.",
          image: "/images/autumn-skardu.jpg",
        },
        {
          season: "Winter (November–February)",
          detail:
            "Snow blankets the valley, roads may be tougher but the landscape turns into a white wonderland for the hardy traveller.",
          image: "/images/winter-skardu.jpg",
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
    name: "Fairy Meadows",
    image: "/images/fairy-meadows.jpg",
    shortDescription:
      "Fairy Meadows — one of the most beautiful alpine meadows in the world, tucked beneath the majestic north face of Nanga Parbat in Gilgit-Baltistan, Pakistan.",
    location: "Diamer District, Gilgit-Baltistan, Pakistan",
    mapLink: "https://goo.gl/maps/exampleFairyMeadows",  // update with actual Google Map link

    highlights: [
      {
        title: "Nanga Parbat View Point",
        description:
          "An iconic viewpoint offering a breathtaking sight of Nanga Parbat’s massive north face, often described as one of the most photogenic mountain scenes in the world. :contentReference[oaicite:1]{index=1}",
        image: "/images/nanga-parbat-view.jpg",
      },
      {
        title: "Reflection Lake",
        description:
          "A mirror-like alpine lake near Fairy Meadows that perfectly reflects Nanga Parbat on calm mornings — a must‐visit for photographers. :contentReference[oaicite:2]{index=2}",
        image: "/images/reflection-lake-fairy.jpg",
      },
      {
        title: "Beyal Camp & Glacier Trails",
        description:
          "Beyond the meadows lies Beyal Camp and glacier-fed trails that take you into the heart of the mountains — ideal for hiking and wild tranquillity. :contentReference[oaicite:3]{index=3}",
        image: "/images/beyal-camp-fairy.jpg",
      },
      {
        title: "Jeep Track to Tattu Village",
        description:
          "The legendary jeep track from Raikot Bridge to Tattu Village is narrow, steep and considered one of the world’s most thrilling mountain roads. :contentReference[oaicite:4]{index=4}",
        image: "/images/jeep-track-fairy.jpg",
      },
    ],

    travelInfo: {
      howToGetThere:
        "Start from Raikot Bridge on the Karakoram Highway. From there you take a 4×4 jeep ride (approx 1.5-2 hours) to Tattu Village, followed by a moderate 2-3 hour hike to the meadows. :contentReference[oaicite:5]{index=5}",
      bestTime: [
        {
          season: "Spring (April–May)",
          detail:
            "Lush green meadows, wildflowers blossoming and clear views of the mountains — excellent for nature walks.",
          image: "/images/spring-fairy-meadows.jpg",
        },
        {
          season: "Summer (June–August)",
          detail:
            "Peak trekking season, accessible trails, comfortable weather and longer daylight hours for exploring.",
          image: "/images/summer-fairy-meadows.jpg",
        },
        {
          season: "Autumn (September–October)",
          detail:
            "Golden light, fewer crowds, crisp air and spectacular sunsets make it a photographer’s paradise.",
          image: "/images/autumn-fairy-meadows.jpg",
        },
        {
          season: "Winter (November–March)",
          detail:
            "Snow-covered plateau, dramatic landscapes, but access is difficult and many facilities are closed — for experienced travellers only.",
          image: "/images/winter-fairy-meadows.jpg",
        },
      ],
    },

    accommodations: [
      { type: "Wooden Huts & Lodges", list: ["Fairy Meadows Cottages", "German Viewpoint Lodge"] },
      { type: "Mid-range", list: ["Tattu Village Guesthouses", "Beyal Camp Camping"] },
      { type: "Budget", list: ["Local homestays", "Camping sites"] },
    ],

    cuisine: [
      "Mountain apricot jam & bread",
      "Grilled trout (local lakeside catch)",
      "Butter chai & wild herb tea",
      "Traditional Shina bread (chapati) with lentils"
    ],

    history:
      `Fairy Meadows, locally known as “Joot” by the Shina-speaking community, lies at an altitude of around 3,300 m (10,800 ft), directly facing the north face of Nanga Parbat. :contentReference[oaicite:6]{index=6}
      
Historically, it served as a base for mountaineers attempting the “Killer Mountain” (Nanga Parbat) and remained relatively inaccessible until a narrow jeep track and hiking trail opened to facilitate tourism. :contentReference[oaicite:7]{index=7}
      
Over time the meadows transformed from a remote alpine pasture into a sought-after destination for nature-lovers, trekkers and photographers alike. The surrounding forests, meadows and glacial streams reflect both the local subsistence lifestyle of the Raikot valley communities and their resilience in harsh mountain environments.
      
Today, Fairy Meadows is celebrated not only for its dramatic views and adventurous access but also as a symbol of mountain-community driven tourism in the heart of Pakistan’s northern wilderness.`,
  },
  {
    id: 4,
    name: "Khunjerab Top (China Border)",
    image: "/images/khunjerab-top.jpg",
    shortDescription:
      "Khunjerab Top — the world’s highest paved international border crossing, linking Pakistan’s Hunza Valley with China’s Xinjiang region through the spectacular Karakoram Highway.",
    location: "Khunjerab Pass, Hunza District, Gilgit-Baltistan, Pakistan",
    mapLink: "https://goo.gl/maps/exampleKhunjerabTop", // replace with actual Google Maps link

    highlights: [
      {
        title: "Khunjerab National Park",
        description:
          "A high-altitude park home to snow leopards, Himalayan ibex, Marco Polo sheep, and yaks grazing along the rugged terrain — offering surreal Himalayan scenery and rare wildlife sightings. ([pakistantravelguide.pk](https://www.pakistantravelguide.pk/khunjerab-national-park/?utm_source=chatgpt.com))",
        image: "/images/khunjerab-national-park.jpg",
      },
      {
        title: "Pak-China Friendship Gate",
        description:
          "The iconic white-stone gate marking the official border between Pakistan and China — a powerful symbol of the Pak-China friendship and the highest paved border gate in the world. ([china.org.cn](https://www.china.org.cn/travel/2015-07/10/content_36038314.htm?utm_source=chatgpt.com))",
        image: "/images/pak-china-gate.jpg",
      },
      {
        title: "Karakoram Highway Journey",
        description:
          "The legendary KKH takes you through tunnels, glaciers, and valleys — often called the ‘Eighth Wonder of the World’ for its engineering at extreme altitudes. ([dawn.com](https://www.dawn.com/news/1409659?utm_source=chatgpt.com))",
        image: "/images/karakoram-highway.jpg",
      },
      {
        title: "Sust Border Town",
        description:
          "A small border town near Khunjerab used for customs and immigration — with local cafés, souvenir shops, and a last glimpse of Pakistani culture before entering China.",
        image: "/images/sust-town.jpg",
      },
    ],

    travelInfo: {
      howToGetThere:
        "From Hunza (Karimabad), drive north along the Karakoram Highway for about 3–4 hours. The road climbs past Passu Cones and Sost to reach Khunjerab Top at 4,693 m (15,397 ft). The pass is usually accessible from May to November. ([pakistantravelblog.com](https://pakistantravelblog.com/khunjerab-pass/?utm_source=chatgpt.com))",
      bestTime: [
        {
          season: "Late Spring (May–June)",
          detail:
            "Pleasant temperatures and clear skies make it ideal for photography. Snow begins to melt and the road reopens after winter closures.",
          image: "/images/spring-khunjerab.jpg",
        },
        {
          season: "Summer (July–August)",
          detail:
            "Mild daytime weather, open border, and lush green valleys — perfect for family trips and sightseeing.",
          image: "/images/summer-khunjerab.jpg",
        },
        {
          season: "Autumn (September–October)",
          detail:
            "Golden hues across the mountains and minimal traffic — a great time for peaceful exploration and capturing vibrant colors.",
          image: "/images/autumn-khunjerab.jpg",
        },
        {
          season: "Winter (November–April)",
          detail:
            "Heavy snow closes the pass; however, the surrounding valleys offer breathtaking snow views for adventurers ready to brave the cold.",
          image: "/images/winter-khunjerab.jpg",
        },
      ],
    },

    accommodations: [
      { type: "Mid-range", list: ["Sost Border Hotel", "Passu Ambassador Inn"] },
      { type: "Budget", list: ["Local Guest Houses in Sost", "Homestays in Passu"] },
      { type: "Luxury (nearby)", list: ["Hunza Serena Inn", "Hard Rock Hunza"] },
    ],

    cuisine: [
      "Local yak meat dishes",
      "Hunza walnut cake and herbal teas",
      "Apricot soup (regional specialty)",
      "Traditional naan with mountain honey",
    ],

    history: `
Khunjerab Top (also called Khunjerab Pass) sits at an elevation of approximately 4,693 m (15,397 ft), marking the highest paved border crossing in the world and one of the most scenic gateways between South and Central Asia. ([wikipedia.org](https://en.wikipedia.org/wiki/Khunjerab_Pass?utm_source=chatgpt.com))

Historically, this route served as part of the ancient Silk Road network linking traders from China to the Indian subcontinent. The name “Khunjerab” originates from Wakhi language — *Khun* (blood) and *Jerav* (stream) — referencing ancient conflicts fought near this high pass. ([thenews.com.pk](https://www.thenews.com.pk/latest/1083427-khunjerab-pass-the-highest-paved-border-crossing-in-the-world?utm_source=chatgpt.com))

In modern times, it became an engineering marvel after the construction of the **Karakoram Highway (KKH)** in the 1970s, built jointly by Pakistan and China. Today, the pass serves as a major part of the **China–Pakistan Economic Corridor (CPEC)** and a symbol of enduring friendship between the two nations.

Travelers experience a truly unique moment here — where the Pakistani landscape of rocky valleys and snowfields meets the vast highlands of China’s Xinjiang province. The thin mountain air, breathtaking altitude, and striking scenery make Khunjerab Top one of Pakistan’s most unforgettable destinations.`,
  },
  {
    id: 5,
    name: "Attabad Lake",
    image: "/images/attabad-lake-main.jpg",
    shortDescription:
      "Attabad Lake — the breathtaking turquoise-blue lake of Hunza, born from a natural disaster and now one of Pakistan’s most stunning and must-visit tourist attractions.",
    location: "Gojal Valley, Hunza District, Gilgit-Baltistan, Pakistan",
    mapLink: "https://goo.gl/maps/GKg6uV4cm2ytnHh48",

    highlights: [
      {
        title: "Boating & Jet Skiing",
        description:
          "Attabad Lake is famous for thrilling boating and jet-ski adventures amidst crystal-clear waters surrounded by towering mountains. The experience offers a perfect blend of peace and adrenaline.",
        image: "/images/attabad-boating.jpg",
      },
      {
        title: "Luxus Hunza Resort",
        description:
          "Perched on the lake’s edge, Luxus Hunza offers luxury accommodation with panoramic views of the turquoise waters — ideal for honeymooners and tourists seeking comfort with nature.",
        image: "/images/luxus-hunza.jpg",
      },
      {
        title: "Gulmit Village",
        description:
          "Located near Attabad, Gulmit is a historic Wakhi village known for its traditional houses, local handicrafts, and warm hospitality.",
        image: "/images/gulmit-village.jpg",
      },
      {
        title: "Passu Cones & Hussaini Suspension Bridge",
        description:
          "Just a short drive away, these iconic spots are a must-visit — the sharp peaks of Passu Cones and the thrilling Hussaini Bridge make the journey unforgettable.",
        image: "/images/hussaini-bridge.jpg",
      },
    ],

    travelInfo: {
      howToGetThere:
        "Attabad Lake is located approximately 20 km from Karimabad, Hunza, and can be reached via the Karakoram Highway (KKH). It’s about a 2.5-hour drive from Gilgit City. Private vehicles, jeeps, and local transport are available from Hunza and Gilgit.",
      bestTime: [
        {
          season: "Spring (March–May)",
          detail:
            "Cherry blossom season with mild weather and fresh blue hues in the lake. Perfect for boating and light trekking.",
          image: "/images/attabad-spring.jpg",
        },
        {
          season: "Summer (June–August)",
          detail:
            "Peak tourist season with warm temperatures, full water levels, and vibrant views. Ideal for water sports and outdoor photography.",
          image: "/images/attabad-summer.jpg",
        },
        {
          season: "Autumn (September–October)",
          detail:
            "Golden trees and clear skies make the turquoise lake shine even more beautifully. Fewer crowds and cooler evenings.",
          image: "/images/attabad-autumn.jpg",
        },
        {
          season: "Winter (November–February)",
          detail:
            "The lake partially freezes during harsh winters, turning into a surreal icy wonderland — a hidden gem for adventurous travelers.",
          image: "/images/attabad-winter.jpg",
        },
      ],
    },

    accommodations: [
      { type: "Luxury", list: ["Luxus Hunza", "Hard Rock Hunza Resort"] },
      { type: "Mid-range", list: ["Hunza Embassy Hotel", "Hunza Elites"] },
      { type: "Budget", list: ["Local guesthouses in Gulmit", "Homestays near Attabad"] },
    ],

    cuisine: [
      "Chapshuro (Hunza meat pie)",
      "Apricot soup",
      "Yak karahi",
      "Traditional Hunza bread with honey",
    ],

    history: `
Attabad Lake was formed in January 2010 after a massive landslide in Attabad village blocked the Hunza River. The disaster tragically claimed 20 lives and submerged several villages, displacing over 6,000 people. ([wikipedia.org](https://en.wikipedia.org/wiki/Attabad_Lake?utm_source=chatgpt.com))

Initially viewed as a tragedy, the lake soon became a symbol of resilience and rebirth for the people of Hunza. Over the years, its mesmerizing blue waters attracted tourists from across Pakistan and the world. The Karakoram Highway, which was once blocked, was rebuilt through a series of tunnels and bridges — now famously known as the **Attabad Tunnels**, a remarkable engineering achievement under the China–Pakistan Economic Corridor (CPEC).

Today, Attabad Lake is one of the most photographed locations in Pakistan. Its surreal blue color, created by glacial sediment, shifts in tone with sunlight and seasons. Visitors experience serenity, adventure, and a powerful story of nature’s transformation — turning tragedy into breathtaking beauty.`,
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
