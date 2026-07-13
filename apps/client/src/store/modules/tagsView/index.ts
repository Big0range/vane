import { defineStore } from 'pinia';
import type { TagsViewState } from './types';

const createTag = (view: any) =>
  Object.assign({}, view, {
    title: view.meta?.title || 'no-name',
  });

const removeCachedViews = (removedViews: any[], cachedViews: string[]) => {
  const removedNames = removedViews
    .map(view => view.name)
    .filter(Boolean) as string[];
  return cachedViews.filter(name => !removedNames.includes(name));
};

const useTagsViewStore = defineStore('tagsView', {
  state: (): TagsViewState => ({
    visitedViews: [],
    cachedViews: [], //  keepAlive 缓存页面
  }),
  actions: {
    addVisitedView(view: any) {
      if (this.visitedViews.some(v => v.path === view.path)) return;
      const tag = createTag(view);
      if (view.meta?.affix) {
        this.visitedViews.unshift(tag);
      } else {
        this.visitedViews.push(tag);
      }
    },
    addCachedView(view: any) {
      if (!view.meta?.keepAlive || this.cachedViews.includes(view.name)) return;
      this.cachedViews.push(view.name);
    },
    async delVisitedView(view: any) {
      this.visitedViews = this.visitedViews.filter(v => v.path !== view.path);
      return [...this.visitedViews];
    },
    async delCachedView(view: any) {
      this.cachedViews = this.cachedViews.filter(name => name !== view.name);
      return [...this.cachedViews];
    },
    async delOtherVisitedViews(view: any) {
      this.visitedViews = this.visitedViews.filter(
        v => v.meta?.affix || v.path === view.path,
      );
      return [...this.visitedViews];
    },
    async delOtherCachedViews(view: any) {
      const index = this.cachedViews.indexOf(view.name);
      this.cachedViews =
        index > -1 ? this.cachedViews.slice(index, index + 1) : [];
      return [...this.cachedViews];
    },

    updateVisitedView(view: any) {
      for (const v of this.visitedViews) {
        if (v.path === view.path) {
          Object.assign(v, view);
          break;
        }
      }
    },
    addView(view: any) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    async delView(view: any) {
      await this.delVisitedView(view);
      await this.delCachedView(view);
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews],
      };
    },
    async delOtherViews(view: any) {
      await this.delOtherVisitedViews(view);
      await this.delOtherCachedViews(view);
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews],
      };
    },
    async delLeftViews(view: any) {
      const currIndex = this.visitedViews.findIndex(v => v.path === view.path);
      if (currIndex === -1) return;
      const removedViews: any[] = [];
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (index >= currIndex || item.meta?.affix) return true;
        removedViews.push(item);
        return false;
      });
      this.cachedViews = removeCachedViews(removedViews, this.cachedViews);
      return { visitedViews: [...this.visitedViews] };
    },
    async delRightViews(view: any) {
      const currIndex = this.visitedViews.findIndex(v => v.path === view.path);
      if (currIndex === -1) return;
      const removedViews: any[] = [];
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (index <= currIndex || item.meta?.affix) return true;
        removedViews.push(item);
        return false;
      });
      this.cachedViews = removeCachedViews(removedViews, this.cachedViews);
      return { visitedViews: [...this.visitedViews] };
    },
    async delAllViews() {
      this.visitedViews = this.visitedViews.filter(tag => tag.meta?.affix);
      this.cachedViews = [];
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews],
      };
    },
    async delAllVisitedViews() {
      this.visitedViews = this.visitedViews.filter(tag => tag.meta?.affix);
      return [...this.visitedViews];
    },
    async delAllCachedViews() {
      this.cachedViews = [];
      return [...this.cachedViews];
    },
  },
  persist: {
    storage: sessionStorage,
  },
});

export default useTagsViewStore;
