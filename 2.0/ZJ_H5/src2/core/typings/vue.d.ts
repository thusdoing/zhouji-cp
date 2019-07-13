import * as tools from '../tools';
import * as apis from '../../apis';
import * as consts from '../../consts';

declare module 'vue/types/vue' {
  interface Vue {

    /** 常量类 */
    $consts: typeof consts;

    /** 工具类 */
    $tools: typeof tools;

    /** 远程接口 */
    $apis: typeof apis
  }
}
