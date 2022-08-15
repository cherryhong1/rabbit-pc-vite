<script>
import { h } from "vue";
export default {
  name: "bread",
  setup(props, { slots, expose }) {
    const items = slots.default();
    let dymanicItems = [];
    items.forEach((item,i) => {
      dymanicItems.push(item);
      if (i < items.length - 1) {
        dymanicItems.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    expose({
      dymanicItems,
    });
    return () => h("div", { class: "bread" },dymanicItems);
  },
};
</script>

<style lang="less">
.bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 1s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
