const app = new Vue({
  el: '#app',
  data: {
    lang: null,
    texts,
    screens
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
    }
  },
  beforeMount(){
    initSounds();
    this.detectNavigatorLanguage();
  },
  mounted(){
    this.initTabs();
  }
});
   
 