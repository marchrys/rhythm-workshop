const app = new Vue({
  el: '#app',
  data: {
    lang: null,
    globalVars,
    soundsLoaded: false,
    texts,
    screens,
    patterns,
    levels,
    selectedLevel: levels[0],
    questions: [],
    rightAns: [],
    answers: ['?', '?', '?', '?'],
    ansBtnDisabled: true,
    selectedPattern : patterns[0],
    actionBtnDisabled: [false, true, true, true],
    phrasePatternNum: 4,
    startTimes: []
  },
  methods: {
    detectNavigatorLanguage: function() {
      const langStr = window.navigator.language;
      //On détecte la langue de l'appareil
      if(langStr.substr(0, 2) == 'fr'){
          this.lang = 'fr';
      }
      else{
          this.lang = 'en';
      }
    },
    initTabs: function() {
      let elem = document.querySelector('.tabs'); 
      let instance = M.Tabs.init(elem, {});
    },
    initSelects: function(){
      const elems = document.querySelectorAll('select');
      const instances = M.FormSelect.init(elems, {});
    },
    loadData: function(){ 
      if (localStorage.selectedLevel) {
        this.selectedLevel = JSON.parse(localStorage.selectedLevel);
        this.selectedPattern = this.patterns.find(pattern => pattern.id === this.selectedLevel.patternIds[0]);
      }
    },
    filterLevels: function(){
      if(this.globalVars.version.id === 0){
        this.levels = this.levels.filter(level => level.inLite === true);
      }
    },
    checkSoundsLoad() {
      const soundsLoad = setInterval(function() {
        if(allSoundsLoaded) {
          this.soundsLoaded = true;
          clearInterval(soundsLoad);
          return;
        }
      }.bind(this), 1000);
    },
    orderLevels: function() {
      this.levels.sort(this.compareLevels);
    },
    compareLevels: function( a, b ) {
      if ( a.order < b.order ){
        return -1;
      }
      if ( a.order > b.order ){
        return 1;
      }
      return 0;
    },
    generatePhrase: function() {
      let phrasePatterns = [];
      let phraseDurations = [];
      this.startTimes = [];
      let startTime = 0;

      for(let i=1; i<=this.phrasePatternNum; i++) {
        const randPatternId = this.selectedLevel.patternIds[Math.floor(Math.random() * this.selectedLevel.patternIds.length)];

        const randPattern = this.patterns.find(pattern => pattern.id === randPatternId);

        phrasePatterns.push(randPattern);
      }

      phrasePatterns.forEach(function(pattern) {
        pattern.durations.forEach(function(duration) {
          phraseDurations.push(duration);
        });
      });

      this.startTimes.push(startTime);
      phraseDurations.forEach(function(duration, index) {
        if(index < phraseDurations.length-1) {
          startTime += duration;
          this.startTimes.push(startTime);
        }
      }.bind(this));
    },
    playPhrase: function() {
      this.startTimes.forEach(function(startTime) {
        playSound(C2, startTime);
      }.bind(this));
    },
    handleLevelChange: function() {
      this.selectedPattern = patterns.find(pattern => pattern.id === this.selectedLevel.patternIds[0]);
    },
    handleActionBtnClick(index){
       
      switch(index) {
        case 0:
          // this.actionBtnDisabled = [true, false, false, true];
          this.generatePhrase();
          this.playPhrase();
          break;
      }
    }
  },
  computed: {
    percentage: function() {
      return(num1, num2) => (num2 > 0) ? Math.round(num1 * 100 / num2) : 0;
    }
  },
  watch: {
    selectedLevel(newLevel) {
      localStorage.selectedLevel = JSON.stringify(newLevel);
    }
  },
  beforeMount(){
    initSounds();
    this.checkSoundsLoad();
    this.detectNavigatorLanguage();
    this.loadData();
    this.filterLevels();
    this.orderLevels();
  },
  mounted(){
    this.initTabs();
    this.initSelects();
  }
});
   
 