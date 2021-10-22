const settings = new Vue({
  el: '#settings',
  data: {
    lang: app.lang,
    texts,
    patterns,
    levels,
    selectedLevelId: 1
  },
  methods: {
    initSelects: function(){
      const elems = document.querySelectorAll('select');
      const instances = M.FormSelect.init(elems, {});
    }
  },
  mounted(){
    this.initSelects();
  }
});

