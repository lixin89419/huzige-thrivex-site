import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TabItem {
  path: string;
  title: string;
  icon?: string;
}

interface TabsStore {
  tabs: TabItem[];
  activeTab: string;

  // 添加标签
  addTab: (tab: TabItem) => void;

  // 移除标签
  removeTab: (path: string) => void;

  // 设置激活标签
  setActiveTab: (path: string) => void;

  // 关闭其他标签
  closeOtherTabs: (path: string) => void;

  // 关闭所有标签
  closeAllTabs: () => void;
}

export default create(
  persist<TabsStore>(
    (set) => ({
      tabs: [{ path: '/', title: '首页' }],
      activeTab: '/',

      addTab: (tab: TabItem) =>
        set((state) => {
          // 如果标签已存在，不重复添加
          if (state.tabs.some((t) => t.path === tab.path)) {
            return { activeTab: tab.path };
          }

          return {
            tabs: [...state.tabs, tab],
            activeTab: tab.path,
          };
        }),

      removeTab: (path: string) =>
        set((state) => {
          if (state.tabs.length <= 1) {
            // 至少保留一个标签
            return state;
          }

          const newTabs = state.tabs.filter((t) => t.path !== path);
          const currentIndex = state.tabs.findIndex((t) => t.path === path);

          // 如果关闭的是当前激活的标签，激活相邻的标签
          let newActiveTab = state.activeTab;
          if (state.activeTab === path) {
            if (currentIndex > 0) {
              newActiveTab = state.tabs[currentIndex - 1].path;
            } else {
              newActiveTab = newTabs[0].path;
            }
          }

          return {
            tabs: newTabs,
            activeTab: newActiveTab,
          };
        }),

      setActiveTab: (path: string) =>
        set(() => ({
          activeTab: path,
        })),

      closeOtherTabs: (path: string) =>
        set((state) => ({
          tabs: state.tabs.filter((t) => t.path === path),
          activeTab: path,
        })),

      closeAllTabs: () =>
        set(() => ({
          tabs: [{ path: '/', title: '首页' }],
          activeTab: '/',
        })),
    }),
    {
      name: 'tabs_storage',
      getStorage: () => localStorage,
    },
  ),
);
