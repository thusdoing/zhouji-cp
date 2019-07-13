import Vue from 'vue';
/**
 * 分页对象信息
 */
export class PageInfo {
  loading = false;
  page = 1;
  pages = -1;
  total = -1;
  pageSize = 1;
  list = [];
  constructor (options) {
    Object.assign(this, { page: 1, pageSize: 30, pages: -1, total: -1, list: [] }, options);
  }

  /** 添加分页对象 */
  addPageInfo (pageInfo) {
    this.loading = false;
    // console.log('this', this, pageInfo)
    if (!pageInfo || typeof pageInfo !== 'object') return this;
    if (pageInfo.page <= this.pages && this.page!=1) {
      // const list = this.list.concat(pageInfo.list);
      // console.log(this.list, pageInfo.list)
      this.list = pageInfo.list;
      // Object.assign(this, pageInfo);
      // Vue.set(this, 'list', list);
    } else Object.assign(this, { list: [] }, pageInfo);
    if (typeof pageInfo.total == 'number' && pageInfo.total >= 0) this.pages = Math.ceil(pageInfo.total / pageInfo.pageSize);
    return this;
  }

  /** 是否拥有下一页，不传参，有参数，检验page是否有效的页数 */
  hasNext (page) {
    if (typeof page == 'undefined') page = this.page + 1;
    if (typeof page <= 0) throw new Error('PageInfo.hasNext(page) page must be number type and page >= 1.');
    if (page == 1) return true;
    if (this.pages == -1 || this.total == -1) return true;
    return this.pages >= page;
  }

  /** 下一页 */
  next () {
    if (this.page<this.pages){
      this.page = this.page + 1
      this.loading = true;
      return this.page;
    } return 0
    // if (!this.hasNext(page)) return 0;

  }

  /** 重置分页对象 */
  reset () {
    this.page = 1;
    this.pages = -1;
    this.total = -1;
    this.loading = false;
    this.list = [];
  }

  /**
   * 截断数据
   * @param {number} page 从第几页开始截断
   */
  truncation (page = 1) {
    if (this.page <= page) return this;
    this.page = page;
    this.list.splice(this.page * this.pageSize);
    return this;
  }
}

/**
 * 创建分页对象
 * @param {PageInfo} pageInfo 分页对象，可以是反序列的对象
 */
export const pageInfo = function (pageInfo) {
  return new PageInfo(pageInfo);
};
