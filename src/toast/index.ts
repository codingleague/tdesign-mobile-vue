import vueToast from './toast.vue';
import { createApp, defineComponent ,App, DefineComponent, Plugin } from 'vue';
import ToastProps from './props';

import './style/';

let instance: any = null;

/** 展示提示 */
function Toast(props?: ToastProps | string): DefineComponent<ToastProps> {
  const root = document.createElement('div');
  document.body.appendChild(root);

  const propsObject = {
    duration: 2000,
    ...parseOptions(props),
  };

  if (instance) {
    instance.clear();
  }

  instance = defineComponent(vueToast);

  instance.clear = () => {
    clearTimeout(instance.timer);
    root.remove();
  };

  if (propsObject.duration && propsObject.duration > 0) {
    instance.timer = setTimeout(instance.clear, propsObject.duration);
  }

  createApp(instance, { ...propsObject }).mount(root);

  return instance;
}

Toast.clear = () => {
  if (instance) {
    instance.clear();
  }
};

(['loading', 'success', 'fail'] as ToastType[]).forEach((type): void => {
  Toast[type] = (options: ToastProps | string) => {
    let props = { message: '', type };

    if (typeof options === 'string') {
      props.message = options;
    } else {
      props = { ...props, ...options };
    }

    return Toast(props);
  };
});

function parseOptions(message?: ToastProps | string) {
  if (typeof message === 'string') {
    return { message };
  }
  return message;
}

Toast.install = (app: App) => {
  // 添加插件入口
  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$toast = Toast;
};

type ToastApi = typeof Toast & {
  /** 展示加载提示 */
  loading: (options?: ToastProps | string) => void,
  /** 展示成功提示 */
  success: (options?: ToastProps | string) => void,
  /** 展示失败提示 */
  fail: (options?: ToastProps | string) => void,
  /** 关闭提示 */
  clear: () => void,
};

export const ToastPlugin = (Toast as unknown) as (Plugin & ToastApi);
export default ToastPlugin;

declare module '@vue/runtime-core' {
  // Bind to `this` keyword
  interface ComponentCustomProperties {
    $toast: ToastApi;
  }
}
