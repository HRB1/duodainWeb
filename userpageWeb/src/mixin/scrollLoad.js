import debounce from "@/utils/debounce";
export default {
  data() {
    return {
      Top: 0
    };
  },
  methods: {
    scrollFn(main) {
      if (main) {
        main.addEventListener(
          "scroll",
          debounce(() => {
            let { height } = main.getBoundingClientRect();
            let { height: chidOne } = main.children[0].getBoundingClientRect();
            this.Top = main.scrollTop;
            if (main.scrollTop + height >= chidOne) {
              this.getScroll();
            }
          }),
          300,
          true
        );
      }
    }
  }
};
