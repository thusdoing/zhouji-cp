


export default {
  install(Vue) {
    // element-ui 
    // import { Button, ButtonGroup, Icon, Row, Col, Card, Collapse, CollapseItem, Container, Main, Footer, } from 'element-ui';
    Vue.use(require('element-ui/packages/button').default);
    Vue.use(require('element-ui/packages/button-group').default);
    Vue.use(require('element-ui/packages/icon').default);
    Vue.use(require('element-ui/packages/row').default);
    Vue.use(require('element-ui/packages/col').default);
    Vue.use(require('element-ui/packages/card').default);
    Vue.use(require('element-ui/packages/collapse').default);
    Vue.use(require('element-ui/packages/collapse-item').default);
    Vue.use(require('element-ui/packages/container').default);
    Vue.use(require('element-ui/packages/main').default);
    Vue.use(require('element-ui/packages/footer').default);

    
  }
}