// app/page.tsx
'use client'; // This is required to use state and interactivity

import { useState } from 'react';

// --- 1. DATA AND STATE ---
// All your song data is now here, inside the component file.
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

// This is your new React page component
export default function Home() {
  
  // --- 2. USE REACT STATE ---
  // We use React's 'useState' hook to manage the active language and song
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSongIndex, setActiveSongIndex] = useState(0);

  // Get the data for the currently selected language
  const currentLangData = allLyrics[currentLanguage];
  // Get the specific song data for the active tab
  const activeSong = currentLangData.songs[activeSongIndex];

  // --- 3. CORE FUNCTIONS (The React Way) ---
  // This function updates the state, and React automatically re-renders the page
  function changeLanguage(newLangKey) {
    if (newLangKey === currentLanguage) return; // Do nothing if it's the same

    setCurrentLanguage(newLangKey);
    setActiveSongIndex(0); // Reset to the first song on language change
  }

  // --- 4. RENDER WITH JSX ---
  // This is the main HTML structure of your page, written in JSX
  return (
    <main className="carol-page-container">
      
      <div className="split-container">
        
        <div className="split-pane" id="translate-pane">
          {/* The iframe 'src' is now dynamic and updates when state changes */}
          <iframe src={currentLangData.translateUrl} title="Translate Page"></iframe>
        </div>
        
        <div className="split-pane" id="carols-pane">
          
          <div className="tab-bar" id="song-tabs">
            {/* We loop over the songs data to create the tab buttons */}
            {currentLangData.songs.map((song, index) => (
              <button
                key={song.title}
                // 'onClick' is the React way to add an event listener
                onClick={() => setActiveSongIndex(index)}
                // We dynamically add the 'active' class
                className={`tab-link ${index === activeSongIndex ? 'active' : ''}`}
              >
                {song.title}
              </button>
            ))}
          </div>
          
          <div className="song-content" id="song-lyrics">
            {/* The lyrics are rendered directly from the state */}
            {activeSong.lyrics}
          </div>

        </div>
      </div>

      <div className="footer-bar" id="footer-bar">
        {/* We loop over all available languages to create the footer buttons */}
        {Object.keys(allLyrics).map((langKey) => {
          // Don't show a button for the currently active language
          if (langKey === currentLanguage) return null;
          
          return (
            <button
              key={langKey}
              className="footer-button"
              onClick={() => changeLanguage(langKey)}
            >
              {allLyrics[langKey].langName}
            </button>
          );
        })}
        
        {/* The static "Contact Us" link */}
        <a
          href="https://stphils.org.au/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-button contact"
        >
          Contact Us
        </a>
      </div>
    </main>
  );
}
