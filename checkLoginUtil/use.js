// app.vue
export default {
    created() {
        this.checkLogin();
    },
    watch: {
        $route() {
            this.checkLogin();
        }
    },
    methods: {
        //判断是否登录
        checkLogin() {
            if (!checkLoginUtil.checkLogin() && !(this.$route.path === "/login")) {
                //保存当前退出的页面
                sessionStorage.currentRouterPath = this.$route.path;
                this.$alert("登录过期，请重新登录", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            } else {
                // 更新cookie
                checkLoginUtil.updateCookie();
            }
        },

    }
}

// -login.vue
export default {
    //登录成功，存储数据，跳转到相应页面
    methods: {
        //登录成功，存储数据，跳转到相应页面
        loginSucceed() {
            var routerPath = "";
            checkLoginUtil.storeCookie(this.loginForm.username);
            if (
                sessionStorage.currentRouterPath &&
                !sessionStorage.currentRouterPath
            ) {
                routerPath = sessionStorage.currentRouterPath;
            } else {
                routerPath = "/menber-info-list";
            }
            this.$router.push({
                path: routerPath
            });
        },
    }

}


// 登出
export default {
    methods: {
        logoutHandle() {
            // 删除记录的当前路由路径
            sessionStorage.currentRouterPath = null;
            // 删除cookies
            checkLoginUtil.deletCookie();
            //跳转到登录页面
            this.$router.push({
                path: "/login"
            });
        }
    }
}