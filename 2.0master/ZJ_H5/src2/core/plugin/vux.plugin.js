import Alert from 'vux/src/components/alert';
import Confirm from 'vux/src/components/confirm';

Alert.props.maskTransition.default = 'vux-fade';
Alert.props.dialogTransition.default = '';
Confirm.props.maskTransition.default = 'vux-fade';
Confirm.props.dialogTransition.default = '';

function install (Vue) {
  Vue.component('confirm', Confirm);

  // 插件
  Vue.use(require('vux/src/plugins/alert').default);
  Vue.use(require('vux/src/plugins/confirm').default);
  Vue.use(require('vux/src/plugins/toast').default);
  Vue.use(require('vux/src/plugins/loading').default);
  Vue.use(require('vux/src/plugins/bus').default);

  // Vue.use(require('/src/plugins/datetime').default);

  // 指令
  Vue.directive('transfer-dom', require('vux/src/directives/transfer-dom').default);

  // 布局
  Vue.component('divider', require('vux/src/components/divider').default);
  Vue.component('flexbox', require('vux/src/components/flexbox/flexbox').default);
  Vue.component('flexbox-item', require('vux/src/components/flexbox/flexbox-item').default);
  Vue.component('grid', require('vux/src/components/grid/grid').default);
  Vue.component('grid-item', require('vux/src/components/grid/grid-item').default);
  Vue.component('sticky', require('vux/src/components/sticky').default);
  Vue.component('view-box', require('vux/src/components/view-box').default);

  // 导航
  Vue.component('x-header', require('vux/src/components/x-header').default);
  Vue.component('tab', require('vux/src/components/tab/tab').default);
  Vue.component('tab-item', require('vux/src/components/tab/tab-item').default);
  Vue.component('button-tab', require('vux/src/components/button-tab/button-tab').default);
  Vue.component('button-tab-item', require('vux/src/components/button-tab/button-tab-item').default);

  // 表单
  Vue.component('group', require('vux/src/components/group').default);
  Vue.component('search', require('vux/src/components/search').default);
  Vue.component('cell', require('vux/src/components/cell').default);
  Vue.component('x-input', require('vux/src/components/x-input').default);
  Vue.component('checker', require('vux/src/components/checker/checker').default);
  Vue.component('checker-item', require('vux/src/components/checker/checker-item').default);
  Vue.component('check-icon', require('vux/src/components/check-icon').default);
  Vue.component('x-switch', require('vux/src/components/x-switch').default);
  Vue.component('inline-x-number', require('vux/src/components/inline-x-number').default);
  

  // 基础组件
  Vue.component('x-button', require('vux/src/components/x-button').default);
  Vue.component('x-number', require('vux/src/components/x-number').default);

  // 数据展示
  // Vue.component('x-img', require('vux/src/components/x-img').default);
  Vue.component('load-more', require('vux/src/components/load-more').default);
  Vue.component('x-table', require('vux/src/components/x-table').default);
  Vue.component('popup', require('vux/src/components/popup').default);

  // 弹窗
  Vue.component('actionsheet', require('vux/src/components/actionsheet').default);
  Vue.component('divider', require('vux/src/components/divider').default);

  // 不再维护组件
  // Vue.component('scroller', Scroller);

  // 通用 $vux
  const $vux = Vue.$vux;

  /**
   * alert
   * @param {string|options} content
   * @param {string} title
   */
  const alert = function (content, title = '温馨提示') {
    const options = content != null && typeof content == 'object' ? content : { content, title };
    return new Promise(resolve => {
      $vux.alert.show({ ...options, onHide: resolve });
    });
  };

  /**
   * confirm
   * @param {string|options} content
   * @param {string} title
   */
  const confirm = function (content, title = '操作提示') {
    const options = content != null && typeof content == 'object' ? content : { content, title };
    return new Promise(resolve => {
      $vux.confirm.show({ ...options,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
    });
  };

  // 继承$vux.confirm
  Object.keys($vux.confirm).forEach(key => {
    confirm[key] = $vux.confirm[key];
  });
  // 继承$vux.alert
  Object.keys($vux.alert).forEach(key => {
    alert[key] = $vux.alert[key];
  });

  $vux.alert = alert;
  $vux.confirm = confirm;
}

export default { install };
