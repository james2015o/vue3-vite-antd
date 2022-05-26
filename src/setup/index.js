import loading from "../store/loading";
import { getUser } from "../store/user";

//配置全局变量，方法，director等
export default {
  install(app, options) { 
    app.mixin({    
      data() {
        return {
          loading: loading,
        };
      },
      directives: {
        // 权限
        permission: {
          async created(el, binding) {
            const user = await getUser();

            if (!user.value.auth || !user.value.auth.includes(binding.value)) {
              el.style.display = "none";
            }
          },
        },
      },
      methods: {
        $goto(option) {
          this.$router.push(option);
        },
      },
    });
  },
};
