'use client'; 

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { Logo } from "ui";
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
        { title: "Hark! The Herald Angels Sing — 听啊，天使高声唱", lyrics: "<h2>Hark! The Herald Angels Sing — 听啊，天使高声唱</h2><p>Hark! The herald angels sing<br>听啊！天使高声唱<br>glory to the newborn King<br>荣耀归于新生王<br>peace on earth and mercy mild<br>地上平安，恩惠慈爱<br>God and sinners reconciled<br>神与世人得以和好<br>Joyful all ye nations rise<br>万国欢乐齐来迎<br>join the triumph of the skies<br>同享天上荣耀欢庆<br>with the angelic host proclaim<br>与天使天军同声宣告<br>‘Christ is born in Bethlehem’<br>基督已在伯利恒降生<br>Hark! The herald angels sing<br>听啊！天使高声唱<br>glory to the newborn King<br>荣耀归于新生王</p><p>Christ, by highest heaven adored<br>基督受至高天堂爱戴<br>Christ, the everlasting Lord<br>基督永生之主宰<br>late in time behold Him come<br>末时来到显于世上<br>offspring of the virgin’s womb!<br>童贞女腹中的圣婴<br>Veiled in flesh the Godhead see<br>披着肉身看见真神<br>hail the incarnate Deity!<br>欢呼祂道成肉身<br>Pleased as man with men to dwell<br>甘作人身住在世间<br>Jesus, our Immanuel<br>耶稣，是我们以马内利<br>Hark! The herald angels sing<br>听啊！天使高声唱<br>glory to the newborn King<br>荣耀归于新生王</p><p>Mild He lays His glory by<br>祂谦卑舍下天上荣耀<br>born that man no more may die<br>降生为使世人不再死亡<br>born to raise the sons of earth<br>降生为使世人得以复活<br>born to give them second birth<br>降生为使人得重生<br>Hail the heaven-born Prince of Peace!<br>欢呼天上和平君王<br>Hail the Sun of Righteousness!<br>欢呼公义的日光<br>Light and life to all He brings<br>祂为万民带来光与生命<br>risen with healing in His wings<br>祂翅膀下有医治能力<br>Hark! The herald angels sing<br>听啊！天使高声唱<br>glory to the newborn King<br>荣耀归于新生王</p>" },
        { title: "Silent Night — 平安夜", lyrics: "<h2>Silent Night — 平安夜</h2><p>Silent night, holy night<br>平安夜，圣善夜<br>all is calm, all is bright<br>万暗中，光华射<br>round young virgin, mother and child<br>照着圣母也照着圣婴<br>holy infant so tender and mild<br>多少慈祥也多少天真<br>sleep in heavenly peace<br>天上光华照大地<br>sleep in heavenly peace<br>普世欢腾庆圣诞</p><p>Silent night, holy night<br>平安夜，圣善夜<br>shepherds quake at the sight<br>牧羊人，在旷野<br>glories stream from heaven afar<br>忽然看见了天上光华<br>heavenly hosts sing, ‘Alleluia’<br>听见天军在高声歌唱<br>Christ the Savior is born<br>救主耶稣今降生<br>Christ the Savior is born<br>救主耶稣今降生</p><p>Silent night, holy night<br>平安夜，圣善夜<br>wonderous star, lend your light<br>神圣光，普照万方<br>with the angels let us sing<br>同那天使唱“哈利路亚”<br>Alleluia to our King<br>荣耀归于天上君王<br>Christ our Savior is born<br>救主基督已降生<br>Christ our Savior is born<br>救主基督已降生</p>" },
        { title: "O Holy Night — 圣善夜", lyrics: "<h2>O Holy Night — 圣善夜</h2><p>O holy night, the stars are brightly shining<br>圣善夜群星光华灿烂<br>it is the night of our dear Saviour’s birth<br>此夜里亲爱救主降生<br>Long lay the world in sin and error pining<br>世人久陷罪中深受苦痛<br>till He appeared and the soul felt its worth<br>主临到灵魂方知其价值<br>A thrill of hope, the weary world rejoices<br>希望降临，使疲倦的世界欢欣<br>For yonder breaks a new and glorious morn<br>荣耀晨光将自天边破晓<br>Fall on your knees, O hear the angel voices<br>跪拜虔诚吧，聆听天使之声<br>O night divine, O night when Christ was born<br>神圣之夜，救主基督降生的夜<br>O night divine, O night, O night divine<br>神圣之夜，神圣，神圣之夜</p><p>Truly He taught us to love one another<br>祂真实教导我们彼此相爱<br>His law is love and His gospel is peace<br>祂的律法是爱，祂的福音带来和平<br>Chains shall He break, for the slave is our brother<br>祂要折断锁链，因奴仆也是弟兄<br>and in His name all oppression shall cease<br>奉祂之名，一切压迫都要止息<br>Sweet hymns of joy in grateful chorus raise we<br>让我们唱感恩之歌，齐声欢呼<br>Let all within us praise His holy name<br>全心全人都来赞美祂的圣名<br>Christ is the Lord, O praise His name forever<br>基督为主，祂的名当永远称颂<br>His power and glory evermore proclaim<br>祂权能荣耀永永远远传扬<br>His power and glory evermore proclaim<br>祂权能荣耀永永远远传扬</p>" },
        { title: "The First Nowell — 首度圣诞", lyrics: "<h2>The First Nowell — 首度圣诞</h2><p>The first Nowell the angel did say<br>首度圣诞天使宣告<br>was to certain poor shepherds in fields as they lay<br>向在田间牧羊的穷苦牧者<br>in fields where they lay keeping their sheep<br>他们在田野看守羊群<br>on a cold winter’s night that was so deep<br>在那寒冷深邃的冬夜<br>Nowell, Nowell, Nowell, Nowell<br>诺埃，诺埃，诺埃，诺埃<br>born is the King of Israel<br>以色列王已降生<p><p>When they looked up they saw a star<br>牧者仰望，看见一星<br>shining in the east, beyond them far<br>在东方明亮光耀<br>and to the earth it gave great light<br>那光照耀全地万方<br>and so it continued both day and night<br>昼夜不停持续发光<br>Nowell, Nowell, Nowell, Nowell<br>诺埃，诺埃，诺埃，诺埃<br>born is the King of Israel<br>以色列王已降生</p><p>This star drew nigh to the north-west<br>那星移动向着西北<br>over Bethlehem it took its rest<br>停在伯利恒的上空<br>and there it did both stop and stay<br>就在耶稣所在之处<br>right over the place where Jesus lay<br>在祂安睡的地方上方<br>Nowell, Nowell, Nowell, Nowell<br>诺埃，诺埃，诺埃，诺埃<br>born is the King of Israel<br>以色列王已降生</p><p>Now let us all with one accord<br>让我们众人同心赞美<br>sing praises to our heavenly Lord<br>歌颂我们天上的主<br>who brought forth heaven and earth from nought<br>祂从无中创造天地万有<br>and with His blood mankind has bought<br>并用祂宝血救赎世人<br>Nowell, Nowell, Nowell, Nowell<br>诺埃，诺埃，诺埃，诺埃<br>born is the King of Israel<br>以色列王已降生</p>" },
        { title: "O Little Town of Bethlehem — 小伯利恒城", lyrics: "<h2>O Little Town of Bethlehem — 小伯利恒城</h2><p>O little town of Bethlehem<br>小伯利恒城啊<br>how still we see thee lie!<br>我们看你何等安静<br>above thy deep and dreamless sleep<br>在你深沉无梦的睡眠之上<br>the silent stars go by<br>群星悄然流转<br>yet in thy dark streets shineth<br>然而在你幽暗的街道上<br>the everlasting Light<br>永恒真光正照耀<br>the hopes and fears of all the years<br>世世代代的盼望与惧怕<br>are met in thee tonight<br>今夜在你这里相遇</p><p>O morning stars, together<br>晨星啊，一同来<br>proclaim the holy birth<br>宣扬圣子的诞生<br>and praises sing to God the King<br>向神、我们的王高声颂赞<br>and peace to men on earth<br>并报地上人平安<br>for Christ is born of Mary<br>因基督已由马利亚诞生<br>and gathered all above<br>天军在上方聚集<br>while mortals sleep and angels keep<br>当世人沉睡时<br>their watch of wondering love<br>天使看守着奇妙的慈爱</p><p>How silently, how silently<br>多么静默，多么温柔<br>the wondrous gift is given!<br>奇妙的礼物这样赐下<br>So God imparts to human hearts<br>神把祂的恩典赐给人心<br>the blessings of His heaven<br>是天上来的福分<br>No ear may hear His coming<br>无人用耳听见祂来临<br>but in this world of sin<br>但在这罪恶的世界<br>where meek souls will receive Him still<br>凡谦卑的心愿意接待祂<br>the dear Christ enters in<br>亲爱的基督就进入他们心中</p><p>O holy Child of Bethlehem<br>伯利恒的圣婴啊<br>descend to us, we pray<br>求祢降临到我们这里<br>cast out our sin and enter in<br>除去我们的罪，进入我们的心<br>be born in us today<br>今日在我们心中诞生<br>We hear the Christmas angels<br>我们听见圣诞天使<br>the great glad tidings tell<br>传扬大喜的佳音<br>O come to us, abide with us<br>求祢到我们这里，与我们同住<br>our Lord Emmanuel<br>我们主以马内利</p>" }
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
        { title: "Joy to the World - 기쁘다 구주 오셨네", lyrics: "<h2>Joy to the World - 기쁘다 구주 오셨네</h2><p>Joy to the world! The Lord is come<br>기쁘다 구주 오셨네<br>let earth receive her king<br>만백성 맞으라<br>Let every heart prepare him room<br>온 마음 열어 환영해<br>and heaven and nature sing<br>온 천하 만물 기뻐하라<br>and heaven and nature sing<br>온 천하 만물 기뻐하라<br>and heaven, and heaven and nature sing<br>온 천하 만물 기뻐하라</p><p>Joy to the world! The Savior reigns<br>기쁘다 구주 오셨네<br>let men their song employ<br>즐거운 노래하세<br>while fields and floods, rocks, hills, and plains<br>들판과 산과 계곡도<br>repeat the sounding joy<br>기쁜 소식 전하라<br>repeat the sounding joy<br>기쁜 소식 전하라<br>repeat, repeat the sounding joy<br>기쁜 소식 전하라</p><p>No more let sin and sorrow grow<br>죄 많은 세상 오시어<br>nor thorns infest the ground<br>근심을 없애시고<br>He comes to make his blessing flow<br>너희도 마음 받아서<br>far as the curse is found<br>이 기쁜 소식 전하여라<br>far as the curse is found<br>이 기쁜 소식 전하여라<br>far as, far as the curse is found<br>이 기쁜 소식 전하여라</p><p>He rules the world with truth and grace<br>주 예수 세상 다스려<br>and makes the nations prove<br>참 평화 주시네<br>the glories of his righteousness<br>의롭고 선하신 뜻이<br>and wonders of his love<br>만백성 증거하리<br>and wonders of his love<br>만백성 증거하리<br>and wonders, wonders of his love<br>만백성 증거하리</p>" },
        { title: "O Come All Ye Faithful - 참 반가운 성도여", lyrics: "<h2>O Come All Ye Faithful - 참 반가운 성도여</h2><p>O come all ye faithful, joyful and triumphant<br>참 반가운 성도여 다 이리 와서<br>O come ye, o come ye to Bethlehem<br>베들레헴 성으로 가봅시다<br>Come and behold him, born the King of angels<br>저 천사들의 왕 나셨도다<br>O come let us adore him<br>오! 주님께 경배하세<br>O come let us adore him<br>오! 주님께 경배하세<br>O come let us adore him<br>오! 주님께 경배하세<br>Christ the Lord!<br>주님께</p><p>True God of true God, Light of Light eternal<br>참 하나님 참 하나님<br>Lo, he abhors not the virgin’s womb<br>동정녀 몸에서 나셨도다<br>Son of the Father, begotten, not created<br>영원한 아버지의 독생성자<br>O come let us adore him<br>오! 주님께 경배하세<br>O come let us adore him<br>오! 주님께 경배하세<br>O come let us adore him<br>오! 주님께 경배하세<br>Christ the Lord!<br>주님께</p><p>Sing choirs of angels, sing in exultation<br>천사들의 노래 소리 높이 불러<br>Sing all ye citizens of heaven above<br>하늘의 기쁨이 충만하도다<br>‘Glory to God, glory in the highest’<br>지극히 높은 곳에 영광을<br>O come let us adore him<br>오! 주님께 경배하세<br>O come let us adore him<br>오! 주님께 경배하세<br>O come let us adore him<br>오! 주님께 경배하세<br>Christ the Lord!<br>주님께</p><p>Yea, Lord we greet thee, born this happy morning<br>이 날의 주 탄생 기쁘도다<br>Jesus, to thee be glory given<br>주께 영광을 돌리세<br>Word of the Father now in flesh appearing<br>영원한 말씀이 육신 되셨네<br>O come let us adore him<br>오! 주님께 경배하세<br>O come let us adore him<br>오! 주님께 경배하세<br>O come let us adore him<br>오! 주님께 경배하세<br>Christ the Lord!<br>주님께</p>" },
        { title: "Hark! The herald angels sing - 천사 찬송하기를", lyrics: "<h2>Hark! The herald angels sing - 천사 찬송하기를</h2><p>1. Hark! The herald angels sing<br>천사 찬송하기를<br>Glory to the newborn King<br>거룩하신 구주께<br>Peace on earth and mercy mild<br>영광 돌려 보내세<br>God and sinners reconciled<br>구주 오늘 나셨네<br>Joyful, all ye nations rise<br>크고 작은 나라들<br>Join the triumph of the skies<br>기뻐 화답하여라<br>With the angelic host proclaim<br>영광 받을 왕의 왕<br>Christ is born in Bethlehem<br>베들레헴 나신 주<br>Hark! The herald angels sing<br>영광 받을 왕의 왕<br>Glory to the newborn King<br>베들레헴 나신 주</p><p>2. Christ by highest heav’n adored<br>오늘 나신 예수는<br>Christ the everlasting Lord<br>영광 받고 오신 주<br>Late in time behold Him come<br>천사 찬송 듣고서<br>Offspring of the Virgin’s womb<br>모두 엎드려 절하세<br>Veiled in flesh the Godhead see<br>영원토록 계시는<br>Hail the incarnate Deity<br>평화의 왕이시니<br>Pleased as man with men to dwell<br>하늘의 영광 버리고<br>Jesus, our Immanuel<br>이 땅 위에 오셨네<br>Hark! The herald angels sing<br>하늘의 영광 버리고<br>Glory to the newborn King<br>이 땅 위에 오셨네</p><p>3. Hail the heav’n-born Prince of Peace!<br>의로우신 예수는<br>Hail the Sun of Righteousness!<br>평화의 왕이시고<br>Light and life to all He brings<br>세상 빛이 되시며<br>Risen with healing in His wings<br>생명 되신 구주라<br>Mild He lays His glory by<br>죽은 자를 살리려<br>Born that man no more may die<br>이 땅 위에 오셔서<br>Born to raise the sons of earth<br>영생하는 복을 주니<br>Born to give them second birth<br>모두 찬송하여라<br>Hark! The herald angels sing<br>영생하는 복을 주니<br>Glory to the newborn King<br>모두 찬송하여라</p>" },
        { title: "Silent night, holy night - 고요한 밤 거룩한 밤", lyrics: "<h2>Silent night, holy night - 고요한 밤 거룩한 밤</h2><p>Silent night, holy night<br>고요한 밤 거룩한 밤<br>All is calm, all is bright<br>어둠에 묻힌 밤<br>Round young virgin, mother and child<br>주의 부모 앉아서<br>Holy infant so tender and mild<br>감사 기도 드릴 때<br>Sleep in heavenly peace<br>아기 잘도 잔다<br>Sleep in heavenly peace<br>아기 잘도 잔다</p><p>Silent night, holy night<br>고요한 밤 거룩한 밤<br>Shepherds quake at the sight<br>영광이 둘린 밤<br>Glories stream from heaven afar<br>천군 천사 나타나<br>Heavenly hosts sing, ‘Alleluia<br>기뻐 노래 불렀네<br>Christ the Savior is born<br>왕이 나셨도다<br>Christ the Savior is born<br>왕이 나셨도다</p><p>Silent night, holy night<br>고요한 밤 거룩한 밤<br>Wonderous star, lend your light<br>동방의 박사들<br>With the angels let us sing<br>별을 보고 찾아와<br>Alleluia to our King<br>꿇어 경배 드렸네<br>Christ our Saviour is born<br>구주 나셨도다<br>Christ our Saviour is born<br>구주 나셨도다</p>" },
        { title: "O Holy Night - 오 거룩한 밤", lyrics: "<h2>O Holy Night - 오 거룩한 밤</h2><p>O holy night, the stars are brightly shining<br>오 거룩한 밤 별들 반짝일 때<br>It is the night of our dear saviour’s birth<br>거룩한 밤 우리 구주 나셨네<br>Long laid the world in sin and error pining<br>죄악에 빠져 헤매던 백성들<br>Till he appeared and the soul felt its worth<br>주 오셔서 참 소망 주셨네<br>A thrill of hope, the weary world rejoices<br>고단한 영혼 기뻐하며 뛰네<br>For yonder breaks, a new and glorious morn<br>영광의 새 날 밝아오도다<br>Fall on your knees, O hear the angel voices<br>무릎 꿇고 저 천사 노래 듣라<br>O night divine, O night when Christ was born<br>오 거룩한 밤 구주가 나신 밤<br>O night divine, O night, O night divine<br>오 거룩한 밤 거룩 거룩한 밤</p><p>Truly he taught us to love one anothers<br>주님의 법은 사랑과 평화라<br>His law is love and his gospel is peace<br>우리 서로 사랑하라 하셨네<br>Chains, shall he break for the slave is our brother<br>종의 멍에를 주가 꺾으시고<br>And in his name, all oppression shall cease<br>압박받는 자 자유 얻었네<br>Sweet hymns of joy, in grateful chorus raise we<br>기쁨의 찬송 함께 부르면서<br>Let all within us praise his holy name<br>주님의 이름 찬양하여라<br>Christ is the Lord, O praise his name forever<br>영광의 주를 영원히 찬양하라<br>His power and glory evermore proclaim<br>영광의 주를 찬양하여라<br>His power and glory evermore proclaim<br>영광의 주를 찬양하여라</p>" },
        { title: "The First Nowell - 저 들 밖에 한밤중에", lyrics: "<h2>The First Nowell - 저 들 밖에 한밤중에</h2><p>The first Nowell the angel did say<br>저 들 밖에 한밤중에<br>Was to certain poor shepherds in fields as they lay<br>양 떼 먹이는 목자들<br>In fields where they lay keeping their sheep<br>큰 광채가 홀연히 비추니<br>On a cold winter’s night that was so deep<br>무서워 엎드렸네<br>Nowell, Nowell, Nowell, Nowell<br>노엘 노엘 노엘 노엘<br>Born is the King of Israel<br>이스라엘 왕이 나셨네</p><p>2.When they looked up they saw a star<br>그들은 밝은 그 빛 따라<br>Shining in the east, beyond them far<br>한 별을 찾아 내었네<br>And to the earth it gave great light<br>동방에서 솟아난 그 별이<br>And so it continued both day and night<br>온 세상 비추었네<br>Nowell, Nowell, Nowell, Nowell<br>노엘 노엘 노엘 노엘<br>Born is the King of Israel<br>이스라엘 왕이 나셨네</p><p>3.This star drew nigh to the north-west<br>그 별이 그 위를 떠나서<br>Over Bethlehem it took its rest<br>베들레헴 향했으니<br>And there it did both stop and stay<br>아기 예수 누우신 구유 위<br>Right over the place where Jesus lay<br>높이 와 머물렀네<br>Nowell, Nowell, Nowell, Nowell<br>노엘 노엘 노엘 노엘<br>Born is the King of Israel<br>이스라엘 왕이 나셨네</p><p>4. Now let us all with one accord<br>이 세상 모든 사람들아<br>Sing praises to our heavenly Lord<br>주께 찬양을 드리자<br>Who brought forth heaven and earth from nought<br>하늘과 땅을 만드신 주님<br>And with His blood mankind has bought<br>우리를 구원하셨네<br>Nowell, Nowell, Nowell, Nowell<br>노엘 노엘 노엘 노엘<br>Born is the King of Israel<br>이스라엘 왕이 나셨네</p>" },
        { title: "O Little Town of Bethlehem - 오 베들레헴 작은 골", lyrics: "<h2>O Little Town of Bethlehem - 오 베들레헴 작은 골</h2><p>1.O little town of Bethlehem<br>오 베들레헴 작은 골<br>How still we see thee lie!<br>너 잠들었느냐<br>Above thy deep and dreamless sleep<br>큰 빛 둘러 네 위에<br>The silent stars go by<br>고요히 비치네<br>Yet in thy dark streets shineth<br>저 놀라운 빛 이제 곧<br>The everlasting Light<br>네 위에 비치네<br>The hopes and fears of all the years<br>온 세상의 희망이<br>Are met in thee tonight<br>오늘 밤 너에게 있네</p><p>2. O morning stars, together<br>별들아 찬란하게<br>Proclaim the holy birth<br>구주 나심 알리고<br>And praises sing to God the King<br>영광 돌려 노래하며<br>And peace to men on earth<br>평화를 주도다<br>For Christ is born of Mary<br>마리아에게서<br>And gathered all above<br>그리스도 나시니<br>While mortals sleep and angels keep<br>잠자는 사람들 몰래<br>Their watch of wondering love<br>사랑 지키시네</p><p>3.How silently, how silently<br>주 예수 탄생하실 때<br>The wondrous gift is given!<br>소리 없이 오시니<br>So God imparts to human hearts<br>주님의 축복 그 마음<br>The blessings of his heaven<br>문 열 때 임하네<br>No ear may hear his coming<br>소리 없이 내려와<br>But in this world of sin<br>죄악 세상 비추니<br>Where meek souls will receive him still<br>겸손한 맘에 오셔서<br>The dear Christ enters in<br>그 사랑 베푸시네</p><p>4.O holy child of Bethlehem<br>오 베들레헴 예수님<br>Descend to us we pray<br>우리에게 오셔서<br>Cast out our sin and enter in<br>죄악의 세상 이기고<br>Be born in us today<br>왕이 되어 주소서<br>We hear the Christmas angels<br>평강의 천사들이<br>The great glad tidings tell<br>기쁜 소식 전하니<br>O come to us, abide with us<br>주 예수여 우리 맘에<br>Our Lord Emmanuel<br>임마누엘 되소서</p>" }
      ]
    }
  };

const CONTACT_TITLE = 'Contact St Phils';
const CONTACT_IFRAME_SRC = 'https://stphilseastwood.elvanto.com.au/form/2840a4a4-1e93-454e-890b-5e358d69b811';
const CONTACT_INTERNAL_HTML = `<h2>Contact Us</h2><p>Thank you for your interest! We have opened our contact form in a new tab for you.</p><p>If the form did not open automatically, please <a href="${CONTACT_IFRAME_SRC}" target="_blank" style="text-decoration: underline; color: blue;">click here</a>.</p><p>We look forward to hearing from you.</p>`;


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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [transTouchStartX, setTransTouchStartX] = useState<number | null>(null);
  const [transTouchEndX, setTransTouchEndX] = useState<number | null>(null);
  const [transTouchStartY, setTransTouchStartY] = useState<number | null>(null);
  const [transTouchEndY, setTransTouchEndY] = useState<number | null>(null);
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

  // --- NEW: Idle/Activity Detection Logic (Add this useEffect) ---
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
  
  // --- SWIPE HANDLERS ---
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset end position
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Swipe Left (Finger moves <--) = Go Next
    if (isLeftSwipe) {
      handleNext();
    }
    // Swipe Right (Finger moves -->) = Go Prev
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  // --- SMART TRANSLATION PANE HANDLERS ---
  const onTransTouchStart = (e: React.TouchEvent) => {
    // Reset ends
    setTransTouchEndX(null);
    setTransTouchEndY(null);
    // Capture starts
    setTransTouchStartX(e.targetTouches[0].clientX);
    setTransTouchStartY(e.targetTouches[0].clientY);
  };

  const onTransTouchMove = (e: React.TouchEvent) => {
    setTransTouchEndX(e.targetTouches[0].clientX);
    setTransTouchEndY(e.targetTouches[0].clientY);
  };

  const onTransTouchEnd = () => {
    // Ensure we have all coordinates
    if (transTouchStartX === null || transTouchEndX === null || 
        transTouchStartY === null || transTouchEndY === null) return;

    const distX = transTouchStartX - transTouchEndX;
    const distY = transTouchStartY - transTouchEndY;

    // PORTRAIT MODE (Vertical Stack)
    if (isPortrait) {
        const isSwipeUp = distY > minSwipeDistance;     // Finger moves Bottom -> Top
        const isSwipeDown = distY < -minSwipeDistance;  // Finger moves Top -> Bottom

        if (isSwipeUp && !isTranslateMinimized) {
            setIsTranslateMinimized(true); // Push up to close
            setIsFabMenuOpen(false);
        }
        if (isSwipeDown && isTranslateMinimized) {
            setIsTranslateMinimized(false); // Pull down to open
            setIsFabMenuOpen(false);
        }
    } 
    // LANDSCAPE MODE (Horizontal Side-by-Side)
    else {
        const isSwipeLeft = distX > minSwipeDistance;    // Finger moves Right -> Left
        const isSwipeRight = distX < -minSwipeDistance;  // Finger moves Left -> Right

        if (isSwipeLeft && !isTranslateMinimized) {
            setIsTranslateMinimized(true); // Push left to close
            setIsFabMenuOpen(false);
        }
        if (isSwipeRight && isTranslateMinimized) {
            setIsTranslateMinimized(false); // Pull right to open
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
                    <span className="translation-placeholder">For translation services</span>
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
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
        >
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
