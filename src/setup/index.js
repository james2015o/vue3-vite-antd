import loading from "../store/loading";

//配置全局变量，方法，director等
export default {
  install(app, options) {   
    app.mixin({
      data() {
        return {
          loading: loading,
        };
      },
      methods: {
        $goto(option) {
          this.$router.push(option);
        },
      },
    });
  },
};
