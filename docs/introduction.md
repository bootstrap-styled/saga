[![build status]($CI_PROJECT_URL/badges/master/build.svg)]($CI_PROJECT_URL/commits/master)
[![coverage report]($CI_PROJECT_URL/badges/master/coverage.svg)]($CI_PROJECT_URL/commits/master)

![image](https://img.shields.io/badge/version-$PACKAGE_VERSION-green.svg)
![image](https://img.shields.io/badge/node-$NODE_VERSION-brightgreen.svg)
![image](https://img.shields.io/badge/npm-$NPM_VERSION-red.svg)
![image](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![image]($IMG_SHIELD_PUBLISHING)

[![image](https://user-images.githubusercontent.com/1866564/38087911-2f85c6e2-3384-11e8-9383-676504307e3f.png)]($CI_PROJECT_URL)

$PACKAGE_NAME will watch for `CHANGE_THEME_REQUEST` in your application, and query theme asynchronously using the provided `themeProvider` and `themes` object.

You only need it if you wish to use asynchronous theme loading. 

It also work with synchronous theme using the store of [bootstrap-styled.yeutech.com/bootstrap-styled-redux](https://bootstrap-styled.yeutech.com/bootstrap-styled-redux), it is just an additional store.
