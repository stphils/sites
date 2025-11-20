'use client'; 

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';

// --- 1. DATA STRUCTURES ---
interface Song { title: string; lyrics: string; }
interface LanguageData { langName: string; translateUrl: string; songs: Song[]; }
interface AllLyrics { [key: string]: LanguageData; }

const allLyrics: AllLyrics = {
  'en': {
    langName: 'English',
    translateUrl: 'https://beta.sunflowerai.io/caption/DQ8Q36/en-US?bg=true&color=51.5%2C0%2C100&size=1&width=true&font=ar-one-sans&green=false&lines=0',
    songs: [
      {
        title: "Welcome ...",
        lyrics: `<h2>Welcome to St Phils</h2>Thank you for joining us to celebrate Christmas together. Christmas is a season of great joy. It is when God showed His great love for us. It is when we celebrate the birth of Jesus Christ, God's son, born into our world. So, this birth brought great joy to the world. Angels, shepherds, and wise men all shared in this momentous event. They knew this was no ordinary baby. However, this baby's birth had a purpose: Billy Graham once said, "The very purpose of Christ's coming into the world was that he might offer up his life as a sacrifice for the sins of the world. He came to die. That is the heart of Christmas."<p>Maybe you've got questions about God or you're wondering what's the point of Christianity? Why not ask your questions and find answers at <a href="https://christianity.net.au" target="_newtab">Christianity.net.au</a>?</p>`
      },
      {
        title: "Joy to the World",
        lyrics: `<h2>Joy to the World</h2>Joy to the world! The Lord is come
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
        lyrics: `<h2>O Come All Ye Faithful</h2>O come all ye faithful, joyful and triumphant
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
        lyrics: `<h2>Hark! The Herald Angels Sing</h2>Hark! The herald angels sing
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
        lyrics: `<h2>Silent Night</h2>Silent night, holy night
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
        lyrics: `<h2>O Holy Night</h2>O holy night, the stars are brightly shining
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
        title: "The First Nowell",
        lyrics: `<h2>The First Nowell</h2>The first nowell the angel did say
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
        lyrics: `<h2>O Little Town of Bethlehem</h2>O little town of Bethlehem
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
      translateUrl: 'https://beta.sunflowerai.io/caption/DQ8Q36/zh-Hans?lines=0&bg=true&color=51.5%2C0%2C100&size=1&width=true&font=ar-one-sans&green=false', 
      songs: [
        {
        title: "欢迎 ...",
        lyrics: `<h2>欢迎来到圣菲尔教堂</h2>感谢大家加入我们，一起庆祝圣诞节。圣诞节是一个充满喜悦的季节。这是上帝向我们展示祂伟大爱的时刻。这是我们庆祝耶稣基督诞生的时候——上帝的儿子，降生到我们的世界中。因此，这个诞生给世界带来了巨大的喜悦。天使、牧羊人和贤士们都参与了这一重要事件。他们知道这不是普通的婴儿。然而，这个婴儿的诞生有其目的：比利·格雷厄姆曾说：“基督降临世界的根本目的就是为世人的罪而献出自己的生命作为牺牲。他来到世上是为了受难。这就是圣诞节的核心。”`
        },
        { title: "Joy to the World - 普世欢腾", lyrics: "<h2>Joy to the World — 普世欢腾</h2><p>Joy to the world! The Lord is come<br>普世欢腾，救主下降<br>let earth receive her King<br>大地接她君王<br>Let every heart prepare Him room<br>愿众心为主预备地方<br>and heaven and nature sing<br>诸天万物歌唱<br>and heaven and nature sing<br>诸天万物歌唱<br>and heaven, and heaven and nature sing<br>诸天，诸天万物歌唱</p><p>Joy to the world! The Savior reigns<br>普世欢腾，主治万方<br>let men their songs employ<br>万民守主法则<br>while fields and floods, rocks, hills, and plains<br>田野江河，山石与平原<br>repeat the sounding joy<br>重复主恩浩荡<br>repeat the sounding joy<br>重复主恩浩荡<br>repeat, repeat the sounding joy<br>重复，重复主恩浩荡</p><p>No more let sins and sorrows grow<br>罪恶忧愁不再生长<br>nor thorns infest the ground<br>地上不再受伤<br>He comes to make His blessings flow<br>主来使万民得祂恩惠<br>far as the curse is found<br>直到远方万邦<br>far as the curse is found<br>直到远方万邦<br>far as, far as the curse is found<br>直到，直到远方万邦</p><p>He rules the world with truth and grace<br>主以真理恩慈统治<br>and makes the nations prove<br>使万国得证明<br>the glories of His righteousness<br>主之公义，无比的荣耀<br>and wonders of His love<br>主爱无穷无尽<br>and wonders of His love<br>主爱无穷无尽<br>and wonders, wonders of His love<br>主爱，主爱无穷无尽</p>" },
        { title: "O Come All Ye Faithful — 齐来崇拜", lyrics: "<h2>O Come All Ye Faithful — 齐来崇拜</h2><p>O come all ye faithful, joyful and triumphant<齐来，宗主信徒，欢欣快乐歌唱<br>O come ye, O come ye to Bethlehem<br>齐来，齐来，往伯利恒去<br>Come and behold Him, born the King of angels<br>来朝见基督，天使之王降生<br>O come let us adore Him<br>齐来崇拜祂<br>O come let us adore Him<br>齐来崇拜祂<br>O come let us adore Him<br>齐来崇拜祂<br>Christ the Lord!<br>救主基督</p><p>True God of true God, Light of Light eternal<br>真神的真神，荣耀光明无尽<br>Lo, He abhors not the virgin’s womb<br>甘愿降生于童贞女腹<br>Son of the Father, begotten, not created<br>父之独生子，非受造而生<br>O come let us adore Him<br>齐来崇拜祂<br>O come let us adore Him<br>齐来崇拜祂<br>O come let us adore Him<br>齐来崇拜祂<br>Christ the Lord!<br>救主基督</p><p>Sing choirs of angels, sing in exultation<br>天上众天军齐来欢呼歌唱<br>Sing all ye citizens of heaven above<br>天堂万民同声颂扬<br>‘Glory to God, glory in the highest’<br>荣耀归真神，至高上帝当受赞美<br>O come let us adore Him<br>齐来崇拜祂<br>O come let us adore Him<br>齐来崇拜祂<br>O come let us adore Him<br>齐来崇拜祂<br>Christ the Lord!<br>救主基督</p><p>Yea, Lord we greet Thee, born this happy morning<br>救主，我们敬拜，今晨快乐迎祢<br>Jesus, to Thee be glory given<br>耶稣荣耀全归于祢<br>Word of the Father, now in flesh appearing<br>父之道成肉身显现于世<br>O come let us adore Him<br>齐来崇拜祂<br>O come let us adore Him<br>齐来崇拜祂<br>O come let us adore Him<br>齐来崇拜祂<br>Christ the Lord!<br>救主基督</p>" },
        { title: "Hark! The Herald Angels Sing", lyrics: "Mandarin placeholder lyrics." },
        { title: "Silent Night", lyrics: "Mandarin placeholder lyrics." },
        { title: "O Holy Night", lyrics: "Mandarin placeholder lyrics." },
        { title: "The First Noel", lyrics: "Mandarin placeholder lyrics." },
        { title: "O Little Town of Bethlehem", lyrics: "Mandarin placeholder lyrics." }
      ] 
    },
    'zh-HK': { 
      langName: '繁體', 
      translateUrl: 'https://beta.sunflowerai.io/caption/DQ8Q36/zh-HK?bg=true&color=51.5%2C0%2C100&size=1&width=true&font=ar-one-sans&green=false&lines=0', 
      songs: [
        {
        title: "歡迎 ...",
        lyrics: `<h2>歡迎來到聖菲爾斯</h2>感謝你加入我們，一起慶祝聖誕節。聖誕節是一個充滿喜悅的季節。這是上帝向我們顯示祂偉大愛意的時刻。這是我們慶祝耶穌基督誕生的時候，祂是上帝的兒子，降生到我們的世界。因此，這個誕生給世界帶來了極大的喜悅。天使、牧羊人和智者都參與了這個重要的時刻。他們知道這不是一個普通的嬰兒。然而，這個嬰兒的誕生是有目的的：比利·格雷厄姆曾說：“基督來到世界的目的，就是要將自己的生命作為犧牲，為世界的罪贖罪。他來是為了死去。這就是聖誕節的核心。”`
        },
        { title: "Joy to the World", lyrics: "Cantonese version of Joy to the world! (Placeholder)" },
        { title: "O Come All Ye Faithful", lyrics: "Cantonese placeholder lyrics." },
        { title: "Hark! The Herald Angels Sing", lyrics: "Cantonese placeholder lyrics." },
        { title: "Silent Night", lyrics: "Cantonese placeholder lyrics." },
        { title: "O Holy Night", lyrics: "Cantonese placeholder lyrics." },
        { title: "The First Noel", lyrics: "Cantonese placeholder lyrics." },
        { title: "O Little Town of Bethlehem", lyrics: "Cantonese placeholder lyrics." }
      ] 
    },
    'ko': { 
      langName: '한국어', 
      translateUrl: 'https://beta.sunflowerai.io/caption/DQ8Q36/ko?bg=true&color=51.5%2C0%2C100&size=1&width=true&font=ar-one-sans&green=false&lines=0', 
      songs: [
        {
        title: "환영 ...",
        lyrics: `<h2>세인트 필스에 오신 것을 환영합니다</h2>함께 크리스마스를 축하하기 위해 참석해 주셔서 감사합니다. 크리스마스는 큰 기쁨의 계절입니다. 하나님께서 우리를 향한 큰 사랑을 보여주신 때이기도 합니다. 바로 하나님의 아들 예수 그리스도의 탄생을 축하하는 시기이기 때문입니다. 이 탄생으로 세상에 큰 기쁨이 찾아왔습니다. 천사들, 목자들, 동방 박사들 모두 이 중대한 사건을 함께 나누었습니다. 그들은 이 아기가 평범한 아기가 아님을 알았습니다. 그러나 이 아기의 탄생에는 목적이 있었습니다. 빌리 그래함은 한때 이렇게 말했습니다. “그리스도께서 세상에 오신 아주 큰 목적은 그가 세상의 죄를 위해 자신의 생명을 희생으로 드리려는 것이었습니다. 그분은 죽기 위해 오셨습니다. 그것이 바로 크리스마스의 핵심입니다.”`
        },
        { title: "Joy to the World", lyrics: "Korean version of Joy to the world! (Placeholder)" },
        { title: "O Come All Ye Faithful", lyrics: "Korean placeholder lyrics." },
        { title: "Hark! The Herald Angels Sing", lyrics: "Korean placeholder lyrics." },
        { title: "Silent Night", lyrics: "Korean placeholder lyrics." },
        { title: "O Holy Night", lyrics: "Korean placeholder lyrics." },
        { title: "The First Noel", lyrics: "Korean placeholder lyrics." },
        { title: "O Little Town of Bethlehem", lyrics: "Korean placeholder lyrics." }
      ]
    }
  };

const CONTACT_TITLE = 'Contact St Phils';
const CONTACT_IFRAME_SRC = 'https://stphilseastwood.elvanto.com.au/form/2840a4a4-1e93-454e-890b-5e358d69b811';


export default function Home() {
  
  // --- 2. STATE AND REFS ---
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isSongMenuOpen, setIsSongMenuOpen] = useState(false); 
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isTranslateMinimized, setIsTranslateMinimized] = useState(false);
  
  const songMenuRef = useRef<HTMLDivElement>(null);
  const fabContainerRef = useRef<HTMLDivElement>(null);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const songContentRef = useRef<HTMLDivElement>(null);

  const currentLangData = allLyrics[currentLanguage];
  const activeSong = currentLangData.songs[activeSongIndex];
  const [isPortrait, setIsPortrait] = useState(false);
        
  // Tracks if the app is currently in native fullscreen mode
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  // To target the main element for native fullscreen
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if the window object exists and if height > width
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    if (typeof window !== 'undefined') {
      checkOrientation(); // Check on mount
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
    setIsContactVisible(true);
    setIsSongMenuOpen(false); 
  }, []);

  const handleFabContactClick = useCallback(() => {
    handleContactClick();
    setIsFabMenuOpen(false);
  }, [handleContactClick]);

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
        {currentLangData.songs.map((song, index) => (
            <button
            key={song.title}
            onClick={() => handleSongClick(index)}
            className={`song-fab-link ${
                !isContactVisible && index === activeSongIndex ? 'active' : ''
            }`}
        >
        {song.title}
        </button>
        ))}
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
     
  return (
    <main className={appShellClass} ref={mainRef}>
        <button
            className="fullscreen-fab"
            aria-label={isNativeFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={toggleNativeFullscreen}
        >
            <span className="material-symbols-outlined">
                {fullscreenIcon}
            </span>
        </button>
        <div className={splitContainerClass} ref={splitContainerRef}>
            {/* LEFT PANE: Translator Iframe */}
        <div className={translatePaneClass} id="translate-pane" onClick={isTranslateMinimized ? toggleTranslateMinimize : undefined}>
            {isTranslateMinimized ? (
                <span className="translation-placeholder">For translation services</span>
            ) : (
                <>
                <iframe src={currentLangData.translateUrl} title="Translate Page"></iframe>
                {/* NEW GREEN MINIMIZE FAB BUTTON */}
                <button
                    className={`minimize-fab ${isTranslateMinimized ? 'hidden' : ''} ${!isPortrait ? 'rotate-fab' : ''}`}
                    id="minimize-fab-button"
                    aria-label="Minimize translation pane"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent the click from triggering the parent div's onClick
                        toggleTranslateMinimize();
                    }}
                >
                    {/* The 'expand_less' icon is similar to '^' */}
                    <span className="material-symbols-outlined">expand_less</span>
                </button>
            </>
            )}
        </div>
        {/* RIGHT PANE: Song Lyrics / Contact Iframe */}
        <div className="split-pane" id="carols-pane">
          {/* NEW: Song Selection FAB (Top Right) */}
          <div className="song-fab-container" ref={songMenuRef}>
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
            <div className={'song-content'} 
                  id="song-lyrics"
                  ref={songContentRef}
                  dangerouslySetInnerHTML={{ __html: activeSong.lyrics }}
            >
            </div>
          )}
        </div>
      </div>
      
      <div 
        className={`fab-container ${isFabMenuOpen ? 'open' : ''}`} 
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
          +
        </button>
      </div>
    </main>
  );
};
