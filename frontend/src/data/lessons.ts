import type { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // ═══════════ BEGINNER ═══════════
  {
    id: 'greetings',
    title: 'Greetings & Introductions',
    level: 'beginner',
    category: 'Communication',
    icon: '👋',
    duration: 15,
    xpReward: 50,
    theory: `# Greetings in Finnish (Tervehdykset)

Finnish greetings are straightforward and warm. Unlike many languages, Finnish has no formal/informal distinction in most greetings.

## Common Greetings

| Finnish | English | When to use |
|---------|---------|-------------|
| Hei | Hi / Hello | Any time, very common |
| Moi | Hi | Casual, very Finnish |
| Hyvää huomenta | Good morning | Morning greeting |
| Hyvää päivää | Good day | Formal daytime |
| Hyvää iltaa | Good evening | Evening greeting |
| Näkemiin | Goodbye (formal) | Parting |
| Heippa | Bye | Casual farewell |
| Moi moi | Bye bye | Very casual |

## Introducing Yourself

To say your name: **Minun nimeni on...** (My name is...) or simply **Olen...** (I am...)

Example:
- *Hei! Minun nimeni on Maria. Olen suomalainen.* 
- (Hi! My name is Maria. I am Finnish.)

## Key Phrase: How are you?
- **Miten menee?** = How's it going? (casual)
- **Kuinka voit?** = How are you? (formal)
- **Hyvin, kiitos!** = Well, thank you!`,
    examples: [
      { finnish: 'Hei! Minun nimeni on Anna.', english: 'Hi! My name is Anna.', pronunciation: 'hey mee-noon nee-me-nee on An-na' },
      { finnish: 'Miten menee? — Hyvin, kiitos!', english: 'How are you? — Well, thank you!', pronunciation: 'mi-ten me-nee — hü-vin kee-tos' },
      { finnish: 'Hauska tutustua!', english: 'Nice to meet you!', pronunciation: 'hau-ska tu-tus-tu-a' },
      { finnish: 'Mistä olet kotoisin?', english: 'Where are you from?', pronunciation: 'mis-tä o-let ko-toi-sin' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'How do you say "Good morning" in Finnish?', answer: 'Hyvää huomenta', hint: 'Two words, starts with H' },
      { id: 'e2', type: 'multiple-choice', question: 'Which is the most casual Finnish greeting?', answer: 'Moi', options: ['Hyvää päivää', 'Moi', 'Näkemiin', 'Hyvää iltaa'] },
      { id: 'e3', type: 'translate', question: 'Translate: "Nice to meet you"', answer: 'Hauska tutustua' },
      { id: 'e4', type: 'fill-blank', question: 'Minun _____ on Mikko. (My name is Mikko)', answer: 'nimeni' },
    ],
    vocabulary: [
      { id: 'g1', word: 'Hei', translation: 'Hi/Hello', level: 'beginner', category: 'greetings', timesSeen: 0, mastered: false, difficulty: 'easy' },
      { id: 'g2', word: 'Moi', translation: 'Hi (casual)', level: 'beginner', category: 'greetings', timesSeen: 0, mastered: false, difficulty: 'easy' },
      { id: 'g3', word: 'Näkemiin', translation: 'Goodbye', level: 'beginner', category: 'greetings', timesSeen: 0, mastered: false, difficulty: 'easy' },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers & Counting',
    level: 'beginner',
    category: 'Basics',
    icon: '🔢',
    duration: 20,
    xpReward: 50,
    theory: `# Numbers in Finnish (Numerot)

Finnish numbers are logical and regular once you learn the base numbers.

## Numbers 1-10

| Number | Finnish | Pronunciation |
|--------|---------|---------------|
| 1 | yksi | ük-si |
| 2 | kaksi | kak-si |
| 3 | kolme | kol-me |
| 4 | neljä | nel-jä |
| 5 | viisi | vii-si |
| 6 | kuusi | kuu-si |
| 7 | seitsemän | sayt-se-män |
| 8 | kahdeksan | kah-dek-san |
| 9 | yhdeksän | üh-dek-sän |
| 10 | kymmenen | küm-me-nen |

## Numbers 11-20
- 11 = yksitoista (one-ten)
- 12 = kaksitoista (two-ten)
- 20 = kaksikymmentä (two-tens)

## Hundreds & Thousands
- 100 = sata
- 1000 = tuhat

## Ordinal Numbers
- 1st = ensimmäinen
- 2nd = toinen
- 3rd = kolmas`,
    examples: [
      { finnish: 'Minulla on kolme lasta.', english: 'I have three children.', pronunciation: 'mi-nul-la on kol-me las-ta' },
      { finnish: 'Kahvi maksaa kaksi euroa.', english: 'Coffee costs two euros.', pronunciation: 'kah-vi mak-saa kak-si eu-ro-a' },
      { finnish: 'Olen kolmekymmentä vuotta vanha.', english: 'I am thirty years old.', pronunciation: 'o-len kol-me-küm-men-tä vuo-ta van-ha' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'How do you say "five" in Finnish?', answer: 'viisi' },
      { id: 'e2', type: 'multiple-choice', question: 'What does "kahdeksan" mean?', answer: '8', options: ['6', '7', '8', '9'] },
      { id: 'e3', type: 'translate', question: 'Translate: "twelve"', answer: 'kaksitoista' },
    ],
    vocabulary: [],
  },
  {
    id: 'colors',
    title: 'Colors',
    level: 'beginner',
    category: 'Vocabulary',
    icon: '🎨',
    duration: 12,
    xpReward: 40,
    theory: `# Colors in Finnish (Värit)

Colors in Finnish are mostly straightforward adjectives.

## Basic Colors

| Finnish | English |
|---------|---------|
| punainen | red |
| sininen | blue |
| vihreä | green |
| keltainen | yellow |
| valkoinen | white |
| musta | black |
| harmaa | grey |
| oranssi | orange |
| violetti | purple |
| ruskea | brown |
| vaaleanpunainen | pink |
| beige | beige |

## Colors as Adjectives
In Finnish, adjectives agree with nouns in case and number.
- *Punainen auto* = A red car
- *Sininen taivas* = Blue sky (the sky is blue)
- *Mustat housut* = Black trousers

## Finland's Colors
Finland's flag is **sininen ja valkoinen** (blue and white) — representing the lakes and snow.`,
    examples: [
      { finnish: 'Taivas on sininen.', english: 'The sky is blue.', pronunciation: 'tai-vas on si-ni-nen' },
      { finnish: 'Minulla on punainen auto.', english: 'I have a red car.', pronunciation: 'mi-nul-la on pu-nai-nen au-to' },
      { finnish: 'Suomen lippu on sininen ja valkoinen.', english: 'The Finnish flag is blue and white.', pronunciation: 'suo-men lip-pu on si-ni-nen ja val-koi-nen' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'How do you say "green" in Finnish?', answer: 'vihreä' },
      { id: 'e2', type: 'multiple-choice', question: 'What is "punainen"?', answer: 'red', options: ['blue', 'red', 'green', 'yellow'] },
    ],
    vocabulary: [],
  },
  {
    id: 'food',
    title: 'Food & Drinks',
    level: 'beginner',
    category: 'Daily Life',
    icon: '🍽️',
    duration: 20,
    xpReward: 55,
    theory: `# Food and Drink in Finnish (Ruoka ja juoma)

Finland has a wonderful food culture — from rye bread to salmon soup to the beloved coffee culture!

## Common Foods

| Finnish | English |
|---------|---------|
| leipä | bread |
| ruisleipä | rye bread (very Finnish!) |
| juusto | cheese |
| kala | fish |
| liha | meat |
| peruna | potato |
| keitto | soup |
| lihapyörykät | meatballs |
| pulla | Finnish sweet bun |

## Drinks

| Finnish | English |
|---------|---------|
| kahvi | coffee |
| tee | tea |
| maito | milk |
| vesi | water |
| mehu | juice |
| olut | beer |

## Ordering Food
- *Saanko...?* = May I have...? (literally: "May I get...?")
- *Haluaisin...* = I would like...
- *Laskun, kiitos!* = The bill, please!

## Finnish Food Culture
Finland is the world's biggest coffee consumer per capita. Drinking coffee is a social ritual!`,
    examples: [
      { finnish: 'Saanko lasillisen vettä, kiitos?', english: 'May I have a glass of water, please?', pronunciation: 'saa-kon la-sil-li-sen vet-tä kee-tos' },
      { finnish: 'Haluaisin kahvia ja pullaa.', english: 'I would like coffee and a bun.', pronunciation: 'ha-lu-ai-sin kah-vi-a ja pul-laa' },
      { finnish: 'Missä on ruokalista?', english: 'Where is the menu?', pronunciation: 'mis-sä on ruo-ka-lis-ta' },
      { finnish: 'Laskun, kiitos!', english: 'The bill, please!', pronunciation: 'las-kun kee-tos' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'How do you ask for the bill?', answer: 'Laskun, kiitos!' },
      { id: 'e2', type: 'multiple-choice', question: 'What is "ruisleipä"?', answer: 'Rye bread', options: ['White bread', 'Rye bread', 'Cake', 'Biscuit'] },
      { id: 'e3', type: 'fill-blank', question: '_____ lasillisen vettä, kiitos? (May I have a glass of water?)', answer: 'Saanko' },
    ],
    vocabulary: [],
  },
  {
    id: 'family',
    title: 'Family',
    level: 'beginner',
    category: 'People',
    icon: '👨‍👩‍👧‍👦',
    duration: 15,
    xpReward: 45,
    theory: `# Family in Finnish (Perhe)

## Family Members

| Finnish | English |
|---------|---------|
| äiti | mother |
| isä | father |
| vanhemmat | parents |
| lapsi | child |
| lapset | children |
| tytär | daughter |
| poika | son |
| sisar / sisko | sister |
| veli | brother |
| isoäiti | grandmother |
| isoisä | grandfather |
| täti | aunt |
| setä | uncle |
| serkku | cousin |
| aviomies | husband |
| vaimo | wife |
| puoliso | spouse / partner |

## Talking About Family
- *Minulla on kaksi lasta.* = I have two children.
- *Vaimoni nimi on Liisa.* = My wife's name is Liisa.
- *Olen naimisissa.* = I am married.
- *Olen yksinäinen.* = I am single.`,
    examples: [
      { finnish: 'Minulla on kaksi lasta, tyttö ja poika.', english: 'I have two children, a girl and a boy.', pronunciation: 'mi-nul-la on kak-si las-ta, tüt-tö ja poi-ka' },
      { finnish: 'Minun äitini on lääkäri.', english: 'My mother is a doctor.', pronunciation: 'mi-noon äy-ti-ni on lää-kä-ri' },
      { finnish: 'Meilä on iso perhe.', english: 'We have a big family.', pronunciation: 'meil-lä on i-so per-he' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'How do you say "grandmother"?', answer: 'isoäiti' },
      { id: 'e2', type: 'multiple-choice', question: 'What does "veli" mean?', answer: 'brother', options: ['sister', 'brother', 'father', 'son'] },
    ],
    vocabulary: [],
  },
  {
    id: 'time',
    title: 'Time & Days',
    level: 'beginner',
    category: 'Basics',
    icon: '⏰',
    duration: 20,
    xpReward: 50,
    theory: `# Time in Finnish (Aika)

## Days of the Week (Viikonpäivät)

| Finnish | English |
|---------|---------|
| maanantai | Monday |
| tiistai | Tuesday |
| keskiviikko | Wednesday |
| torstai | Thursday |
| perjantai | Friday |
| lauantai | Saturday |
| sunnuntai | Sunday |

## Months (Kuukaudet)
- tammikuu (January) — "ice month"
- helmikuu (February) — "pearl month"
- maaliskuu (March) — "land month"
- huhtikuu (April) — "burning month"
- toukokuu (May) — "sowing month"
- kesäkuu (June) — "summer month"
- heinäkuu (July) — "hay month"
- elokuu (August) — "harvest month"
- syyskuu (September) — "autumn month"
- lokakuu (October) — "mud month"
- marraskuu (November) — "death month"
- joulukuu (December) — "Christmas month"

## Telling Time
- *Kello on...* = The time is... / It is...
- *Kello on kolme.* = It is three o'clock.
- *Puoli neljä* = Half past three (half to four)
- *Vartti yli neljä* = Quarter past four`,
    examples: [
      { finnish: 'Tänään on maanantai.', english: 'Today is Monday.', pronunciation: 'tä-nään on maa-nan-tai' },
      { finnish: 'Kello on puoli kolme.', english: 'It is half past two.', pronunciation: 'kel-lo on puo-li kol-me' },
      { finnish: 'Tapaaminen on torstaina kello neljä.', english: 'The meeting is on Thursday at four.', pronunciation: 'ta-paa-mi-nen on tors-tai-na kel-lo nel-jä' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'How do you say "Wednesday"?', answer: 'keskiviikko' },
      { id: 'e2', type: 'translate', question: 'What is "December" in Finnish?', answer: 'joulukuu' },
      { id: 'e3', type: 'multiple-choice', question: 'What does "puoli neljä" mean?', answer: 'Half past three', options: ['Half past four', 'Half past three', 'Four o\'clock', 'Quarter to four'] },
    ],
    vocabulary: [],
  },
  {
    id: 'directions',
    title: 'Directions & Places',
    level: 'beginner',
    category: 'Daily Life',
    icon: '🗺️',
    duration: 18,
    xpReward: 50,
    theory: `# Directions in Finnish (Suunnat)

## Basic Directions

| Finnish | English |
|---------|---------|
| vasemmalle | to the left |
| oikealle | to the right |
| suoraan | straight ahead |
| takaisin | back |
| ylös | up |
| alas | down |
| lähellä | near |
| kaukana | far |

## Asking for Directions
- *Missä on...?* = Where is...?
- *Kuinka kauas on...?* = How far is...?
- *Miten pääsen...?* = How do I get to...?

## Common Places

| Finnish | English |
|---------|---------|
| kauppa | shop / store |
| kauppakeskus | shopping center |
| pankki | bank |
| apteekki | pharmacy |
| ravintola | restaurant |
| kahvila | café |
| asema | station |
| lentokenttä | airport |
| sairaala | hospital |
| hotelli | hotel |`,
    examples: [
      { finnish: 'Anteeksi, missä on lähin apteekki?', english: 'Excuse me, where is the nearest pharmacy?', pronunciation: 'an-tek-si mis-sä on lä-hin ap-tek-ki' },
      { finnish: 'Käy suoraan ja käänny vasemmalle.', english: 'Go straight and turn left.', pronunciation: 'käy suo-raan ja käy-nny va-sem-mal-le' },
      { finnish: 'Se on kahden korttelin päässä.', english: 'It is two blocks away.', pronunciation: 'se on kah-den kort-te-lin pääs-sä' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'How do you say "Where is the bank?"', answer: 'Missä on pankki?' },
      { id: 'e2', type: 'multiple-choice', question: 'What does "vasemmalle" mean?', answer: 'to the left', options: ['to the right', 'to the left', 'straight ahead', 'backwards'] },
    ],
    vocabulary: [],
  },

  // ═══════════ INTERMEDIATE ═══════════
  {
    id: 'cases',
    title: 'Finnish Cases Introduction',
    level: 'intermediate',
    category: 'Grammar',
    icon: '📐',
    duration: 30,
    xpReward: 80,
    theory: `# Finnish Cases (Sijat)

Finnish has 15 grammatical cases! Don't panic — they follow logical rules and replace what English does with prepositions.

## The Most Important Cases

### 1. Nominatiivi (Nominative)
- Used for the subject of a sentence
- Basic dictionary form
- *Koira juoksee.* = The dog runs.

### 2. Genetiivi (Genitive) — ending: -n
- Possession, "of"
- *Koiran nimi on Rekku.* = The dog's name is Rekku.
- *Suomen kieli* = The Finnish language

### 3. Akkusatiivi (Accusative)
- Direct object (when action is completed)
- *Luen kirjan.* = I read the book (completely).

### 4. Partitiivi (Partitive) — various endings
- Partial actions, uncountable things, negative sentences
- *Luen kirjaa.* = I am reading a book (ongoing).
- *Juon kahvia.* = I drink coffee (some coffee).
- *Ei kahvia!* = No coffee!

### 5. Inessiivi (Inessive) — ending: -ssa/-ssä
- "in" something (location inside)
- *Olen Helsingissä.* = I am in Helsinki.
- *Kirja on laukussa.* = The book is in the bag.

### 6. Elatiivi (Elative) — ending: -sta/-stä
- "from" something (coming out of)
- *Tulen Suomesta.* = I come from Finland.

### 7. Illatiivi (Illative) — various endings
- "into" something (going into)
- *Menen kauppaan.* = I go to the shop.

## Vowel Harmony
Finnish cases use vowel harmony: back vowels (a, o, u) → -ssa, -sta, -an
Front vowels (ä, ö, y) → -ssä, -stä, -ään`,
    examples: [
      { finnish: 'Olen Suomessa. (inessive)', english: 'I am in Finland.', pronunciation: 'o-len suo-mes-sa' },
      { finnish: 'Tulen Suomesta. (elative)', english: 'I come from Finland.', pronunciation: 'tu-len suo-mes-ta' },
      { finnish: 'Menen Suomeen. (illative)', english: 'I go to Finland.', pronunciation: 'me-nen suo-meen' },
      { finnish: 'Juon kahvia. (partitive)', english: 'I drink (some) coffee.', pronunciation: 'juon kah-vi-a' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'Which case ending means "in" something?', answer: '-ssa/-ssä (inessive)' },
      { id: 'e2', type: 'multiple-choice', question: 'What case is used in "Tulen Suomesta" (I come from Finland)?', answer: 'Elative', options: ['Inessive', 'Elative', 'Illative', 'Partitive'] },
      { id: 'e3', type: 'fill-blank', question: 'Olen Helsingis___ (I am in Helsinki)', answer: 'ssä' },
    ],
    vocabulary: [],
  },
  {
    id: 'verbs',
    title: 'Verb Conjugation',
    level: 'intermediate',
    category: 'Grammar',
    icon: '⚡',
    duration: 35,
    xpReward: 90,
    theory: `# Finnish Verb Conjugation

Finnish verbs conjugate based on person and number. Unlike many languages, Finnish verbs are regular once you know the verb type.

## Personal Pronouns + Verb Endings

| Pronoun | Finnish | Ending |
|---------|---------|--------|
| I | minä/mä | -n |
| you (sg) | sinä/sä | -t |
| he/she | hän | -Vowel+a/ä |
| we | me | -mme |
| you (pl) | te | -tte |
| they | he | -vat/vät |

## Example: "puhua" (to speak)

| Pronoun | Finnish |
|---------|---------|
| I speak | minä puhun |
| you speak | sinä puhut |
| he/she speaks | hän puhuu |
| we speak | me puhumme |
| you (pl) speak | te puhutte |
| they speak | he puhuvat |

## Negative Form
Use **en/et/ei/emme/ette/eivät** + verb stem:
- *En puhu suomea.* = I don't speak Finnish.
- *Hän ei tule.* = He/she is not coming.

## Common Verbs
- olla = to be
- mennä = to go  
- tulla = to come
- tehdä = to do/make
- sanoa = to say
- tietää = to know
- haluta = to want
- voida = to be able to / can`,
    examples: [
      { finnish: 'Minä puhun suomea vähän.', english: 'I speak Finnish a little.', pronunciation: 'mi-nä pu-hun suo-me-a vä-hän' },
      { finnish: 'Hän ei puhu englantia.', english: 'He/she doesn\'t speak English.', pronunciation: 'hän ei pu-hu eng-lan-ti-a' },
      { finnish: 'Mitä te haluatte?', english: 'What do you (plural) want?', pronunciation: 'mi-tä te ha-lu-at-te' },
    ],
    exercises: [
      { id: 'e1', type: 'fill-blank', question: 'Minä puhu___ suomea. (I speak Finnish)', answer: 'n' },
      { id: 'e2', type: 'translate', question: 'Conjugate "puhua" for "they"', answer: 'puhuvat' },
      { id: 'e3', type: 'multiple-choice', question: 'How do you say "I don\'t want"?', answer: 'En halua', options: ['Ei halua', 'En halua', 'Et halua', 'Emme halua'] },
    ],
    vocabulary: [],
  },
  {
    id: 'past-tense',
    title: 'Past Tense',
    level: 'intermediate',
    category: 'Grammar',
    icon: '⏪',
    duration: 25,
    xpReward: 75,
    theory: `# Past Tense in Finnish (Imperfekti)

The Finnish simple past (imperfekti) is used for completed past actions.

## Formation
For most verbs, add **-i-** between the stem and personal ending:

| Verb | Present | Past |
|------|---------|------|
| puhua (to speak) | puhun | puhuin |
| mennä (to go) | menen | menin |
| tulla (to come) | tulen | tulin |
| tehdä (to do) | teen | tein |
| olla (to be) | olen | olin |

## Example: "olla" in Past

| Finnish | English |
|---------|---------|
| olin | I was |
| olit | you were |
| oli | he/she was |
| olimme | we were |
| olitte | you (pl) were |
| olivat | they were |

## Past Negative
Use **en/et/ei...** + **ollut** (for "to be") or **verb + nut/nyt**:
- *En mennyt.* = I didn't go.
- *Hän ei tullut.* = He/she didn't come.`,
    examples: [
      { finnish: 'Eilen olin Helsingissä.', english: 'Yesterday I was in Helsinki.', pronunciation: 'ei-len o-lin hel-sin-gis-sä' },
      { finnish: 'Söin pizzaa viime viikolla.', english: 'I ate pizza last week.', pronunciation: 'söin piz-za-a vii-me vii-kol-la' },
      { finnish: 'Emme menneet elokuviin.', english: 'We didn\'t go to the cinema.', pronunciation: 'em-me men-neet e-lo-ku-viin' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'How do you say "I was" in Finnish?', answer: 'olin' },
      { id: 'e2', type: 'fill-blank', question: 'Eilen _____ (I was) kotona. (Yesterday I was at home.)', answer: 'olin' },
    ],
    vocabulary: [],
  },
  {
    id: 'workplace',
    title: 'Workplace Finnish',
    level: 'intermediate',
    category: 'Professional',
    icon: '💼',
    duration: 25,
    xpReward: 80,
    theory: `# Workplace Finnish (Työelämän suomi)

## Common Workplace Vocabulary

| Finnish | English |
|---------|---------|
| työ | work, job |
| toimisto | office |
| kokous | meeting |
| neuvottelu | negotiation |
| esitys | presentation |
| asiakas | client, customer |
| kollega | colleague |
| esimies | supervisor, manager |
| projekti | project |
| määräaika | deadline |
| palkka | salary |
| loma | holiday, vacation |
| sairasloma | sick leave |

## Useful Workplace Phrases
- *Minulla on kokous.* = I have a meeting.
- *Voidaanko siirtää?* = Can we postpone?
- *Miten voin auttaa?* = How can I help you?
- *Otetaan asia esille.* = Let's bring up the matter.
- *Palataan asiaan.* = We'll return to the matter.

## Email Openings/Closings
- Opening: *Hyvä [name],* = Dear [name],
- Closing: *Ystävällisin terveisin,* = With kind regards,`,
    examples: [
      { finnish: 'Meillä on kokous huomenna kello kymmenen.', english: 'We have a meeting tomorrow at ten.', pronunciation: 'meil-lä on ko-kous huo-men-na kel-lo küm-me-nen' },
      { finnish: 'Voisitko lähettää raportin?', english: 'Could you send the report?', pronunciation: 'voi-sit-ko lä-het-tää ra-por-tin' },
      { finnish: 'Minulla on jo täynnä kalenteri.', english: 'My calendar is already full.', pronunciation: 'mi-nul-la on jo täy-nnä ka-len-te-ri' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'How do you say "deadline" in Finnish?', answer: 'määräaika' },
      { id: 'e2', type: 'multiple-choice', question: 'What is "esimies"?', answer: 'supervisor/manager', options: ['colleague', 'supervisor/manager', 'client', 'secretary'] },
    ],
    vocabulary: [],
  },

  // ═══════════ ADVANCED ═══════════
  {
    id: 'news-finnish',
    title: 'News & Media Finnish',
    level: 'advanced',
    category: 'Media',
    icon: '📰',
    duration: 35,
    xpReward: 120,
    theory: `# News Finnish (Uutissuomi)

Finnish news language uses a formal register distinct from everyday speech.

## Characteristics of News Finnish
1. **No contraction** — full forms used (minä, sinä, not mä, sä)
2. **Passive voice** — very common in news
3. **Complex sentence structures**
4. **Nominalization** — verbs turned into nouns

## Common News Vocabulary

| Finnish | English |
|---------|---------|
| uutiset | news |
| tapahtuma | event |
| hallitus | government |
| presidentti | president |
| eduskunta | parliament |
| talous | economy |
| ympäristö | environment |
| terveydenhuolto | healthcare |
| ulkomainen | foreign |
| kansainvälinen | international |

## News Phrases
- *Lähteiden mukaan...* = According to sources...
- *Asiasta kerrotaan, että...* = It is reported that...
- *Tilanne on...* = The situation is...
- *Asian selvittely jatkuu.* = The investigation continues.`,
    examples: [
      { finnish: 'Hallitus päätti uusista toimenpiteistä.', english: 'The government decided on new measures.', pronunciation: 'hal-li-tus pää-ti uu-sis-ta toi-men-pi-teis-tä' },
      { finnish: 'Taloustilanne on parantunut viime kuukausina.', english: 'The economic situation has improved in recent months.', pronunciation: 'ta-lous-ti-lan-ne on pa-ran-tu-nut vii-me kuu-kau-si-na' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'How do you say "parliament" in Finnish?', answer: 'eduskunta' },
      { id: 'e2', type: 'translate', question: 'What does "talous" mean?', answer: 'economy' },
    ],
    vocabulary: [],
  },
  {
    id: 'business-finnish',
    title: 'Business Finnish',
    level: 'advanced',
    category: 'Professional',
    icon: '🏢',
    duration: 40,
    xpReward: 130,
    theory: `# Business Finnish (Liike-elämän suomi)

## Formal Business Communication

Finnish business culture values directness, honesty, and brevity. Small talk is minimal.

## Key Business Terms

| Finnish | English |
|---------|---------|
| liiketoiminta | business operations |
| yhtiö / yritys | company |
| osakeyhtiö (Oy) | limited company (Ltd) |
| toimitusjohtaja | CEO |
| hallituksen puheenjohtaja | board chairman |
| sopimus | contract |
| tarjous | offer, bid |
| lasku | invoice |
| tilaus | order |
| toimitus | delivery |
| yhteistyö | cooperation |
| kumppanuus | partnership |

## Negotiation Phrases
- *Ehdotamme seuraavaa ratkaisua...* = We propose the following solution...
- *Haluaisimme neuvotella ehdoista.* = We would like to negotiate the terms.
- *Voimmeko löytää kompromissin?* = Can we find a compromise?
- *Allekirjoitetaan sopimus.* = Let's sign the contract.

## Finnish Business Culture
- Punctuality is essential
- Direct communication is respected
- Silence is not awkward — it means thinking
- Sauna meetings are still common for bonding!`,
    examples: [
      { finnish: 'Haluaisimme tehdä yhteistyötä yrityksenne kanssa.', english: 'We would like to cooperate with your company.', pronunciation: 'ha-lu-ai-sim-me teh-dä yh-teis-työ-tä yri-tyk-sen-ne kan-ssa' },
      { finnish: 'Voisimme tavata ensi viikolla?', english: 'Could we meet next week?', pronunciation: 'voi-sim-me ta-va-ta en-si vii-kol-la' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'What is "sopimus"?', answer: 'contract' },
      { id: 'e2', type: 'multiple-choice', question: 'What does "Oy" stand for after a Finnish company name?', answer: 'Osakeyhtiö (Limited Company)', options: ['Organization', 'Osakeyhtiö (Limited Company)', 'Owner', 'Official'] },
    ],
    vocabulary: [],
  },
  {
    id: 'everyday-fluency',
    title: 'Everyday Fluency',
    level: 'advanced',
    category: 'Fluency',
    icon: '🗣️',
    duration: 45,
    xpReward: 150,
    theory: `# Everyday Finnish Fluency (Arkipäivän suomi)

## Colloquial Finnish (Puhekieli)
Spoken Finnish differs significantly from written Finnish. Finns use shortened forms in everyday speech.

## Common Colloquial Forms

| Standard (kirjakieli) | Spoken (puhekieli) | English |
|----------------------|-------------------|---------|
| minä | mä | I |
| sinä | sä | you |
| hän | se | he/she |
| he | ne | they |
| minulla on | mulla on | I have |
| ei ole | ei oo | there isn't |
| tämä | tää | this |
| tulee | tulee → tulee | comes |

## Filler Words and Expressions
- *No niin* = Well then / OK / Right
- *Joo* = Yeah (yes)
- *Okei* = OK
- *Siis* = So, I mean
- *Kyllä kyllä* = Yes yes / Absolutely
- *Eipä kestä!* = Don't mention it! / No problem!
- *Mitä kuuluu?* = How are you? (lit: "what is heard?")

## Idiomatic Expressions
- *Olla kujalla* = to be at a dead end (lit: to be at an alley)
- *Mennä metsään* = to fail badly (lit: to go into the forest)
- *Puhua suoraan* = to speak directly/honestly
- *Ottaa rennosti* = to take it easy`,
    examples: [
      { finnish: 'No niin, mennäänkö syömään?', english: 'Right then, shall we go eat?', pronunciation: 'no niin men-nään-kö süö-mään' },
      { finnish: 'Mulla on ihan kiire tänään.', english: 'I\'m really busy today.', pronunciation: 'mul-la on i-han kii-re tä-nään' },
      { finnish: 'Eipä kestä, se oli ilo!', english: 'No problem, it was a pleasure!', pronunciation: 'ei-pä kes-tä, se o-li i-lo' },
    ],
    exercises: [
      { id: 'e1', type: 'translate', question: 'What does "No niin" mean?', answer: 'Well then / OK / Right' },
      { id: 'e2', type: 'multiple-choice', question: 'In spoken Finnish, "mä" replaces which standard pronoun?', answer: 'minä', options: ['sinä', 'hän', 'minä', 'me'] },
    ],
    vocabulary: [],
  },
];

export const getLessonById = (id: string) => LESSONS.find(l => l.id === id);

export const getLessonsByLevel = (level: string) =>
  LESSONS.filter(l => l.level === level);

export const SCENARIOS = [
  { id: 'coffee-shop', title: 'Coffee Shop', description: 'Order drinks and snacks at a Helsinki café', icon: '☕', difficulty: 'beginner', starter: 'Hei! Tervetuloa Kulma Kahvilaan! Mitä saa olla?' },
  { id: 'supermarket', title: 'Supermarket', description: 'Navigate a Finnish K-Market', icon: '🛒', difficulty: 'beginner', starter: 'Hei! Voinko auttaa teitä löytämään jotain?' },
  { id: 'pharmacy', title: 'Pharmacy', description: 'Ask about medications and health', icon: '💊', difficulty: 'intermediate', starter: 'Hyvää päivää! Miten voin auttaa?' },
  { id: 'airport', title: 'Airport', description: 'Navigate Helsinki-Vantaa airport', icon: '✈️', difficulty: 'intermediate', starter: 'Hyvää päivää! Onko teillä kysyttävää?' },
  { id: 'job-interview', title: 'Job Interview', description: 'Practice professional Finnish', icon: '👔', difficulty: 'advanced', starter: 'Hyvää päivää! Istukaa, olkaa hyvä. Voitteko esitellä itsenne?' },
  { id: 'friend', title: 'Finnish Friend', description: 'Casual chat with a Finnish friend', icon: '🤝', difficulty: 'beginner', starter: 'Hei hei! Miten menee? Pitkästä aikaa!' },
];

export const PRONUNCIATION_PHRASES = [
  { id: 'p1', finnish: 'Hyvää huomenta!', english: 'Good morning!', phonetic: 'hü-vää huo-men-ta', difficulty: 'beginner', category: 'greetings' },
  { id: 'p2', finnish: 'Kiitos paljon!', english: 'Thank you very much!', phonetic: 'kee-tos pal-jon', difficulty: 'beginner', category: 'greetings' },
  { id: 'p3', finnish: 'Puhutteko englantia?', english: 'Do you speak English?', phonetic: 'pu-hut-te-ko eng-lan-ti-a', difficulty: 'beginner', category: 'basics' },
  { id: 'p4', finnish: 'Missä on lähin metro?', english: 'Where is the nearest metro?', phonetic: 'mis-sä on lä-hin met-ro', difficulty: 'intermediate', category: 'directions' },
  { id: 'p5', finnish: 'Haluaisin tilata ruokaa.', english: 'I would like to order food.', phonetic: 'ha-lu-ai-sin ti-la-ta ruo-kaa', difficulty: 'intermediate', category: 'food' },
  { id: 'p6', finnish: 'Yhteistyö on tärkeää.', english: 'Cooperation is important.', phonetic: 'üh-teis-tüö on tär-ke-ää', difficulty: 'advanced', category: 'business' },
  { id: 'p7', finnish: 'Olen kotoisin Englannista.', english: 'I am from England.', phonetic: 'o-len ko-toi-sin eng-lan-nis-ta', difficulty: 'beginner', category: 'basics' },
  { id: 'p8', finnish: 'Voimmeko siirtää kokouksen?', english: 'Can we postpone the meeting?', phonetic: 'voim-me-ko siir-tää ko-kouk-sen', difficulty: 'advanced', category: 'workplace' },
];

export const GRAMMAR_TOPICS = [
  { id: 'g1', title: 'Vowel Harmony', description: 'Front vs back vowels and how they affect endings', icon: '🎵', difficulty: 'beginner' },
  { id: 'g2', title: 'Nominative Case', description: 'The basic form of nouns and adjectives', icon: '📌', difficulty: 'beginner' },
  { id: 'g3', title: 'Genitive Case', description: 'Possession and the -n ending', icon: '👈', difficulty: 'beginner' },
  { id: 'g4', title: 'Partitive Case', description: 'Partial actions, quantities, and negation', icon: '🔢', difficulty: 'intermediate' },
  { id: 'g5', title: 'Locative Cases', description: 'Inessive, Elative, Illative — expressing location', icon: '📍', difficulty: 'intermediate' },
  { id: 'g6', title: 'Verb Types 1-6', description: 'The six verb conjugation patterns', icon: '⚡', difficulty: 'intermediate' },
  { id: 'g7', title: 'Conditional Mood', description: 'Would/could/should — the -isi- form', icon: '🤔', difficulty: 'intermediate' },
  { id: 'g8', title: 'Passive Voice', description: 'How Finnish passive works and when to use it', icon: '🔄', difficulty: 'advanced' },
  { id: 'g9', title: 'Participles', description: 'Present and past participles as adjectives', icon: '🏷️', difficulty: 'advanced' },
  { id: 'g10', title: 'Infinitives', description: 'The five infinitive forms and their uses', icon: '∞', difficulty: 'advanced' },
];
