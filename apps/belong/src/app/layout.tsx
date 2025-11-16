import "../styles/globals.css";
// include styles from the ui package
import "ui/styles.css";

import localFont from "next/font/local";

const linotte = localFont({
  src: [
    {
      path: "../public/fonts/Linotte-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/Linotte-Regular.woff2",
      weight: "400",
    },
    { path: "../public/fonts/Linotte-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-linotte",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${linotte.variable} bg-white`}>
      <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Split Screen Layout</title>
    <style>
        /* Basic reset to fill the whole page */
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden; /* Prevents whole page from scrolling */
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        /* Make body a flex container to hold panes + footer */
        body {
            display: flex;
            flex-direction: column;
        }

        /* The main container */
        .split-container {
            flex: 1; /* This makes it take all available space */
            display: flex;
            width: 100%;
            overflow: hidden; /* Prevents resizing issues */
            
            /* * DEFAULT: Landscape Mode (Left/Right) 
             * This will apply to desktop browsers and landscape devices.
             */
            flex-direction: row; 
        }

        /* Styling for each content pane */
        .split-pane {
            /* Let the content inside the pane scroll if needed */
            overflow: auto; 
            background-color: #f9f9f9;
        }

        .split-pane iframe {
            width: 100%;
            height: 100%;
            border: none;
        }

        /* --- Sizing --- */

        /* This pane gets 1/3 of the space */
        #translate-pane {
            flex: 1; /* 1 part */
            /* Default (landscape) constraint */
            min-width: 300px; 
            overflow-y: hidden; /* Hides vertical scrollbar */
            border-right: 1px solid #ddd;
        }

        /* This pane gets 2/3 of the space */
        #carols-pane {
            flex: 2; /* 2 parts */
            /* The overflow:auto is already set on .split-pane, 
               which will make the song lyrics scrollable */
        }


        /* * OVERRIDE: Portrait Mode (Top/Bottom) 
         * This media query applies when the height is greater than the width.
         */
        @media (orientation: portrait) {
            .split-container {
                flex-direction: column; /* Stack top-to-bottom */
            }

            #translate-pane {
                /* Reset landscape constraint */
                min-width: 0; 
                /* Apply portrait constraint */
                min-height: 200px; /* Protect this minimum height */
                border-right: none;
                border-bottom: 1px solid #ddd;
            }
        }

        /* --- STYLES FOR SONGBOOK --- */

        /* Container for the tab buttons */
        .tab-bar {
            display: flex;
            flex-wrap: wrap; /* Allows tabs to wrap on smaller screens */
            background-color: #fff;
            border-bottom: 1px solid #ccc;
            /* Sticky tabs to the top of the pane */
            position: sticky;
            top: 0;
            z-index: 10;
        }

        /* Style for each tab button */
        .tab-link {
            padding: 12px 18px;
            cursor: pointer;
            border: none;
            background-color: transparent;
            font-size: 1rem;
            color: #555;
            border-bottom: 3px solid transparent;
            transition: all 0.2s ease;
        }

        .tab-link:hover {
            background-color: #f0f0f0;
            color: #000;
        }

        /* Style for the *active* tab button */
        .tab-link.active {
            color: #005a9c;
            border-bottom-color: #005a9c;
            font-weight: 600;
        }

        /* Container for the song lyrics */
        .song-content {
            padding: 24px;
            font-size: 1.1rem;
            line-height: 1.6;
            /* This is ESSENTIAL for preserving newlines from the JS string */
            white-space: pre-wrap; 
        }

        /* --- NEW STYLES FOR FOOTER BAR --- */
        .footer-bar {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            padding: 12px;
            background-color: #2c3e50;
            flex-shrink: 0; /* Prevents footer from shrinking */
        }

        .footer-button {
            padding: 10px 20px;
            margin: 5px;
            font-size: 0.9rem;
            font-weight: 600;
            color: white;
            background-color: #3498db;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none; /* For the 'a' tag */
            transition: background-color 0.2s ease;
        }

        .footer-button:hover {
            background-color: #2980b9;
        }

        /* Special style for the 'Contact' button */
        .footer-button.contact {
            background-color: #95a5a6;
        }
        .footer-button.contact:hover {
            background-color: #7f8c8d;
        }

    </style>
</head>
<body>

    <!-- This container holds the two main panes -->
    <div class="split-container">
        
        <div class="split-pane" id="translate-pane">
            <!-- The iframe source will be set by JS -->
            <iframe src="" title="Translate Page"></iframe>
        </div>
        
        <div class="split-pane" id="carols-pane">
            
            <!-- 1. The tab bar where buttons will be created -->
            <div class="tab-bar" id="song-tabs">
                <!-- Song tabs will be inserted here by JavaScript -->
            </div>
            
            <!-- 2. The content area where lyrics will be shown -->
            <div class="song-content" id="song-lyrics">
                <!-- Song lyrics will be inserted here by JavaScript -->
            </div>

        </div>

    </div>

    <!-- This new bar holds the language and contact buttons -->
    <div class="footer-bar" id="footer-bar">
        <!-- Buttons will be inserted here by JavaScript -->
    </div>


    <!-- JAVASCRIPT SECTION -->
    <script>
        // Wait for the page to be fully loaded before running the script
        document.addEventListener('DOMContentLoaded', function() {

            // --- 1. DATA AND STATE ---

            // Store all song data in one object, keyed by language
            const allLyrics = {
                'en': {
                    langName: 'English',
                    translateUrl: 'https://beta.sunflowerai.io/audience/DQ8Q36/en-US',
                    songs: [
                        {
                            title: "Joy to the World",
                            lyrics: `Joy to the world! The Lord is come
let earth receive her king
Let every heart prepare him room
and heaven and nature sing
and heaven and nature sing
and heaven, and heaven and nature sing

Joy to the world! The Savior reigns
let men their song employ
while fields and floods, rocks, hills, and plains
repeat the sounding joy
repeat the sounding joy
repeat, repeat the sounding joy

No more let sin and sorrow grow
nor thorns infest the ground
He comes to make his blessing flow
far as the curse is found
far as the curse is found
far as, far as the curse is found

He rules the world with truth and grace
and makes the nations prove
the glories of his righteousness
and wonders of his love
and wonders of his love
and wonders, wonders of his love`
                        },
                        {
                            title: "O Come All Ye Faithful",
                            lyrics: `O come all ye faithful, joyful and triumphant
O come ye, o come ye to bethlehem
Come and behold him, born the king of angels
O come let us adore him
O come let us adore him
O come let us adore him
Christ the Lord!

True God of true God, Light of Light eternal
Lo, he abhors not the virgin’s womb
Son of the Father, begotten, not created
O come let us adore him
O come let us adore him
O come let us adore him
Christ the Lord!

Sing choirs of angels, sing in exultation
Sing all ye citizens of heaven above
‘Glory to God, glory in the highest’
O come let us adore him
O come let us adore him
O come let us adore him
Christ the Lord!

Yea, Lord we greet thee, born this happy morning
Jesus, to thee be glory given
Word of the Father now in flesh appearing
O come let us adore him
O come let us adore him
O come let us adore him
Christ the Lord!`
                        },
                        {
                            title: "Hark! The Herald Angels Sing",
                            lyrics: `Hark! The herald angels sing
glory to the newborn king
peace on earth and mercy mild
God and sinners reconciled
Joyful all ye nations rise
join the triumph of the skies
with the angelic host proclaim
‘Christ is born in Bethlehem’
Hark! The heralds angels sing 
glory to the newborn king

Christ, by highest heaven adored
Christ, the everlasting Lord
late in time behold him come
offspring of the virgin’s womb!
Veild in flesh the Godhead see
hail the incarnate Deity!
Pleased as man with men to dwell
Jesus, our Immanuel
Hark! The heralds angels sing 
glory to the newborn king

Mild he lays his glory by
born that man no more may die
born to raise the sons of earth
born to give them second birth
Hail the heaven-born Prince of Peace!
Hail the Sun of Righteousness!
Light and life to all he brings
risen with healing in his wings
Hark! The heralds angels sing 
glory to the newborn king`
                        },
                        {
                            title: "Silent Night",
                            lyrics: `Silent night, holy night
all is calm, all is bright
round young virgin, mother and child
holy infant so tender and mild
sleep in heavenly peace
sleep in heavenly peace

Silent night, holy night
shepherds quake at the sight
glories stream from heaven afar
heavenly hosts sing, ‘Alleluia
Christ the Savior is born
Christ the savior is born’

Silent night, holy night
wonderous star, lend your light
with the angels let us sing
Alleluia to our King
Christ our Saviour is born
Christ our Saviour is born`
                        },
                        {
                            title: "O Holy Night",
                            lyrics: `O holy night, the stars are brightly shining
it is the night of our dear saviour’s birth
Long laid the world in sin and error pining
till he appeared and the soul felt its worth
A thrill of hope, the weary world rejoices
For yonder breaks, a new and glorious morn
Fall on your knees, O hear the angel voices
O night divine, O night when Christ was born
O night divine, O night, O night divine

Truely he taught us to love oneanothers
His law is love and his gospel is peace
Chains, shall he break for the slave is our brother
and in his name, all oppression shall cease
Sweet hymns of joy, in grateful chorus raise we
Let all within us praise his holy name
Christ is the Lord, O praise his name forever
His power and glory evermore proclaim
His power and glory evermore proclaim`
                        },
                        {
                            title: "The First Noel",
                            lyrics: `The first nowell the angel did say
was the certain poor shepherds in fields as they lay
in fields where they lay keeping their sheep
on a cold winder’s night that was so deep
Nowell, nowell, nowell, nowell
born is the King of Israel

When they looked up they saw a star
shining in the east, beyond them far
and to the earth it gave great light
and so it continued both day and night
Nowell, nowell, nowell, nowell
born is the King of Israel

This star drew nigh to the north-west
over Bethlehem it took its rest
and there it did both stop and stay
right over the place where Jesus lay
Nowell, nowell, nowell, nowell
born is the King of Israel

Now let us all with one accord
sing praises to our heavenly Lord
who brought forth heaven and earth from nought
and with his blood mankind has bought
Nowell, nowell, nowell, nowell
born is the King of Israel`
                        },
                        {
                            title: "O Little Town of Bethlehem",
                            lyrics: `O little town of Bethlehem
how still we see thee lie!
above thy deep and dreamless sleep
the silent stars go by
yet in thy dark streets shineth
the everlasting Light
the hopes and fears of all the years
are met in thee tonight

O morning stars, together
proclaim the holy birth
and praises sing to God the King
and peace to men on earth 
for Christ is born of Mary
and gathered all above
while mortals sleep and angels keep
their watch of wondering love

How silently, how silently
the wondrous gift is given!
So God imparts to human hearts
the blessings of his heaven
No ear may hear his coming
but in this world of sin
where meek souls will receive him still
the dear Christ enters in

O holy child of Bethlehem
descend to us we pray
cast out our sin and enter in
be born in us today
We hear the Christmas angels
the great glad tidings tells
O come to us, abide with us
our Lord Emmanuel`
                        }
                    ]
                },
                'zh-Hans': {
                    langName: 'Mandarin',
                    translateUrl: 'https://beta.sunflowerai.io/audience/DQ8Q36/zh-Hans',
                    songs: [
                        { title: "Joy to the World", lyrics: "Mandarin version of Joy to the world!" },
                        { title: "O Come All Ye Faithful", lyrics: "Mandarin version of O Come all Ye Faithful" },
                        { title: "Hark! The Herald Angels Sing", lyrics: "Mandarin version of Hark! The Herald Angels Sing" },
                        { title: "Silent Night", lyrics: "Mandarin version of Silent Night" },
                        { title: "O Holy Night", lyrics: "Mandarin version of O Holy Night" },
                        { title: "The First Noel", lyrics: "Mandarin version of The First Noel" },
                        { title: "O Little Town of Bethlehem", lyrics: "Mandarin version of O Little Town of Bethlehem" }
                    ]
                },
                'zh-HK': {
                    langName: 'Cantonese',
                    translateUrl: 'https://beta.sunflowerai.io/audience/DQ8Q36/zh-HK',
                    songs: [
                        { title: "Joy to the World", lyrics: "Cantonese version of Joy to the world!" },
                        { title: "O Come All Ye Faithful", lyrics: "Cantonese version of O Come all Ye Faithful" },
                        { title: "Hark! The Herald Angels Sing", lyrics: "Cantonese version of Hark! The Herald Angels Sing" },
                        { title: "Silent Night", lyrics: "Cantonese version of Silent Night" },
                        { title: "O Holy Night", lyrics: "Cantonese version of O Holy Night" },
                        { title: "The First Noel", lyrics: "Cantonese version of The First Noel" },
                        { title: "O Little Town of Bethlehem", lyrics: "Cantonese version of O Little Town of Bethlehem" }
                    ]
                },
                'ko': {
                    langName: 'Korean',
                    translateUrl: 'https://beta.sunflowerai.io/audience/DQ8Q36/ko',
                    songs: [
                        { title: "Joy to the World", lyrics: "Korean version of Joy to the world!" },
                        { title: "O Come All Ye Faithful", lyrics: "Korean version of O Come all Ye Faithful" },
                        { title: "Hark! The Herald Angels Sing", lyrics: "Korean version of Hark! The Herald Angels Sing" },
                        { title: "Silent Night", lyrics: "Korean version of Silent Night" },
                        { title: "O Holy Night", lyrics: "Korean version of O Holy Night" },
                        { title: "The First Noel", lyrics: "Korean version of The First Noel" },
                        { title: "O Little Town of Bethlehem", lyrics: "Korean version of O Little Town of Bethlehem" }
                    ]
                }
            };
            
            let currentLanguage = 'en'; // Default language

            // --- 2. GET HTML ELEMENT REFERENCES ---
            const tabBar = document.getElementById('song-tabs');
            const songLyrics = document.getElementById('song-lyrics');
            const footerBar = document.getElementById('footer-bar');
            const translateIframe = document.querySelector('#translate-pane iframe');

            // --- 3. CORE FUNCTIONS ---

            /**
             * Displays a specific song's lyrics based on the currentLanguage state
             */
            function showSong(index) {
                const songs = allLyrics[currentLanguage].songs;
                songLyrics.textContent = songs[index].lyrics;

                // Update the "active" class on the tab buttons
                const allTabs = document.querySelectorAll('.tab-link');
                allTabs.forEach(tab => {
                    tab.classList.remove('active');
                });

                // Add .active to the one that was clicked
                const activeTab = document.querySelector(`.tab-link[data-index="${index}"]`);
                if(activeTab) { // Check if it exists
                    activeTab.classList.add('active');
                }
            }

            /**
             * Clears and rebuilds the songbook tabs for the given language
             */
            function buildSongBook(langKey) {
                tabBar.innerHTML = ''; // Clear old tabs
                const songs = allLyrics[langKey].songs;

                songs.forEach((song, index) => {
                    const tabButton = document.createElement('button');
                    tabButton.textContent = song.title;
                    tabButton.classList.add('tab-link');
                    tabButton.dataset.index = index;

                    tabButton.addEventListener('click', () => {
                        showSong(index);
                    });
                    tabBar.appendChild(tabButton);
                });
                
                showSong(0); // Show the first song
            }

            /**
             * Clears and rebuilds the footer buttons, showing all languages
             * *except* the currently active one.
             */
            function buildFooterButtons() {
                footerBar.innerHTML = ''; // Clear old buttons

                // Loop through all available languages
                Object.keys(allLyrics).forEach(langKey => {
                    // Only create a button if it's NOT the current language
                    if (langKey !== currentLanguage) {
                        const langButton = document.createElement('button');
                        langButton.textContent = allLyrics[langKey].langName;
                        langButton.classList.add('footer-button');
                        langButton.dataset.lang = langKey;

                        langButton.addEventListener('click', () => {
                            changeLanguage(langKey);
                        });
                        footerBar.appendChild(langButton);
                    }
                });

                // Add the "Contact Us" button
                const contactButton = document.createElement('a');
                contactButton.textContent = 'Contact Us';
                contactButton.href = 'https://stphils.org.au/contact';
                contactButton.target = '_blank'; // Opens in a new tab
                contactButton.rel = 'noopener noreferrer';
                contactButton.classList.add('footer-button', 'contact');
                footerBar.appendChild(contactButton);
            }

            /**
             * Main function to switch the page's language
             */
            function changeLanguage(newLangKey) {
                if (newLangKey === currentLanguage) return; // Do nothing if it's the same

                currentLanguage = newLangKey;

                // 1. Update the translation iframe source
                translateIframe.src = allLyrics[currentLanguage].translateUrl;

                // 2. Rebuild the songbook with new language
                buildSongBook(currentLanguage);

                // 3. Rebuild the footer buttons
                buildFooterButtons();
            }

            // --- 4. INITIAL PAGE LOAD ---
            
            // On first load, manually call the functions to build the page
            // for the default language ('en')
            translateIframe.src = allLyrics[currentLanguage].translateUrl;
            buildSongBook(currentLanguage);
            buildFooterButtons();

        });
    </script>

</body>
      <!--<body>{children}</body>-->
    </html>
  );
}
