<template>
  <img :src="realSrc"/>
</template>
<script>
import { Vue, Component, Prop } from 'core/decorators';

class LoadStatus {
  static LOADING = '0'
  static SUCCESS = '1'
  static ERROR = '2'
}

const transparent = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

const caches = {};
function toCacheImage (src) {
  if (LoadStatus.ERROR == caches[src]) caches[src] = null;
  if (!caches[src]) {
    caches[src] = new Promise(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        caches[src] = LoadStatus.SUCCESS;
        resolve(caches[src]);
      };
      img.onerror = () => {
        caches[src] = LoadStatus.ERROR;
        resolve(caches[src]);
      };
    });
    return caches[src];
  }

  return caches[src];
}

@Component
export default class AppImg extends Vue {
  @Prop({ type: String, required: true }) src
  @Prop({ type: String, required: false, default: transparent }) defaultSrc
  @Prop({ type: String, required: false, default: '' }) errorSrc

  loadStatus = LoadStatus.LOADING;

  get LoadStatus () { return LoadStatus; }

  get realSrc () {
    if (LoadStatus.LOADING == this.loadStatus) return this.defaultSrc;
    if (LoadStatus.SUCCESS == this.loadStatus) return this.src;
    if (LoadStatus.ERROR == this.loadStatus) return this.errorSrc || this.defaultSrc;
  }

  async created () {
    this.loadStatus = await toCacheImage(this.src);
  }
};
</script>
