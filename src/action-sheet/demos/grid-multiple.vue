<template>
  <div class="action-sheet-demo">
    <t-button block variant="outline" theme="primary" @click="visible = true">宫格型-多页</t-button>
  </div>
  <t-action-sheet
    v-model="visible"
    theme="grid"
    :items="items"
    :count="count"
    @selected="handleSelected"
    @cancel="handleCancel"
  >
  </t-action-sheet>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { ShareIcon, StarIcon, DownloadIcon, Edit1Icon, ImageIcon } from 'tdesign-icons-vue-next';
import { ActionSheetItem } from '../type';

const items = ref([
  {
    label: '微信',
    icon: 'https://tdesign.gtimg.com/miniprogram/logo/wechat.png',
  },
  {
    label: '朋友圈',
    icon: 'https://tdesign.gtimg.com/miniprogram/logo/times.png',
  },
  {
    label: 'QQ',
    icon: 'https://tdesign.gtimg.com/miniprogram/logo/qq.png',
  },
  {
    label: '企业微信',
    icon: 'https://tdesign.gtimg.com/miniprogram/logo/wecom.png',
  },
  {
    label: '收藏',
    icon: () => h(ShareIcon, { size: '24px' }),
  },
  {
    label: '刷新',
    icon: () => h(StarIcon, { size: '24px' }),
  },
  {
    label: '下载',
    icon: () => h(DownloadIcon, { size: '24px' }),
  },
  {
    label: '复制',
    icon: () => h(Edit1Icon, { size: '24px' }),
  },
  {
    label: '文字',
    icon: () => h(ImageIcon, { size: '24px' }),
  },
  {
    label: '文字',
    icon: () => h(ImageIcon, { size: '24px' }),
  },
]);
const visible = ref(false);
const count = ref(8);

const handleSelected = (selected: ActionSheetItem, selectedIndex: number) => {
  console.log(selected, selectedIndex);
};
const handleCancel = (): void => {
  console.log('cancel');
};
</script>

<style lang="less" scoped>
.action-sheet-demo {
  margin-bottom: 16px;
}
</style>
