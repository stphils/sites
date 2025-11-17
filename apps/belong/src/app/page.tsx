// app/page.tsx
'use client'; 

import { useState, useRef, useEffect, useCallback } from 'react';

// --- 1. DATA STRUCTURES ---

// Define the shape of a single song object
interface Song {
  title: string;
  lyrics: string;
}

// Define the shape of a language's data
interface LanguageData {
  langName: string;
  translateUrl: string;
  songs: Song[];
}

// Map the language key to its data structure
interface AllLyrics {
  [key: string]: LanguageData;
}

const allLyrics: AllLyrics = {
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
Christ is the Lord, O praise hisname forever
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
    langName: '简体',
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
    langName: '繁體',
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
    langName: '한국어',
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

// Define constants for the Contact link content
const CONTACT_TITLE = 'Contact St Phils';
const CONTACT_IFRAME_SRC = 'https://stphilseastwood.elvanto.com.au/form/2840a4a4-1e93-454e-890b-5e358d69b811';


// This is your new React page component
export default function Home() {
  
  // --- 2. USE REACT STATE ---
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  
  // Dropdown menu state (Song Selection Menu)
  const [isSongMenuOpen, setIsSongMenuOpen] = useState(false); 

  // FAB menu state (Language/Contact Menu)
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);

  // State to track if the Contact form should be displayed instead of lyrics
  const [isContactVisible, setIsContactVisible] = useState(false);

  const songMenuRef = useRef<HTMLDivElement>(null);
  const fabMenuRef = useRef<HTMLDivElement>(null);

  const currentLangData = allLyrics[currentLanguage];
  const activeSong = currentLangData.songs[activeSongIndex];

  // --- 3. CORE FUNCTIONS (The React Way) ---

  // Function to switch language and revert to lyrics view
  const changeLanguage = useCallback((newLangKey: string) => {
    if (newLangKey === currentLanguage) return;

    setCurrentLanguage(newLangKey);
    setActiveSongIndex(0);
    setIsSongMenuOpen(false);
    setIsContactVisible(false); // Always switch back to song lyrics view
  }, [currentLanguage]);


  // Function to handle clicking a song link
  const handleSongClick = useCallback((index: number) => {
    setActiveSongIndex(index);
    setIsSongMenuOpen(false);
    setIsContactVisible(false); // Display lyrics content
  }, []);

  // Function to handle clicking the Contact link in the Song Menu
  const handleContactClick = useCallback(() => {
    setIsContactVisible(true); // Display contact iframe content
    setIsSongMenuOpen(false); 
  }, []);

  // Function to handle clicking the Contact icon in the FAB Menu
  const handleFabContactClick = useCallback(() => {
    // This simulates the same action as the song menu contact link
    handleContactClick();
    setIsFabMenuOpen(false);
  }, [handleContactClick]);


  // --- 4. CLOSE MENUS ON OUTSIDE CLICK ---

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Close Song Menu if clicking outside
      if (songMenuRef.current && !songMenuRef.current.contains(target)) {
        setIsSongMenuOpen(false);
      }
      // Close FAB Menu if clicking outside
      if (fabMenuRef.current && !fabMenuRef.current.contains(target)) {
        setIsFabMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // --- 5. RENDER HELPER COMPONENTS (for JSX structure) ---

  const renderSongMenuLinks = () => {
    return (
      <>
        {currentLangData.songs.map((song, index) => (
          <button
            key={song.title}
            onClick={() => handleSongClick(index)}
            className={`song-menu-link ${
              !isContactVisible && index === activeSongIndex ? 'active' : ''
            }`}
          >
            {song.title}
          </button>
        ))}
        {/* Contact Link in Song Menu Dropdown */}
        <button
          key="contact-st-phils"
          id="song-menu-contact-link" // Used by the FAB redirect
          onClick={handleContactClick}
          className={`song-menu-link contact-link ${
            isContactVisible ? 'active' : ''
          }`}
        >
          {CONTACT_TITLE}
        </button>
      </>
    );
  };


  const renderFabMenu = () => {
    const langKeys = Object.keys(allLyrics);
    return (
      <>
        {/* Language Buttons */}
        {langKeys.map((langKey) => {
          if (langKey === currentLanguage) return null;
          
          return (
            <button
              key={langKey}
              className="fab-item lang"
              onClick={() => changeLanguage(langKey)}
            >
              {allLyrics[langKey].langName}
            </button>
          );
        })}
        {/* Contact Icon Button */}
        <button
          key="fab-contact-icon"
          className="fab-item contact"
          aria-label="Contact Us"
          onClick={handleFabContactClick}
        >
          <span className="material-symbols-outlined">mail</span>
        </button>
      </>
    );
  };


  // --- 6. RENDER WITH JSX ---
  return (
    <main>
      
      <div className="split-container">
        
        {/* LEFT PANE: Translator Iframe */}
        <div className="split-pane" id="translate-pane">
          <iframe src={currentLangData.translateUrl} title="Translate Page"></iframe>
        </div>
        
        {/* RIGHT PANE: Song Lyrics / Contact Iframe */}
        <div className="split-pane" id="carols-pane">
          
          {/* Song Selection Menu (Sticky Nav) */}
          <div className="song-nav" id="song-nav" ref={songMenuRef}>
            <button 
              className={`song-menu-toggle ${isSongMenuOpen ? 'open' : ''}`}
              onClick={() => setIsSongMenuOpen(!isSongMenuOpen)}
            >
              {isContactVisible ? CONTACT_TITLE : activeSong.title}
            </button>
            
            <div className={`song-menu-dropdown ${isSongMenuOpen ? 'open' : ''}`}>
              {renderSongMenuLinks()}
            </div>
          </div>
          
          {/* Contact Iframe Content Area */}
          <div 
            id="contact-iframe-container"
            className={isContactVisible ? 'visible' : ''}
          >
            <iframe 
              src={CONTACT_IFRAME_SRC} 
              title="Contact Page"
            />
          </div>

          {/* Song Lyrics Content Area */}
          <div className={`song-content ${isContactVisible ? 'hidden' : ''}`} id="song-lyrics">
            {activeSong.lyrics}
          </div>

        </div>
      </div>

      {/* FIXED FAB MENU */}
      <div className="fab-container" id="fab-container">
        {/* Language buttons and Contact icon */}
        <div className="fab-menu" id="fab-menu">
          {isFabMenuOpen && renderFabMenu()}
        </div>
        
        {/* Main Toggle Button */}
        <button 
          className={`fab-toggle ${isFabMenuOpen ? 'open' : ''}`} 
          id="fab-toggle-button" 
          aria-label="Toggle menu"
          onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
        >
            +
        </button>
      </div>
    </main>
  );
}
