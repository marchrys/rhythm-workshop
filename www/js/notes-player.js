// class Rhythmplayer{
//     constructor(soundUrl){
//         this.context = '';
//         this.bufferLoader = '';
//         this.startTime = 0.1;

//         // Fix up prefixing
//         window.AudioContext = window.AudioContext || window.webkitAudioContext;
//         this.context = new AudioContext();
    
//         this.bufferLoader = new BufferLoader(
//         this.context,
//         [
//             soundUrl
//         ],
//         this.finishedLoading
//         );
    
//         this.bufferLoader.load();
//     }

//     finishedLoading(bufferList) {
//         this.kick = bufferList[0];
//     }

//     playSound(buffer, time) {
//         var source = this.context.createBufferSource();
//         source.buffer = buffer;
//         source.connect(this.context.destination);
//         source.start(this.startTime + time);
//     }

//       playPhrase(phraseDurations){
//           var notesTiming = [];
//           notesTiming.push(this.startTime);
//           for(var i=0; i<phraseDurations.length-1; i++){
//               notesTiming.push(notesTiming[i] + phraseDurations[i]);
//           }
            
//           notesTiming.forEach((item, index) => {
//               this.playSound(this.kick, item);
//           });
//       }
// }

let soundSources = [];

let allSoundsLoaded = false;
var C2, Db2, D2, Eb2, E2, F2, Gb2, G2, Ab2, A2, Bb2, B2;
var C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3;
var C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4;
var C5, Db5, D5, Eb5, E5, F5, Gb5, G5, Ab5, A5, Bb5, B5;
var C6;
var soundNoteNames = [
  'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2',
  'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3',
  'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
  'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
  'C6'
];
const sounds = [];

soundNoteNames.forEach(function(soundNoteName) {
  sounds.push('sounds/' + soundNoteName + '.mp3');
});

var context; 
var bufferLoader;
var startTime = 0.1;

function initSounds() {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  
    bufferLoader = new BufferLoader(
      context,
      sounds,
      finishedLoadingSound
      );
  
    bufferLoader.load();
}
  
function finishedLoadingSound(bufferList) {
    // soundNotes.forEach(function(soundNote, index) {
    //   soundNote = bufferList[index];
    // });

    C2 = bufferList[0];
    Db2 = bufferList[1];
    D2 = bufferList[2];
    Eb2 = bufferList[3];
    E2 = bufferList[4];
    F2 = bufferList[5];
    Gb2 = bufferList[6];
    G2 = bufferList[7];
    Ab2 = bufferList[8];
    A2 = bufferList[9];
    Bb2 = bufferList[10];
    B2 = bufferList[11];

    C3 = bufferList[12];
    Db3 = bufferList[13];
    D3 = bufferList[14];
    Eb3 = bufferList[15];
    E3 = bufferList[16];
    F3 = bufferList[17];
    Gb3 = bufferList[18];
    G3 = bufferList[19];
    Ab3 = bufferList[20];
    A3 = bufferList[21];
    Bb3 = bufferList[22];
    B3 = bufferList[23];

    C4 = bufferList[24];
    Db4 = bufferList[25];
    D4 = bufferList[26];
    Eb4 = bufferList[27];
    E4 = bufferList[28];
    F4 = bufferList[29];
    Gb4 = bufferList[30];
    G4 = bufferList[31];
    Ab4 = bufferList[32];
    A4 = bufferList[33];
    Bb4 = bufferList[34];
    B4 = bufferList[35];

    C5 = bufferList[36];
    Db5 = bufferList[37];
    D5 = bufferList[38];
    Eb5 = bufferList[39];
    E5 = bufferList[40];
    F5 = bufferList[41];
    Gb5 = bufferList[42];
    G5 = bufferList[43];
    Ab5 = bufferList[44];
    A5 = bufferList[45];
    Bb5 = bufferList[46];
    B5 = bufferList[47];

    C6 = bufferList[48];

    allSoundsLoaded = true;
    console.log('all sounds loaded!');
} 

function playSound(buffer, time) {
    var source = context.createBufferSource();
    // Create a gain node.
    var gainNode = context.createGain();
    
    source.buffer = buffer;
    source.connect(gainNode);
    // Connect the gain node to the destination.
    gainNode.connect(context.destination);
    // source.connect(context.destination);
    // Reduce the volume.
    gainNode.gain.value = 0.2;
    source.start(context.currentTime + time);

    soundSources.push(source);
}

function stopAllSounds() {
  soundSources.forEach(function(sound) {
    sound.stop(0);
  });
}

function playPhrase(phraseDurations){
    var notesTiming = [];
    notesTiming.push(startTime);
    for(var i=0; i<phraseDurations.length-1; i++){
        notesTiming.push(notesTiming[i] + phraseDurations[i]);
    }
      
    notesTiming.forEach((item, index) => {
        playSound(piano, item);
    })
}

 

 
  
  

  





 

 
  
  

  



