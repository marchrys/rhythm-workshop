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
    phrasePatternIds: [],
    answers: [0, 0, 0, 0],
    ansBtnDisabled: true,
    selectedPattern : patterns[0],
    actionBtnDisabled: [false, true, true, true],
    phrasePatternNum: 4,
    startTimes: [],
    fbIcons: [
      {
        id: -1,
        text: '&nbsp',
        color: ''
      },
      {
        id: 0,
        text: 'fas fa-times',
        color: 'red-text'
      },
      {
        id: 1,
        text: 'fas fa-check',
        color: 'green-text'
      },
    ],
    phraseFbIconIds: [-1, -1, -1, -1],
    resetLevelId: 0,
    resetText: texts.resetGlobalStats['en'],
    playings: 0
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
    initModals: function() {
      const elems = document.querySelectorAll('.modal');
      const instances = M.Modal.init(elems, {});
    },
    loadData: function(){ 
      if (localStorage.selectedLevel) {
        this.selectedLevel = JSON.parse(localStorage.selectedLevel);
        this.selectedPattern = this.patterns.find(pattern => pattern.id === this.selectedLevel.patternIds[0]);
      }
      if(localStorage.questions) {
        this.questions = JSON.parse(localStorage.questions);
      }
      if(localStorage.rightAns) {
        this.rightAns = JSON.parse(localStorage.rightAns);
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
      if ( a.orderId < b.orderId ){
        return -1;
      }
      if ( a.orderId > b.orderId ){
        return 1;
      }
      return 0;
    },
    generatePhrase: function() {
      this.phrasePatternIds = [];
      phrasePatterns = [];
      let phraseDurations = [];
      this.startTimes = [];
      let startTime = 0;
      let lastPatternInstances = 0;

      while(lastPatternInstances === 0) {
          this.phrasePatternIds = [];
          phrasePatterns = [];
          for(let i=1; i<=this.phrasePatternNum; i++) {
            const randPatternId = this.selectedLevel.patternIds[Math.floor(Math.random() * this.selectedLevel.patternIds.length)];

            if(randPatternId == this.selectedLevel.patternIds[this.selectedLevel.patternIds.length-1]) {
              lastPatternInstances++;
            }

            const randPattern = this.patterns.find(pattern => pattern.id === randPatternId);

            this.phrasePatternIds.push(randPatternId);
            phrasePatterns.push(randPattern);
          }
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
        playSound(C4, startTime);
      }.bind(this));
    },
    resetStats: function() {
      if(this.resetLevelId === 0) {
        this.questions = [];
        this.rightAns = [];
      } else {
        this.questions = this.questions.filter(question => question.levelId !== this.resetLevelId);
        this.rightAns = this.rightAns.filter(rightAns => rightAns.levelId !== this.resetLevelId);
      }
      this.answers = [0, 0, 0, 0];
      this.phraseFbIconIds = [-1, -1, -1, -1];
      this.actionBtnDisabled = [false, true, true, true];
    },

    handleLevelChange: function() {
      stopAllSounds();
      this.selectedPattern = patterns.find(pattern => pattern.id === this.selectedLevel.patternIds[0]);
      this.answers = [0, 0, 0, 0];
      this.phraseFbIconIds = [-1, -1, -1, -1];
      this.actionBtnDisabled = [false, true, true, true];
    },
    handleActionBtnClick(index){
      
      stopAllSounds();
      switch(index) {
        case 0:
          this.ansBtnDisabled = false;
          this.actionBtnDisabled = [true, false, false, true];
          this.answers = [0, 0, 0, 0];
          this.phraseFbIconIds = [-1, -1, -1, -1];
          this.generatePhrase();
          this.phrasePatternIds.forEach(function(pattern) {
            this.questions.push({
              patternId: pattern.id,
              levelId: this.selectedLevel.id
            });
          }.bind(this));
          this.playPhrase();
          this.playings = 1;
          break;
        case 1:
          this.playPhrase();
          this.playings++;
          if(this.globalVars.version.id === 0 && this.playings === this.globalVars.version.liteMaxPlayings) {
            this.actionBtnDisabled = [true, true, false, true];
          }
          break;
        case 2:
          this.ansBtnDisabled = true;
          this.actionBtnDisabled = [false, true, true, false];

          this.answers.forEach(function(answerId, index) {
            if(answerId === this.phrasePatternIds[index]) {
              this.rightAns.push({
                patternId: answerId,
                levelId: this.selectedLevel.id
              });
              this.phraseFbIconIds.splice(index, 1, 1);
            } else {
              this.phraseFbIconIds.splice(index, 1, 0);
            }
          }.bind(this));
          break;

          case 3:
            this.phrasePatternIds.forEach(function(patternId, index) {
              console.log(patternId);
              this.answers.splice(index, 1, patternId);
            }.bind(this));
            this.phraseFbIconIds = [-1, -1, -1, -1];
            break;
      }
    },
    handleAnsBtnClick(index) {
      this.answers.splice(index, 1, this.selectedPattern.id);
    },
    handleResetBtnClick: function(levelId) {
      this.resetLevelId = levelId;
      if(this.resetLevelId === 0) {
        this.resetText = this.texts.resetGlobalStats[this.lang];
      } else {
        const level = this.levels.find(level => level.id === this.resetLevelId);
        this.resetText = this.texts.resetLevelStats[this.lang] + ' ' + level.orderId;
      }

      // const statsModal = document.querySelector('#delete-stats-modal');
      // const instance = M.Modal.init(statsModal, {});
      // instance.open();
    },
    handleTabClick: function() {
      alert('Tab clicked!');
    }
  },
  computed: {
    percentage: function() {
      return(num1, num2) => (num2 > 0) ? Math.round(num1 * 100 / num2) : 0;
    },
    questionsByLevel: function() {
      return(levelId) => this.questions.filter(question => question.levelId === levelId);
    },
    rightAnsByLevel: function() {
      return(levelId) => this.rightAns.filter(rightAns => rightAns.levelId === levelId);
    }
  },
  watch: {
    selectedLevel(newLevel) {
      localStorage.selectedLevel = JSON.stringify(newLevel);
    },
    questions() {
      localStorage.questions = JSON.stringify(this.questions);
    },
    rightAns() {
      localStorage.rightAns = JSON.stringify(this.rightAns);
    }
  },
  beforeMount(){
    initSounds();
    this.checkSoundsLoad();
    this.detectNavigatorLanguage();
    this.loadData();
    this.filterLevels();
    this.orderLevels();
    console.log(JSON.stringify(this.levels));
  },
  mounted(){
    this.initTabs();
    this.initSelects();
    this.initModals();
  }
});
   
 