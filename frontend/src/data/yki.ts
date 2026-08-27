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
  }
];

export const YKI_WRITING_PROMPTS: YkiWritingPrompt[] = [
  {
    id: 'wr1',
    title: 'Virallinen viesti: Kylpyhuoneremontti',
    type: 'formal-email',
    instructions: 'Haluat tehdä kylpyhuoneremontin asunnossasi. Kirjoita sähköposti isännöitsijälle. Kerro mitä aiot tehdä, milloin remontti alkaa ja kuka sen tekee.'
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
    instructions: 'Olet muuttanut uuteen asuntoon. Kirjoita viesti ystävällesi ja kutsu hänet tupareihin (tupaantuliaisiin). Kerro milloin juhlat ovat ja mitä pitää ottaa mukaan.'
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
  }
];
