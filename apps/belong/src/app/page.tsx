'use client'; 

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { Logo } from "ui";
import lyricsData from './lyrics.json';

interface Song { title: string; show: boolean; lyrics: string; }
interface LanguageData { langName: string; translateUrl: string; serviceLabel: string; songs: Song[]; }
interface AllLyrics { [key: string]: LanguageData; }

const CONTACT_TITLE = 'Contact St Phils';
const CONTACT_IFRAME_SRC = 'https://stphilseastwood.elvanto.com.au/form/2840a4a4-1e93-454e-890b-5e358d69b811';
const CONTACT_INTERNAL_HTML = `<h2>Contact Us</h2><p>Thank you for your interest! We have opened our contact form in a new tab for you.</p><p>If the form did not open automatically, please <a href="${CONTACT_IFRAME_SRC}" target="_blank" style="text-decoration: underline; color: blue;">click here</a>.</p><p>We look forward to hearing from you.</p>`;

const allLyrics: AllLyrics = lyricsData as unknown as AllLyrics;


export default function Home() {
  const IDLE_TIMEOUT_MS = 2000; // 2 seconds
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- 2. STATE AND REFS ---
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isSongMenuOpen, setIsSongMenuOpen] = useState(false); 
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isTranslateMinimized, setIsTranslateMinimized] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
        
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
        
  const transTouchStartX = useRef<number | null>(null);
  const transTouchStartY = useRef<number | null>(null);
  const transTouchEndX = useRef<number | null>(null);
  const transTouchEndY = useRef<number | null>(null);
        
  const minSwipeDistance = 40; // Minimum pixel distance to count as a swipe
  
  const songMenuRef = useRef<HTMLDivElement>(null);
  const fabContainerRef = useRef<HTMLDivElement>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const songContentRef = useRef<HTMLDivElement>(null);

  const currentLangData = allLyrics[currentLanguage];
  const activeSong = currentLangData.songs[activeSongIndex];
  const isLastSong = activeSongIndex === currentLangData.songs.length - 1;
  //const [isPortrait, setIsPortrait] = useState(false);
  // Initialize with a safe check for window existence
  const [isPortrait, setIsPortrait] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight > window.innerWidth;
    }    
    return false; 
  });
        
  // Tracks if the app is currently in native fullscreen mode
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  // To target the main element for native fullscreen
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => { // Use useLayoutEffect for layout-critical updates
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      // Check immediately on mount/resize
      checkOrientation();
      window.addEventListener('resize', checkOrientation);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkOrientation);
      }
    };
  }, []);

  // Effect to listen for fullscreen change events
  // This correctly updates the icon state when the user presses ESC.
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return;
    function handleFullscreenChange() {
        // Check if the element currently in fullscreen is our main element
        setIsNativeFullscreen(document.fullscreenElement === mainRef.current);
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };  
  }, []);
  
  // --- Auto-minimize translation pane ONLY on startup in portrait mode ---
  useEffect(() => {
    // 1. Check direct window dimensions to determine orientation at the exact moment of mount.
    // We do not use the 'isPortrait' state variable here to avoid dependency array issues.
    const isPortraitOnMount = typeof window !== 'undefined' && window.innerHeight > window.innerWidth;

    // 2. If it is portrait, set a timer to minimize.
    if (isPortraitOnMount) {
      const timer = setTimeout(() => {
        setIsTranslateMinimized(true);
      }, 2000); // 2000ms = 2 seconds

      // Cleanup: clear timer if user leaves page instantly
      return () => clearTimeout(timer);
    }
  }, []);
  
  // --- Idle/Activity Detection Logic (Add this useEffect) ---
  useEffect(() => {
    // Function to hide the FABs
    const startTimer = () => {
      // Clear any existing timer first
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      // Set a new timer to set isIdle to true after 5 seconds
      idleTimerRef.current = setTimeout(() => {
        // Only hide if menus are closed to avoid immediate re-hide after interaction
        if (!isFabMenuOpen && !isSongMenuOpen) {
          setIsIdle(true);
        }
      }, IDLE_TIMEOUT_MS);
    };

    // Function to show the FABs and restart the timer
    const handleUserActivity = () => {
      // 1. Show FABs
      if (isIdle) {
          setIsIdle(false);
      }
      // 2. Restart the timer
      startTimer();
    };

    // Start the initial timer on mount
    startTimer();

    // Add event listeners for user activity on the whole document/window
    // 'mousemove' for mouse, 'touchstart' for touch screens
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('touchstart', handleUserActivity);
    document.addEventListener('scroll', handleUserActivity); // Also useful for activity

    // Clean up: remove listeners and clear the final timer when the component unmounts
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('touchstart', handleUserActivity);
      document.removeEventListener('scroll', handleUserActivity);
    };
  }, [isFabMenuOpen, isSongMenuOpen, isIdle]); // Re-run if menu states change, or if isIdle changes to re-check the hide condition.

  // --- 3. CORE LOGIC ---

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
    setIsContactModalOpen(true); // Open the modal
    setIsSongMenuOpen(false);    // Close the song menu
    setIsFabMenuOpen(false);     // Close the FAB menu
  }, []);

  const handleFabContactClick = useCallback(() => {
    handleContactClick();
    setIsFabMenuOpen(false);
  }, [handleContactClick]);


  // --- NAVIGATION LOGIC ---

  const handlePrevious = useCallback(() => {
    if (isContactVisible) {
      // If on Contact page, go back to the last song
      setIsContactVisible(false);
    } else if (activeSongIndex > 0) {
      // If on a song, go to previous song
      setActiveSongIndex((prev) => prev - 1);
    }
  }, [isContactVisible, activeSongIndex]);

  const handleNext = useCallback(() => {
      const totalSongs = currentLangData.songs.length;
      
      // If we are at the last song, open the Modal
      if (activeSongIndex === totalSongs - 1) {
        handleContactClick(); 
      } else {
        // Otherwise go to next song
        setActiveSongIndex((prev) => prev + 1);
      }
  }, [activeSongIndex, currentLangData.songs.length, handleContactClick]);

  // --- DERIVED STATE FOR TABS ---
  
  // Show Previous if: We are on Contact page OR we are past the first song
  const showPrevTab = isContactVisible || activeSongIndex > 0;
  
  // Show Next if: We are NOT on the Contact page
  const showNextTab = !isContactVisible;

  // Label for Next button: "Contact" if last song, otherwise "Next"
  const nextLabel = (activeSongIndex === currentLangData.songs.length - 1) 
    ? "Contact" 
    : "Next";
        
  const toggleTranslateMinimize = useCallback(() => {
    setIsTranslateMinimized(prev => !prev);
    setIsFabMenuOpen(false); // Close the main FAB menu when toggling
  }, []);

  const toggleNativeFullscreen = useCallback(() => {
    if (!mainRef.current) return;
    if (document.fullscreenElement) {
        // Currently fullscreen, request exit
      document.exitFullscreen().catch(err => {
          console.error(`Error attempting to exit fullscreen mode: ${err.message}`);
      });
    } else {
        // Currently windowed, request fullscreen on the main element
        mainRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
      });
    }
    // State update is handled by the useLayoutEffect listener
  }, []);

  // --- 4. CLOSE MENUS ON OUTSIDE CLICK ---

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      // Close Song Menu
      if (songMenuRef.current && !songMenuRef.current.contains(target)) {
        setIsSongMenuOpen(false);
      }
      // Close FAB Menu
      if (fabContainerRef.current && !fabContainerRef.current.contains(target)) {
        setIsFabMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // NEW: Scroll the song content back to the top when the active song changes
  useEffect(() => {
    // Ensure we are viewing a song and the element exists
    if (!isContactVisible && songContentRef.current) {
      songContentRef.current.scrollTop = 0;
    }
  }, [activeSongIndex, isContactVisible]); // Rerun whenever song changes or contact visibility changes


  // --- 5. RENDER HELPERS ---

 const renderSongMenuLinks = (isMenuOpen: boolean) => {
    return (
        <div className={`song-fab-menu ${isMenuOpen ? 'open' : ''}`}>
        {currentLangData.songs.map((song, index) => {
          // --- LOGIC UPDATE START ---
          // If show is false, do not render this button in the menu.
          // The index remains correct for the onClick handler because 
          // we are mapping over the original array.
          if (song.show === false) return null;
          // --- LOGIC UPDATE END ---

          return (
            <button
              key={index} // Use index as key to ensure uniqueness
              onClick={() => handleSongClick(index)}
              className={`song-fab-link ${
                !isContactVisible && index === activeSongIndex ? 'active' : ''
              }`}
            >
              {song.title}
            </button>
          );
        })}
        {/* Contact Link in Song FAB Menu Dropdown */}
        <button
            key="contact-st-phils"
            id="song-menu-contact-link" 
            onClick={handleContactClick}
            className={`song-fab-link contact-link ${
                isContactVisible ? 'active' : ''
            }`}
        >
        {CONTACT_TITLE}
        </button>
    </div>
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
            {/* CRITICAL CHANGE: Wrap the text in a span */}
            <span className="fab-lang-text">
                        {allLyrics[langKey].langName}
            </span>
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
        <span className="fab-lang-text material-symbols-outlined">mail</span>
      </button>
      </>
    );
  };
  
  const onTouchStart = (e: React.TouchEvent) => {
    // Reset ends
    touchEndX.current = null;
    touchEndY.current = null;
    // Capture starts
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Just update the Ref. No re-render happens here.
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || !touchStartY.current || !touchEndY.current) return;
    
    const distanceX = touchStartX.current - touchEndX.current;
    const distanceY = touchStartY.current - touchEndY.current;
    
    const isHorizontal = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontal) {
        const isLeftSwipe = distanceX > minSwipeDistance;
        const isRightSwipe = distanceX < -minSwipeDistance;

        if (isLeftSwipe) {
          handleNext();
        }
        if (isRightSwipe) {
          handlePrevious();
        }
    }
  };

  // --- OPTIMIZED SMART TRANSLATION PANE HANDLERS ---
  const onTransTouchStart = (e: React.TouchEvent) => {
    transTouchEndX.current = null;
    transTouchEndY.current = null;
    transTouchStartX.current = e.targetTouches[0].clientX;
    transTouchStartY.current = e.targetTouches[0].clientY;
  };

  const onTransTouchMove = (e: React.TouchEvent) => {
    transTouchEndX.current = e.targetTouches[0].clientX;
    transTouchEndY.current = e.targetTouches[0].clientY;
  };

  const onTransTouchEnd = () => {
    if (transTouchStartX.current === null || transTouchEndX.current === null || 
        transTouchStartY.current === null || transTouchEndY.current === null) return;

    const distX = transTouchStartX.current - transTouchEndX.current;
    const distY = transTouchStartY.current - transTouchEndY.current;

    if (isPortrait) {
        const isSwipeUp = distY > minSwipeDistance;     
        const isSwipeDown = distY < -minSwipeDistance;  

        if (isSwipeUp && !isTranslateMinimized) {
            setIsTranslateMinimized(true); 
            setIsFabMenuOpen(false);
        }
        if (isSwipeDown && isTranslateMinimized) {
            setIsTranslateMinimized(false); 
            setIsFabMenuOpen(false);
        }
    } 
    else {
        const isSwipeLeft = distX > minSwipeDistance;    
        const isSwipeRight = distX < -minSwipeDistance;  

        if (isSwipeLeft && !isTranslateMinimized) {
            setIsTranslateMinimized(true); 
            setIsFabMenuOpen(false);
        }
        if (isSwipeRight && isTranslateMinimized) {
            setIsTranslateMinimized(false); 
            setIsFabMenuOpen(false);
        }
    }
  };

  // --- 6. RENDER WITH JSX ---

  // Add dynamic class names based on state
  const translatePaneClass = isTranslateMinimized ? 'split-pane minimized' : 'split-pane';
  const carolsPaneClass = isTranslateMinimized ? 'split-pane maximized' : 'split-pane';
  // Add class to the split-container for portrait mode to handle minimization properly
  const splitContainerClass = isTranslateMinimized && isPortrait
    ? 'split-container minimized-portrait'
    : 'split-container';

  const appShellClass = 'app-shell';

  // Determine the correct icon based on the native fullscreen state
  // We want the 'maximize' icon ('fullscreen') when we are NOT fullscreen (i.e., windowed)
  const fullscreenIcon = isNativeFullscreen ? 'close_fullscreen' : 'fullscreen';
  console.log(JSON.stringify(allLyrics, null, 2));
  return (
     <main className={appShellClass} ref={mainRef}>
        <button
            className={`fullscreen-fab ${isIdle ? 'idle-hide' : ''}`}
            aria-label={isNativeFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={toggleNativeFullscreen}
        >
            <span className="material-symbols-outlined">
                {fullscreenIcon}
            </span>
        </button>
        <div className={splitContainerClass} ref={splitContainerRef}>
            {/* LEFT PANE: Translator Iframe */}
        {/* LEFT PANE: Translator Iframe */}
        <div 
            className={translatePaneClass} 
            id="translate-pane" 
            onClick={isTranslateMinimized ? toggleTranslateMinimize : undefined}
            // REMOVE TOUCH HANDLERS FROM HERE (They are blocked by iframe)
        >
            {isTranslateMinimized ? (
                <div className="minimized-placeholder-bar">
                    {/* ... (Existing minimized content remains exactly the same) ... */}
                    <span className="translation-placeholder">
                        {currentLangData.serviceLabel}
                    </span>
                    <button
                                className="translation-expand-fab" 
                                aria-label="Expand Translation Panel"
                                onClick={(e) => {                                 
                                        e.stopPropagation(); 
                                        toggleTranslateMinimize();
                                }}
                    >
                    <span className="material-symbols-outlined">expand_more</span>
                    </button>
                </div>
            ) : (
                <>
                <div className="minimize-fab-wrapper"> 
                    <button
                        className={`minimize-fab ${isTranslateMinimized || isIdle ? 'hidden' : ''} ${!isPortrait ? 'rotate-fab' : ''}`}
                        id="minimize-fab-button"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            toggleTranslateMinimize();
                        }}
                    >
                        <span className="material-symbols-outlined">expand_less</span>
                    </button>
                </div>
                
                <iframe src={currentLangData.translateUrl} title="Translate Page"></iframe>

                {/* --- INVISIBLE SWIPE OVERLAYS --- */}
                {/* These sit ON TOP of the iframe to capture gestures */}
                
                {/* 1. Vertical Swipe Zone (Right Edge in Landscape, Bottom in Portrait) */}
                <div 
                    key={isPortrait ? "portrait-strip" : "landscape-strip"}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: isPortrait ? '100%' : '40px', // Full width in portrait, strip in landscape
                        height: isPortrait ? '40px' : '100%', // Strip in portrait, full height in landscape
                        zIndex: 50, // Above iframe
                        // Debug color: backgroundColor: 'rgba(255,0,0,0.2)', 
                        backgroundColor: 'transparent',
                    }}
                    // Attach Touch Handlers Here
                    onTouchStart={onTransTouchStart}
                    onTouchMove={onTransTouchMove}
                    onTouchEnd={onTransTouchEnd}
                />

                 {/* 2. Extra Zone for the Green Button Area (Bottom Right) */}
                 <div 
                    style={{
                        position: 'absolute',
                        bottom: isPortrait ? 0 : undefined, // Stick to bottom in Portrait
                        top: isPortrait ? undefined : 0,    // Stick to top in Landscape (so it covers full height)
                        right: 0,                           // Always stick to right
                        width: isPortrait ? '100%' : '40px',  // Full width vs Narrow strip
                        height: isPortrait ? '40px' : '100%', // Narrow strip vs Full height
                        zIndex: 50, 
                        backgroundColor: 'transparent',
                    }}
                    onTouchStart={onTransTouchStart}
                    onTouchMove={onTransTouchMove}
                    onTouchEnd={onTransTouchEnd}
                />
            </>
            )}
        </div>
        {/* RIGHT PANE: Song Lyrics / Contact Iframe */}
        <div 
                className="split-pane" 
                id="carols-pane"
        >
          {/* --- SEGMENTED PROGRESS BAR --- */}
          {/* 1. "idle-hide" class ensures it fades out with the other controls.*/}
          {/* 2. We map through ALL songs (including hidden ones) to create segments.*/}
          <div className={`progress-container ${isIdle ? 'idle-hide' : ''}`}>
            {currentLangData.songs.map((song, index) => {
               const isActive = isContactVisible || index <= activeSongIndex;
               const isSpecial = song.show === false;

               return (
                 <div 
                   key={index} 
                   className={`progress-segment ${isActive ? 'active' : ''} ${isSpecial ? 'special' : ''}`}
                   onClick={(e) => {
                       e.stopPropagation(); 
                       handleSongClick(index);
                   }}
                 />
               );
            })}
          </div>
          {showPrevTab && (
            <button
              key={`prev-${activeSongIndex}`}
              className={`nav-tab prev ${isIdle ? 'idle-hide' : ''}`}
              onClick={handlePrevious}
              aria-label="Previous Song"
            >
              <span className="nav-tab-text">Prev</span>
            </button>
          )}

          {showNextTab && (
            <button
              key={`next-${activeSongIndex}`}
              className={`nav-tab next ${isIdle ? 'idle-hide' : ''}`}
              onClick={handleNext}
              aria-label={isLastSong ? "Contact Us" : "Next Song"}
            >
              {isLastSong ? (
                /* Icon for Contact (Upright) */
                <span className="material-symbols-outlined">mail</span>
              ) : (
                /* Text for Next (Rotated) */
                <span className="nav-tab-text">Next</span>
              )}
            </button>
          )}
          <div
               style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50vmin',  // Responsive size (50% of viewport smaller dimension)
                    height: '50vmin',          
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.075,         // Faded effect
                    pointerEvents: 'none', // Allows clicks to pass through to the app
                    zIndex: 10,            // Sits above content visually
               }}
          >          
              <Logo />
          </div>

          {/* Song Selection FAB (Top Right) */}
          <div className={`song-fab-container ${isIdle ? 'idle-hide' : ''}`} ref={songMenuRef}>
            <button 
              className={`song-fab-toggle ${isSongMenuOpen ? 'open' : ''}`}
              onClick={() => setIsSongMenuOpen(!isSongMenuOpen)} 
            >
              <i className="material-symbols-outlined">music_note</i>
            </button>
            {/* The dropdown menu content */}
            {renderSongMenuLinks(isSongMenuOpen)}
          </div>
          {/* MAIN CONTENT AREA (Now gets the full height of the pane) */}
          <div className={'song-content'} 
                id="song-lyrics"
                ref={songContentRef}
                dangerouslySetInnerHTML={{ __html: activeSong.lyrics }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
          >
          </div>
        </div>
      </div>
      
      <div 
        className={`fab-container ${isFabMenuOpen ? 'open' : ''} ${isIdle ? 'idle-hide' : ''}`}
        id="fab-container"
        ref={fabContainerRef} 
      >
        {/* Language buttons and Contact icon */}
        <div className="fab-menu" id="fab-menu">
          {renderFabMenuButtons()}
        </div>
        {/* Main Toggle Button */}
        <button 
          className={`fab-toggle ${isFabMenuOpen ? 'open' : ''} font-sans`}
          id="fab-toggle-button" 
          aria-label="Toggle menu"
          onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
        >
          <span className="material-symbols-outlined">language</span>
        </button>
      </div>
      {isIdle && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 900, /* Sits above iframes (z-20) but below FABs (z-1000) */
            cursor: 'pointer',
            backgroundColor: 'transparent' 
          }}
          onClick={() => setIsIdle(false)}
          onTouchStart={() => setIsIdle(false)}
        />
      )}
      {isContactModalOpen && (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)', // Dimmed background
                zIndex: 2000, // High z-index to sit on top of everything
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={() => setIsContactModalOpen(false)} // Close when clicking background
        >
            <div 
                style={{
                    backgroundColor: 'white',
                    width: '90%',
                    maxWidth: '600px',
                    height: '80%',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside the box
            >
                {/* Modal Header with Close Button */}
                <div style={{
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                    textAlign: 'right',
                    backgroundColor: '#f9f9f9'
                }}>
                    <button 
                        onClick={() => setIsContactModalOpen(false)}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            fontSize: '2rem',
                            lineHeight: '1rem',
                            cursor: 'pointer',
                            color: '#555'
                        }}
                        aria-label="Close Modal"
                    >
                        &times;
                    </button>
                </div>
                
                {/* Iframe Content */}
                <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
                     <iframe 
                        src={CONTACT_IFRAME_SRC} 
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Contact Form"
                     />
                </div>
            </div>
        </div>
      )}
    </main>
  );
};
