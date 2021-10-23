const settings = new Vue({
  el: '#settings',
  data: {
    lang: app.lang,
    texts,
    patterns,
    levels,
    selectedLevel: levels[0]
  },
  methods: {
    initSelects: function(){
      const elems = document.querySelectorAll('select');
      const instances = M.FormSelect.init(elems, {});
    },
    loadData: function(){ 
      if (localStorage.selected_level_id) {
        this.selectedLevelId = localStorage.selected_level_id;
      }
    }
  },
  computed: {
      
  },
  watch: {
    selectedLevel(newLevel) {
      localStorage.selectedLevel = JSON.stringify(newLevel);
    }
  },
  beforeMount(){
     
  },
  mounted() {
    this.initSelects();
  }
});

