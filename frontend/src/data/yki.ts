import type { YkiSpeakingPrompt, YkiWritingPrompt, YkiReadingPassage, YkiListeningPrompt } from '../types';

export const YKI_SPEAKING_PROMPTS: YkiSpeakingPrompt[] = [
  {
    id: 'sp1',
    title: 'Kertominen: Itsestä kertominen',
    instructions: 'Kerro itsestäsi, perheestäsi ja harrastuksistasi. Sinulla on 1,5 minuuttia aikaa puhua.',
    durationSeconds: 90
  },
  {
    id: 'sp2',
    title: 'Mielipide: Asuminen',
    instructions: 'Kumpi on parempi: asua maalla vai kaupungissa? Perustele mielipiteesi. Sinulla on 2 minuuttia aikaa puhua.',
    durationSeconds: 120
  },
  {
    id: 'sp3',
    title: 'Tilanne: Ajan varaaminen lääkärille',
    instructions: 'Olet sairas ja soitat terveyskeskukseen. Varaa aika lääkärille ja kerro oireistasi. Puhu äänimerkin jälkeen.',
    durationSeconds: 90
  },
  {
    id: 'sp4',
    title: 'Kertominen: Viime loma',
    instructions: 'Kerro viimeisestä lomastasi. Missä olit, kenen kanssa ja mitä teit? Sinulla on 1,5 minuuttia aikaa puhua.',
    durationSeconds: 90
  },
  {
    id: 'sp5',
    title: 'Tilanne: Reklamaatio ravintolassa',
    instructions: 'Olet ravintolassa ja ruokasi on kylmää. Valita tarjoilijalle kohteliaasti ja pyydä uusi annos. Puhu äänimerkin jälkeen.',
    durationSeconds: 60
  },
  {
    id: 'sp6',
    title: 'Mielipide: Julkinen liikenne vs. yksityisautoilu',
    instructions: 'Pitäisikö julkisen liikenteen olla ilmaista kaikille? Miksi tai miksi ei? Sinulla on 2 minuuttia aikaa puhua.',
    durationSeconds: 120
  },
  {
    id: 'sp7',
    title: 'Tilanne: Avun pyytäminen työssä',
    instructions: 'Olet uudessa työpaikassa etkä osaa käyttää kopiokonetta. Pyydä kollegalta apua. Puhu äänimerkin jälkeen.',
    durationSeconds: 60
  }
];

export const YKI_WRITING_PROMPTS: YkiWritingPrompt[] = [
  {
    id: 'wr1',
    title: 'Virallinen viesti: Kylpyhuoneremontti',
    type: 'formal-email',
    instructions: 'Haluat tehdä kylpyhuoneremontin asunnossasi. Kirjoita sähköposti isännöitsijälle. Kerro mitä aiot tehdä, milloin remontti alkaa ja kuka sen tekee. Kirjoita noin 50-100 sanaa.'
  },
  {
    id: 'wr2',
    title: 'Mielipide: Etätyö',
    type: 'opinion',
    instructions: 'Monet ihmiset tekevät nykyään etätyötä. Onko etätyö hyvä vai huono asia? Kirjoita mielipidekirjoitus ja perustele kantasi. Kirjoita noin 100-150 sanaa.'
  },
  {
    id: 'wr3',
    title: 'Epävirallinen viesti: Kutsu juhliin',
    type: 'informal-message',
    instructions: 'Olet muuttanut uuteen asuntoon. Kirjoita viesti ystävällesi ja kutsu hänet tupareihin (tupaantuliaisiin). Kerro milloin juhlat ovat ja mitä pitää ottaa mukaan. Kirjoita noin 50 sanaa.'
  },
  {
    id: 'wr4',
    title: 'Virallinen viesti: Työhakemus',
    type: 'formal-email',
    instructions: 'Näit ilmoituksen avoimesta työpaikasta kahvilassa. Kirjoita lyhyt työhakemus sähköpostilla kahvilan omistajalle. Kerro kuka olet, miksi haluat työn ja mitä työkokemusta sinulla on. Kirjoita noin 100 sanaa.'
  },
  {
    id: 'wr5',
    title: 'Epävirallinen viesti: Anteeksipyyntö',
    type: 'informal-message',
    instructions: 'Olit sopinut tapaamisen ystäväsi kanssa, mutta tulit sairaaksi. Kirjoita viesti, pyydä anteeksi ja ehdota uutta tapaamisaikaa. Kirjoita noin 40-50 sanaa.'
  },
  {
    id: 'wr6',
    title: 'Virallinen viesti: Valitus (Reklamaatio)',
    type: 'formal-email',
    instructions: 'Ostit uuden puhelimen, mutta se meni rikki viikon kuluttua. Kirjoita sähköposti kauppaan. Kerro mitä tapahtui ja mitä haluat (esim. uusi puhelin tai rahat takaisin). Kirjoita noin 100 sanaa.'
  },
  {
    id: 'wr7',
    title: 'Mielipide: Älypuhelimet kouluissa',
    type: 'opinion',
    instructions: 'Pitäisikö älypuhelimet kieltää peruskouluissa oppituntien aikana? Kirjoita mielipidekirjoitus lehteen. Perustele mielipiteesi hyvin. Kirjoita noin 150 sanaa.'
  }
];

export const YKI_READING_PASSAGES: YkiReadingPassage[] = [
  {
    id: 'rd1',
    title: 'Uutinen: Uusi pyörätie',
    text: 'Helsingin keskustaan rakennetaan uusi pyörätie. Rakennustyöt alkavat ensi maanantaina ja kestävät kaksi kuukautta. Työmaa aiheuttaa muutoksia liikenteeseen. Autoilijoiden on käytettävä kiertoreittejä, mutta jalankulkijat pääsevät kulkemaan normaalisti. Kaupunki toivoo, että uusi pyörätie lisää pyöräilyä ja vähentää autoilua keskustassa.',
    questions: [
      {
        id: 'rd1-q1',
        question: 'Kuinka pitkään rakennustyöt kestävät?',
        options: ['Kaksi viikkoa', 'Ensi maanantaihin', 'Kaksi kuukautta', 'Koko kesän'],
        correctAnswer: 'Kaksi kuukautta'
      },
      {
        id: 'rd1-q2',
        question: 'Keitä työmaa häiritsee eniten?',
        options: ['Pyöräilijöitä', 'Autoilijoita', 'Jalankulkijoita', 'Kaikkia'],
        correctAnswer: 'Autoilijoita'
      }
    ]
  },
  {
    id: 'rd2',
    title: 'Ilmoitus: Kadonnut koira',
    text: 'Kadonnut pieni, musta koira lauantaina 15.5. Puistolan alueella. Koiralla on punainen panta, jossa lukee "Rekku". Koira on ystävällinen, mutta voi olla vähän arka vieraiden ihmisten kanssa. Jos näet Rekun, soita heti numeroon 040 123 4567. Löytöpalkkio luvassa!',
    questions: [
      {
        id: 'rd2-q1',
        question: 'Millainen panta koiralla on?',
        options: ['Musta', 'Punainen', 'Sininen', 'Ei pantaa'],
        correctAnswer: 'Punainen'
      },
      {
        id: 'rd2-q2',
        question: 'Miten koira käyttäytyy vieraiden kanssa?',
        options: ['Se on vihainen', 'Se on leikkisä', 'Se voi pelätä (olla arka)', 'Se haukkuu paljon'],
        correctAnswer: 'Se voi pelätä (olla arka)'
      }
    ]
  },
  {
    id: 'rd3',
    title: 'Mainos: Kuntosalin kesätarjous',
    text: 'Kuntosali Syke tarjoaa nyt loistavan kesäkampanjan! Kun ostat kolmen kuukauden kortin toukokuun aikana, saat ensimmäisen kuukauden puoleen hintaan. Kampanja koskee vain uusia asiakkaita. Salimme on auki 24 tuntia vuorokaudessa. Lisäksi tarjoamme ilmaisen ryhmäliikuntatunnin kerran viikossa kaikille jäsenille. Tervetuloa tutustumaan!',
    questions: [
      {
        id: 'rd3-q1',
        question: 'Kenelle kampanja on tarkoitettu?',
        options: ['Vain opiskelijoille', 'Kaikille asiakkaille', 'Vain uusille asiakkaille', 'Vain vanhoille asiakkaille'],
        correctAnswer: 'Vain uusille asiakkaille'
      },
      {
        id: 'rd3-q2',
        question: 'Mitä alennusta kampanja tarjoaa?',
        options: ['Koko kesä puoleen hintaan', 'Ensimmäinen kuukausi -50%', 'Kolmas kuukausi ilmainen', 'Ryhmäliikunta -50%'],
        correctAnswer: 'Ensimmäinen kuukausi -50%'
      }
    ]
  },
  {
    id: 'rd4',
    title: 'Mielipide: Roskaaminen puistoissa',
    text: 'Olen huomannut, että meidän kaupunkimme puistoissa on yhä enemmän roskia, erityisesti viikonloppujen jälkeen. Ihmiset jättävät eväspaperit ja tyhjät pullot nurmikoille, vaikka roskakoreja on lähellä. Tämä on paitsi rumaa, myös vaarallista eläimille. Mielestäni kaupungin pitäisi lisätä roskakoreja ja poliisin tulisi valvoa puistoja tarkemmin. Meidän kaikkien pitää kantaa vastuu ympäristöstämme!',
    questions: [
      {
        id: 'rd4-q1',
        question: 'Mikä on kirjoittajan mielestä suurin ongelma?',
        options: ['Puistoissa on liian vähän roskakoreja', 'Eläimet ovat vaarallisia', 'Ihmiset jättävät roskia puistoihin viikonloppuisin', 'Poliisi ei tee työtään'],
        correctAnswer: 'Ihmiset jättävät roskia puistoihin viikonloppuisin'
      },
      {
        id: 'rd4-q2',
        question: 'Mitä kirjoittaja ehdottaa ratkaisuksi?',
        options: ['Puistot pitäisi sulkea viikonloppuisin', 'Lisää roskakoreja ja enemmän valvontaa', 'Kaikkien pitäisi pysyä kotona', 'Eläimet pitäisi viedä pois puistoista'],
        correctAnswer: 'Lisää roskakoreja ja enemmän valvontaa'
      }
    ]
  }
];

export const YKI_LISTENING_PROMPTS: YkiListeningPrompt[] = [
  {
    id: 'ls1',
    title: 'Puhelinvastaajaviesti: Hammaslääkäri',
    script: 'Hei! Täältä soittaa sairaanhoitaja Mäkinen terveyskeskuksesta. Sinulla on varattu hammaslääkäriaika huomenna kello 14.30. Valitettavasti lääkäri on sairastunut, joten meidän täytyy siirtää aikasi. Sopiiko sinulle ensi viikon tiistaina kello kymmenen? Soitathan takaisin tähän numeroon mahdollisimman pian. Kiitos ja kuulemiin.',
    questions: [
      {
        id: 'ls1-q1',
        question: 'Miksi aika on peruttu?',
        options: ['Asiakas on sairas', 'Lääkäri on sairas', 'Klinikka on kiinni', 'Aika oli väärä'],
        correctAnswer: 'Lääkäri on sairas'
      },
      {
        id: 'ls1-q2',
        question: 'Mille päivälle uutta aikaa ehdotetaan?',
        options: ['Huomiselle', 'Keskiviikolle', 'Ensi viikon tiistaille', 'Seuraavalle viikolle kello kaksi'],
        correctAnswer: 'Ensi viikon tiistaille'
      }
    ]
  },
  {
    id: 'ls2',
    title: 'Kuulutus: Juna-asema',
    script: 'Huomio matkustajat. InterCity-juna 45 Tampereelta Helsinkiin on myöhässä noin kaksikymmentä minuuttia. Juna saapuu raiteelle kolme. Pahoittelemme myöhästymistä ja siitä aiheutuvaa haittaa. Juna lähtee raiteelta kolme heti matkustajien noustua kyytiin.',
    questions: [
      {
        id: 'ls2-q1',
        question: 'Kuinka paljon juna on myöhässä?',
        options: ['10 minuuttia', '15 minuuttia', '20 minuuttia', 'Puoli tuntia'],
        correctAnswer: '20 minuuttia'
      },
      {
        id: 'ls2-q2',
        question: 'Mille raiteelle juna saapuu?',
        options: ['Raide 1', 'Raide 2', 'Raide 3', 'Raide 4'],
        correctAnswer: 'Raide 3'
      }
    ]
  },
  {
    id: 'ls3',
    title: 'Radiouutiset: Sää',
    script: 'Ja seuraavaksi säätiedotus. Huomenna sää on koko maassa pilvinen ja viilenee. Etelä-Suomessa sataa vettä koko päivän, lämpötila on noin viisi astetta. Pohjois-Suomeen on luvassa jopa lumisadetta ja pakkasta. Ajokeli pohjoisessa voi olla erittäin huono, joten autoilijoiden on syytä olla varovaisia. Viikonloppuna sää kuitenkin kirkastuu ja aurinko paistaa kaikkialla Suomessa.',
    questions: [
      {
        id: 'ls3-q1',
        question: 'Millainen sää on Etelä-Suomessa huomenna?',
        options: ['Aurinkoinen ja lämmin', 'Sataa vettä ja on viisi astetta', 'Sataa lunta', 'Pilvinen ja pakkanen'],
        correctAnswer: 'Sataa vettä ja on viisi astetta'
      },
      {
        id: 'ls3-q2',
        question: 'Miksi autoilijoita varoitetaan?',
        options: ['Liikenne on ruuhkainen', 'Pohjoisessa on huono ajokeli lumisateen vuoksi', 'Tiet ovat kiinni', 'Viikonloppuna on liikaa autoja'],
        correctAnswer: 'Pohjoisessa on huono ajokeli lumisateen vuoksi'
      }
    ]
  },
  {
    id: 'ls4',
    title: 'Arkipäivän tilanne: Kaupassa',
    script: 'Kassa: Hei! Saisiko olla muovikassi?\nAsiakas: Ei kiitos, minulla on oma kassi mukana.\nKassa: Selvä. Se tekee sitten 14 euroa ja 50 senttiä. Maksatko kortilla vai käteisellä?\nAsiakas: Kortilla. Voisitko laittaa kuitin roskiin?\nKassa: Totta kai. Mukavaa päivänjatkoa!\nAsiakas: Kiitos samoin.',
    questions: [
      {
        id: 'ls4-q1',
        question: 'Ottiko asiakas muovikassin?',
        options: ['Kyllä, yhden', 'Ei, koska hänellä on oma', 'Kyllä, hän osti kaksi', 'Ei, koska hän osti paperipussin'],
        correctAnswer: 'Ei, koska hänellä on oma'
      },
      {
        id: 'ls4-q2',
        question: 'Miten asiakas halusi maksaa?',
        options: ['Käteisellä', 'Laskulla', 'Kortilla', 'Hän ei halunnut maksaa'],
        correctAnswer: 'Kortilla'
      }
    ]
  }
];

