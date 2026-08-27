import type { YkiSpeakingPrompt, YkiWritingPrompt, YkiReadingPassage, YkiListeningPrompt } from '../types';

export const YKI_SPEAKING_PROMPTS: YkiSpeakingPrompt[] = [
  { id: 'sp1', title: 'Kertominen: Itsestä kertominen', instructions: 'Kerro itsestäsi, perheestäsi ja harrastuksistasi. Sinulla on 1,5 minuuttia aikaa puhua.', durationSeconds: 90 },
  { id: 'sp2', title: 'Mielipide: Asuminen', instructions: 'Kumpi on parempi: asua maalla vai kaupungissa? Perustele mielipiteesi.', durationSeconds: 120 },
  { id: 'sp3', title: 'Tilanne: Ajan varaaminen lääkärille', instructions: 'Olet sairas ja soitat terveyskeskukseen. Varaa aika lääkärille ja kerro oireistasi.', durationSeconds: 90 },
  { id: 'sp4', title: 'Kertominen: Viime loma', instructions: 'Kerro viimeisestä lomastasi. Missä olit, kenen kanssa ja mitä teit?', durationSeconds: 90 },
  { id: 'sp5', title: 'Tilanne: Reklamaatio ravintolassa', instructions: 'Olet ravintolassa ja ruokasi on kylmää. Valita tarjoilijalle kohteliaasti.', durationSeconds: 60 },
  { id: 'sp6', title: 'Mielipide: Julkinen liikenne vs. yksityisautoilu', instructions: 'Pitäisikö julkisen liikenteen olla ilmaista kaikille? Miksi tai miksi ei?', durationSeconds: 120 },
  { id: 'sp7', title: 'Tilanne: Avun pyytäminen työssä', instructions: 'Olet uudessa työpaikassa etkä osaa käyttää kopiokonetta. Pyydä kollegalta apua.', durationSeconds: 60 },
  { id: 'sp8', title: 'Kertominen: Suomen oppiminen', instructions: 'Miksi opiskelet suomea? Mikä on helppoa ja mikä vaikeaa?', durationSeconds: 90 },
  { id: 'sp9', title: 'Mielipide: Terveelliset elämäntavat', instructions: 'Mitä tarkoittaa terveellinen elämä? Miten ihmisten pitäisi elää?', durationSeconds: 120 },
  { id: 'sp10', title: 'Tilanne: Myöhästyminen', instructions: 'Olet myöhässä töistä/koulusta, koska bussisi meni rikki. Soita ja selitä tilanne.', durationSeconds: 60 }
];

export const YKI_WRITING_PROMPTS: YkiWritingPrompt[] = [
  { id: 'wr1', title: 'Virallinen viesti: Kylpyhuoneremontti', type: 'formal-email', instructions: 'Haluat tehdä kylpyhuoneremontin asunnossasi. Kirjoita sähköposti isännöitsijälle. Kerro mitä aiot tehdä, milloin remontti alkaa ja kuka sen tekee. Kirjoita noin 50-100 sanaa.' },
  { id: 'wr2', title: 'Mielipide: Etätyö', type: 'opinion', instructions: 'Monet ihmiset tekevät nykyään etätyötä. Onko etätyö hyvä vai huono asia? Kirjoita mielipidekirjoitus ja perustele kantasi. Kirjoita noin 100-150 sanaa.' },
  { id: 'wr3', title: 'Epävirallinen viesti: Kutsu juhliin', type: 'informal-message', instructions: 'Olet muuttanut uuteen asuntoon. Kirjoita viesti ystävällesi ja kutsu hänet tupareihin. Kerro milloin juhlat ovat ja mitä pitää ottaa mukaan. Kirjoita noin 50 sanaa.' },
  { id: 'wr4', title: 'Virallinen viesti: Työhakemus', type: 'formal-email', instructions: 'Näit ilmoituksen avoimesta työpaikasta kahvilassa. Kirjoita lyhyt työhakemus sähköpostilla kahvilan omistajalle. Kerro kuka olet, miksi haluat työn ja mitä työkokemusta sinulla on. Kirjoita noin 100 sanaa.' },
  { id: 'wr5', title: 'Epävirallinen viesti: Anteeksipyyntö', type: 'informal-message', instructions: 'Olit sopinut tapaamisen ystäväsi kanssa, mutta tulit sairaaksi. Kirjoita viesti, pyydä anteeksi ja ehdota uutta tapaamisaikaa. Kirjoita noin 40-50 sanaa.' },
  { id: 'wr6', title: 'Virallinen viesti: Reklamaatio', type: 'formal-email', instructions: 'Ostit uuden puhelimen, mutta se meni rikki viikon kuluttua. Kirjoita sähköposti kauppaan. Kerro mitä tapahtui ja mitä haluat. Kirjoita noin 100 sanaa.' },
  { id: 'wr7', title: 'Mielipide: Älypuhelimet kouluissa', type: 'opinion', instructions: 'Pitäisikö älypuhelimet kieltää peruskouluissa oppituntien aikana? Kirjoita mielipidekirjoitus lehteen. Perustele mielipiteesi hyvin. Kirjoita noin 150 sanaa.' },
  { id: 'wr8', title: 'Epävirallinen viesti: Kiitos', type: 'informal-message', instructions: 'Olit viikonloppuna ystäväsi mökillä. Kirjoita hänelle viesti ja kiitä mukavasta viikonlopusta. Kirjoita noin 50 sanaa.' },
  { id: 'wr9', title: 'Virallinen viesti: Kysely kurssista', type: 'formal-email', instructions: 'Haluat osallistua suomen kielen kurssille. Kirjoita sähköposti opistolle ja kysy aikataulusta, hinnasta ja tasosta. Kirjoita noin 50-80 sanaa.' },
  { id: 'wr10', title: 'Mielipide: Kasvisruoka', type: 'opinion', instructions: 'Pitäisikö kaikkien syödä enemmän kasvisruokaa? Kirjoita mielipidekirjoitus ja perustele. Kirjoita noin 100-150 sanaa.' }
];

export const YKI_READING_PASSAGES: YkiReadingPassage[] = [
  {
    id: 'rd1', title: 'Uutinen: Uusi pyörätie',
    text: 'Helsingin keskustaan rakennetaan uusi pyörätie. Rakennustyöt alkavat ensi maanantaina ja kestävät kaksi kuukautta. Työmaa aiheuttaa muutoksia liikenteeseen. Autoilijoiden on käytettävä kiertoreittejä, mutta jalankulkijat pääsevät kulkemaan normaalisti.',
    questions: [
      { id: 'rd1-q1', question: 'Kuinka pitkään rakennustyöt kestävät?', options: ['Kaksi viikkoa', 'Kaksi kuukautta', 'Koko kesän', 'Ensi viikon'], correctAnswer: 'Kaksi kuukautta' },
      { id: 'rd1-q2', question: 'Keitä työmaa häiritsee eniten?', options: ['Pyöräilijöitä', 'Autoilijoita', 'Jalankulkijoita', 'Kaikkia'], correctAnswer: 'Autoilijoita' }
    ]
  },
  {
    id: 'rd2', title: 'Ilmoitus: Kadonnut koira',
    text: 'Kadonnut pieni, musta koira lauantaina 15.5. Puistolan alueella. Koiralla on punainen panta, jossa lukee "Rekku". Koira on ystävällinen, mutta voi olla vähän arka vieraiden ihmisten kanssa. Jos näet Rekun, soita heti numeroon 040 123 4567. Löytöpalkkio luvassa!',
    questions: [
      { id: 'rd2-q1', question: 'Millainen panta koiralla on?', options: ['Musta', 'Punainen', 'Sininen', 'Ei pantaa'], correctAnswer: 'Punainen' },
      { id: 'rd2-q2', question: 'Miten koira käyttäytyy vieraiden kanssa?', options: ['Se on vihainen', 'Se on leikkisä', 'Se voi pelätä (olla arka)', 'Se haukkuu paljon'], correctAnswer: 'Se voi pelätä (olla arka)' }
    ]
  },
  {
    id: 'rd3', title: 'Mainos: Kuntosalin kesätarjous',
    text: 'Kuntosali Syke tarjoaa nyt loistavan kesäkampanjan! Kun ostat kolmen kuukauden kortin toukokuun aikana, saat ensimmäisen kuukauden puoleen hintaan. Kampanja koskee vain uusia asiakkaita.',
    questions: [
      { id: 'rd3-q1', question: 'Kenelle kampanja on tarkoitettu?', options: ['Kaikille', 'Vain uusille asiakkaille', 'Vanhoille asiakkaille', 'Opiskelijoille'], correctAnswer: 'Vain uusille asiakkaille' },
      { id: 'rd3-q2', question: 'Mitä alennusta tarjotaan?', options: ['Koko kesä -50%', 'Ensimmäinen kuukausi -50%', 'Vuosikortti halvempi', 'Ilmainen viikko'], correctAnswer: 'Ensimmäinen kuukausi -50%' }
    ]
  },
  {
    id: 'rd4', title: 'Mielipide: Roskaaminen puistoissa',
    text: 'Olen huomannut, että meidän kaupunkimme puistoissa on yhä enemmän roskia, erityisesti viikonloppujen jälkeen. Ihmiset jättävät eväspaperit ja tyhjät pullot nurmikoille. Mielestäni kaupungin pitäisi lisätä roskakoreja.',
    questions: [
      { id: 'rd4-q1', question: 'Mikä on ongelma?', options: ['Puistot ovat kiinni', 'Roskaaminen viikonloppuisin', 'Poliiseja on liikaa', 'Puut ovat sairaita'], correctAnswer: 'Roskaaminen viikonloppuisin' },
      { id: 'rd4-q2', question: 'Mitä kirjoittaja ehdottaa?', options: ['Lisää poliiseja', 'Lisää roskakoreja', 'Kieltoja ihmisille', 'Ilmaista siivousta'], correctAnswer: 'Lisää roskakoreja' }
    ]
  },
  {
    id: 'rd5', title: 'Uutinen: Sähkön hinta nousee',
    text: 'Sähkön hinta nousee ensi talvena jopa 20 prosenttia. Syynä on kuiva kesä ja tuulivoiman vähäinen tuotanto. Asiantuntijat suosittelevat säästämään sähköä esimerkiksi alentamalla huonelämpötilaa.',
    questions: [
      { id: 'rd5-q1', question: 'Miksi hinta nousee?', options: ['Sähköyhtiöt haluavat rahaa', 'Kuiva kesä ja vähän tuulta', 'Ihmiset käyttävät liikaa', 'Talvi on kylmä'], correctAnswer: 'Kuiva kesä ja vähän tuulta' },
      { id: 'rd5-q2', question: 'Mitä asiantuntijat suosittelevat?', options: ['Ostamaan uuden lämmittimen', 'Alentamaan huonelämpötilaa', 'Muuttamaan etelään', 'Käyttämään kynttilöitä'], correctAnswer: 'Alentamaan huonelämpötilaa' }
    ]
  },
  {
    id: 'rd6', title: 'Ohje: Kirjaston käyttö',
    text: 'Tervetuloa kirjastoon! Lainaus-aika on yleensä 4 viikkoa. Kurssikirjojen laina-aika on vain 2 viikkoa. Jos palautat kirjat myöhässä, sinun täytyy maksaa myöhästymismaksu, joka on 20 senttiä per päivä.',
    questions: [
      { id: 'rd6-q1', question: 'Kuinka pitkä on kurssikirjojen laina-aika?', options: ['4 viikkoa', '2 viikkoa', '1 viikko', 'Ei rajaa'], correctAnswer: '2 viikkoa' },
      { id: 'rd6-q2', question: 'Mitä tapahtuu, jos palautat myöhässä?', options: ['Et saa enää lainata', 'Poliisi soittaa', 'Täytyy maksaa 20 snt/päivä', 'Täytyy maksaa 2 euroa'], correctAnswer: 'Täytyy maksaa 20 snt/päivä' }
    ]
  },
  {
    id: 'rd7', title: 'Ilmoitus: Taloyhtiön talkoot',
    text: 'Kevättalkoot pidetään lauantaina 20.5. klo 10-14. Siivoamme pihaa ja istutamme kukkia. Talkoiden jälkeen tarjolla makkaraa ja mehua. Kaikki asukkaat ovat tervetulleita!',
    questions: [
      { id: 'rd7-q1', question: 'Mitä talkoissa tehdään?', options: ['Maalataan talo', 'Siivotaan pihaa', 'Korjataan katto', 'Pestään ikkunat'], correctAnswer: 'Siivotaan pihaa' },
      { id: 'rd7-q2', question: 'Mitä tarjoillaan talkoiden jälkeen?', options: ['Kahvia ja pullaa', 'Makkaraa ja mehua', 'Olutta ja sipsiä', 'Keittoa'], correctAnswer: 'Makkaraa ja mehua' }
    ]
  },
  {
    id: 'rd8', title: 'Mainos: Kielikurssi Espanjassa',
    text: 'Haluatko oppia espanjaa auringossa? Järjestämme kahden viikon intensiivikursseja Málagassa kesä- ja heinäkuussa. Hintaan sisältyy opetus, majoitus perheessä ja kaksi retkeä. Lennot eivät sisälly hintaan.',
    questions: [
      { id: 'rd8-q1', question: 'Mikä EI sisälly hintaan?', options: ['Opetus', 'Majoitus', 'Lennot', 'Retket'], correctAnswer: 'Lennot' },
      { id: 'rd8-q2', question: 'Missä oppilaat asuvat?', options: ['Hotellissa', 'Hostellissa', 'Perheessä', 'Teltassa'], correctAnswer: 'Perheessä' }
    ]
  },
  {
    id: 'rd9', title: 'Mielipide: Lasten ruutuaika',
    text: 'Olen huolissani nykylasten ruutuajasta. Monet alakoululaiset pelaavat pelejä puhelimella jopa 4 tuntia päivässä. Tämä vaikuttaa uneen ja keskittymiseen koulussa. Vanhempien tulisi asettaa selkeät rajat.',
    questions: [
      { id: 'rd9-q1', question: 'Mikä kirjoittajaa huolestuttaa?', options: ['Koulun ruoka', 'Lasten ruutuaika', 'Pelien hinta', 'Opettajien määrä'], correctAnswer: 'Lasten ruutuaika' },
      { id: 'rd9-q2', question: 'Mihin ruutuaika vaikuttaa negatiivisesti?', options: ['Uneen ja keskittymiseen', 'Painoon', 'Kavereihin', 'Harrastuksiin'], correctAnswer: 'Uneen ja keskittymiseen' }
    ]
  },
  {
    id: 'rd10', title: 'Uutinen: Uusi uimahalli avataan',
    text: 'Keskustan uusi uimahalli avataan vihdoin ensi viikon perjantaina. Hallissa on kuusi allasta, muun muassa 50 metrin kuntouintiallas ja lämmin lastenallas. Avajaisviikonloppuna sisäänpääsy on ilmainen kaikille.',
    questions: [
      { id: 'rd10-q1', question: 'Milloin uimahalli avataan?', options: ['Tänään', 'Huomenna', 'Ensi viikon perjantaina', 'Ensi kuussa'], correctAnswer: 'Ensi viikon perjantaina' },
      { id: 'rd10-q2', question: 'Mitä maksaa avajaisviikonloppuna?', options: ['5 euroa', 'Ei mitään (ilmainen)', 'Puoli hintaa', '10 euroa'], correctAnswer: 'Ei mitään (ilmainen)' }
    ]
  }
];

export const YKI_LISTENING_PROMPTS: YkiListeningPrompt[] = [
  {
    id: 'ls1', title: 'Puhelinvastaajaviesti: Hammaslääkäri',
    script: 'Hei! Täältä soittaa sairaanhoitaja Mäkinen terveyskeskuksesta. Sinulla on varattu hammaslääkäriaika huomenna kello 14.30. Valitettavasti lääkäri on sairastunut, joten meidän täytyy siirtää aikasi. Sopiiko sinulle ensi viikon tiistaina kello kymmenen?',
    questions: [
      { id: 'ls1-q1', question: 'Miksi aika on peruttu?', options: ['Asiakas on sairas', 'Lääkäri on sairas', 'Klinikka on kiinni', 'Aika oli väärä'], correctAnswer: 'Lääkäri on sairas' },
      { id: 'ls1-q2', question: 'Mille päivälle uutta aikaa ehdotetaan?', options: ['Huomiselle', 'Keskiviikolle', 'Ensi viikon tiistaille', 'Seuraavalle viikolle'], correctAnswer: 'Ensi viikon tiistaille' }
    ]
  },
  {
    id: 'ls2', title: 'Kuulutus: Juna-asema',
    script: 'Huomio matkustajat. InterCity-juna 45 Tampereelta Helsinkiin on myöhässä noin kaksikymmentä minuuttia. Juna saapuu raiteelle kolme. Pahoittelemme myöhästymistä.',
    questions: [
      { id: 'ls2-q1', question: 'Kuinka paljon juna on myöhässä?', options: ['10 minuuttia', '15 minuuttia', '20 minuuttia', 'Puoli tuntia'], correctAnswer: '20 minuuttia' },
      { id: 'ls2-q2', question: 'Mille raiteelle juna saapuu?', options: ['Raide 1', 'Raide 2', 'Raide 3', 'Raide 4'], correctAnswer: 'Raide 3' }
    ]
  },
  {
    id: 'ls3', title: 'Radiouutiset: Sää',
    script: 'Ja seuraavaksi säätiedotus. Huomenna sää on koko maassa pilvinen ja viilenee. Etelä-Suomessa sataa vettä koko päivän, lämpötila on noin viisi astetta. Pohjois-Suomeen on luvassa jopa lumisadetta.',
    questions: [
      { id: 'ls3-q1', question: 'Millainen sää on Etelä-Suomessa huomenna?', options: ['Aurinkoinen', 'Sataa vettä', 'Sataa lunta', 'Pilvinen ja pakkanen'], correctAnswer: 'Sataa vettä' },
      { id: 'ls3-q2', question: 'Mitä on luvassa Pohjois-Suomeen?', options: ['Helle', 'Lumisadetta', 'Kova tuuli', 'Ukkosta'], correctAnswer: 'Lumisadetta' }
    ]
  },
  {
    id: 'ls4', title: 'Arkipäivän tilanne: Kaupassa',
    script: 'Kassa: Hei! Saisiko olla muovikassi?\nAsiakas: Ei kiitos, minulla on oma kassi mukana.\nKassa: Selvä. Se tekee sitten 14 euroa ja 50 senttiä. Maksatko kortilla vai käteisellä?\nAsiakas: Kortilla.',
    questions: [
      { id: 'ls4-q1', question: 'Ottiko asiakas muovikassin?', options: ['Kyllä', 'Ei, koska hänellä on oma', 'Ei, koska hän osti paperipussin', 'Kyllä, kaksi'], correctAnswer: 'Ei, koska hänellä on oma' },
      { id: 'ls4-q2', question: 'Miten asiakas halusi maksaa?', options: ['Käteisellä', 'Laskulla', 'Kortilla', 'Hän ei maksanut'], correctAnswer: 'Kortilla' }
    ]
  },
  {
    id: 'ls5', title: 'Kuulutus: Tavaratalo',
    script: 'Hyvät asiakkaat. Tavaratalomme suljetaan tänään poikkeuksellisesti jo kello 18.00 henkilökunnan koulutuksen vuoksi. Pyydämme teitä siirtymään kassoille. Huomenna palvelemme taas normaalisti kello 9-21.',
    questions: [
      { id: 'ls5-q1', question: 'Mihin aikaan tavaratalo suljetaan tänään?', options: ['18.00', '19.00', '20.00', '21.00'], correctAnswer: '18.00' },
      { id: 'ls5-q2', question: 'Miksi tavaratalo suljetaan aikaisemmin?', options: ['Sähkökatko', 'Henkilökunnan koulutus', 'Tulipalo', 'Pyhäpäivä'], correctAnswer: 'Henkilökunnan koulutus' }
    ]
  },
  {
    id: 'ls6', title: 'Haastattelu: Uusi kirjailija',
    script: 'Toimittaja: Tervetuloa studioon, Anna! Uusi kirjasi kertoo luonnosta. Miksi valitsit tämän aiheen?\nAnna: Minusta tuntuu, että nykyään ihmiset viettävät liikaa aikaa sisällä. Halusin muistuttaa heitä metsän tärkeydestä.',
    questions: [
      { id: 'ls6-q1', question: 'Mistä Annan uusi kirja kertoo?', options: ['Kaupungeista', 'Luonnosta', 'Eläimistä', 'Rakkaudesta'], correctAnswer: 'Luonnosta' },
      { id: 'ls6-q2', question: 'Mitä Anna haluaa muistuttaa ihmisille?', options: ['Lukemisen tärkeydestä', 'Metsän tärkeydestä', 'Työnteosta', 'Liikunnasta'], correctAnswer: 'Metsän tärkeydestä' }
    ]
  },
  {
    id: 'ls7', title: 'Puhelinvastaaja: Kuntosalin peruminen',
    script: 'Hei, täällä on kuntosalin asiakaspalvelu. Soitamme kertoaksemme, että huomisen aamun joogatunti on valitettavasti peruttu ohjaajan sairastumisen vuoksi. Voit varata korvaavan tunnin nettisivuiltamme.',
    questions: [
      { id: 'ls7-q1', question: 'Mikä tunti on peruttu?', options: ['Zumba', 'Jooga', 'Pilates', 'Kuntosali'], correctAnswer: 'Jooga' },
      { id: 'ls7-q2', question: 'Mistä voi varata uuden tunnin?', options: ['Nettisivuilta', 'Puhelimella', 'Kassalta', 'Ei voi varata'], correctAnswer: 'Nettisivuilta' }
    ]
  },
  {
    id: 'ls8', title: 'Arkipäivän tilanne: Kahvilassa',
    script: 'Myyjä: Hei, mitä saisi olla?\nAsiakas: Ottaisin yhden ison kahvin ja tuon korvapuustin.\nMyyjä: Selvä. Otatko kahviin maitoa?\nAsiakas: Kyllä, kauramaitoa, kiitos. Paljonko tämä tekee?\nMyyjä: 6 euroa ja 20 senttiä.',
    questions: [
      { id: 'ls8-q1', question: 'Mitä asiakas tilaa?', options: ['Teetä ja kakkua', 'Ison kahvin ja korvapuustin', 'Pienen kahvin', 'Vettä'], correctAnswer: 'Ison kahvin ja korvapuustin' },
      { id: 'ls8-q2', question: 'Millaista maitoa asiakas haluaa?', options: ['Lehmänmaitoa', 'Kauramaitoa', 'Soijamaitoa', 'Ei maitoa'], correctAnswer: 'Kauramaitoa' }
    ]
  },
  {
    id: 'ls9', title: 'Radiouutiset: Urheilu',
    script: 'Urheilukatsaus. Suomen jääkiekkomaajoukkue voitti eilen illalla Ruotsin maalein 3-1 tiukassa ottelussa. Suomen sankariksi nousi maalivahti, joka torjui yli neljäkymmentä laukausta. Seuraava peli on ylihuomenna Kanadaa vastaan.',
    questions: [
      { id: 'ls9-q1', question: 'Miten jääkiekko-ottelu päättyi?', options: ['Ruotsi voitti', 'Suomi voitti 3-1', 'Tasapeli', 'Peli peruttiin'], correctAnswer: 'Suomi voitti 3-1' },
      { id: 'ls9-q2', question: 'Kuka oli Suomen sankari?', options: ['Valmentaja', 'Maalivahti', 'Hyökkääjä', 'Tuomari'], correctAnswer: 'Maalivahti' }
    ]
  },
  {
    id: 'ls10', title: 'Haastattelu: Koulutus',
    script: 'Toimittaja: Miten suomalainen koulu on muuttunut kymmenessä vuodessa?\nOpettaja: Suurin muutos on teknologia. Nykyään jokaisella oppilaalla on oma tietokone ja käytämme paljon sähköisiä kirjoja. Se tuo sekä hyötyjä että haittoja.',
    questions: [
      { id: 'ls10-q1', question: 'Mikä on suurin muutos koulussa?', options: ['Uudet opettajat', 'Teknologia', 'Ruoka', 'Rakennukset'], correctAnswer: 'Teknologia' },
      { id: 'ls10-q2', question: 'Mitä opettaja sanoo sähköisistä kirjoista?', options: ['Ne ovat vain hyviä', 'Ne ovat vain huonoja', 'Niissä on hyötyjä ja haittoja', 'Niitä ei käytetä'], correctAnswer: 'Niissä on hyötyjä ja haittoja' }
    ]
  }
];
