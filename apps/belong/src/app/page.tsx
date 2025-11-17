// app/page.tsx
'use client'; 

import { useState, useRef, useEffect, useCallback } from 'react';

// --- 1. DATA STRUCTURES ---
interface Song { title: string; lyrics: string; }
interface LanguageData { langName: string; translateUrl: string; songs: Song[]; }
interface AllLyrics { [key: string]: LanguageData; }

// NOTE: Using the internal data from your previous HTML code.
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
      // ... (Rest of the 'en' songs data truncated for brevity)
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
    songs: [{ title: "Joy to the World", lyrics: "Mandarin version of Joy to the world!" }, /*...*/ ]
  },
  'zh-HK': {
    langName: '繁體',
    translateUrl: 'https://beta.sunflowerai.io/audience/DQ8Q36/zh-HK',
    songs: [{ title: "Joy to the World", lyrics: "Cantonese version of Hark! The Herald Angels Sing" }, /*...*/ ]
  },
  'ko': {
    langName: '한국어',
    translateUrl: 'https://beta.sunflowerai.io/audience/DQ8Q36/ko',
    songs: [{ title: "Joy to the World", lyrics: "Korean version of Joy to the world!" }, /*...*/ ]
  }
};

const CONTACT_TITLE = 'Contact St Phils';
const CONTACT_IFRAME_SRC = 'https://stphilseastwood.elvanto.com.au/form/2840a4a4-1e93-454e-890b-5e358d69b811';


export default function Home() {
  
  // --- 2. USE REACT STATE ---
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isSongMenuOpen, setIsSongMenuOpen] = useState(false); 
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const songMenuRef = useRef<HTMLDivElement>(null);
  const fabContainerRef = useRef<HTMLDivElement>(null);

  const currentLangData = allLyrics[currentLanguage];
  const activeSong = currentLangData.songs[activeSongIndex];

  // --- 3. CORE FUNCTIONS ---

  const changeLanguage = useCallback((newLangKey: string) => {
    if (newLangKey === currentLanguage) return;

    setCurrentLanguage(newLangKey);
    setActiveSongIndex(0);
    setIsSongMenuOpen(false);
    setIsContactVisible(false);
  }, [currentLanguage]);

  const handleSongClick = useCallback((index: number) => {
    setActiveSongIndex(index);
    setIsSongMenuOpen(false);
    setIsContactVisible(false);
  }, []);

  const handleContactClick = useCallback(() => {
    setIsContactVisible(true);
    setIsSongMenuOpen(false);
  }, []);

  const handleFabContactClick = useCallback(() => {
    // FAB Contact icon redirects to the contact view
    handleContactClick();
    setIsFabMenuOpen(false);
  }, [handleContactClick]);


  // --- 4. CLOSE MENUS ON OUTSIDE CLICK (Standard React pattern) ---

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Close Song Menu if clicking outside
      if (songMenuRef.current && !songMenuRef.current.contains(target)) {
        setIsSongMenuOpen(false);
      }
      // Close FAB Menu if clicking outside
      if (fabContainerRef.current && !fabContainerRef.current.contains(target)) {
        setIsFabMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // --- 5. RENDER HELPERS ---

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
          id="song-menu-contact-link" 
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


  const renderFabMenuButtons = () => {
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
              onClick={() => {
                changeLanguage(langKey);
                setIsFabMenuOpen(false);
              }}
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
          
          {/* Contact Iframe Content Area - CONDITIONALLY RENDERED */}
          {isContactVisible ? (
            <div 
              id="contact-iframe-container"
              className={'visible'}
            >
              <iframe 
                src={CONTACT_IFRAME_SRC} 
                title="Contact Page"
              />
            </div>
          ) : (
            {/* Song Lyrics Content Area - CONDITIONALLY RENDERED */}
            <div className={'song-content'} id="song-lyrics">
              {activeSong.lyrics}
            </div>
          )}

        </div>
      </div>

      {/* FIXED FAB MENU */}
      <div 
          className={`fab-container ${isFabMenuOpen ? 'open' : ''}`} 
          id="fab-container"
          ref={fabContainerRef} 
      >
        {/* Language buttons and Contact icon (visible via CSS animation) */}
        <div className="fab-menu" id="fab-menu">
          {renderFabMenuButtons()}
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
