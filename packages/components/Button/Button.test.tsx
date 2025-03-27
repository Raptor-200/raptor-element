//it 和test理解：功能上是一样的，语义上不同。it是测试用例，test是测试套件。
//it详细的表现，test大的功能点。
//it和test的区别：it可以嵌套test，test不能嵌套it  。
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Button from "./Button.vue";

describe("Button.vue", () => {
  // Props: type
  it("should has the correct type class when type prop is set", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as any },
      });
      expect(wrapper.classes()).toContain(`ra-button--${type}`);
    });
  });

  // Props: size
  it("should has the correct size class when size prop is set", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any },
      });
      expect(wrapper.classes()).toContain(`ra-button--${size}`);
    });
  });
  // 测试布尔类型属性：验证传入 plain/round/circle 等属性时对应的修饰类
  // Props: plain, round, circle
  it.each([
    ["plain", "is-plain"],
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"],
    ["loading", "is-loading"],
  ])(
    "should has the correct class when prop %s is set to true",
    (prop, className) => {
      const wrapper = mount(Button, {
        props: { [prop]: true },
        global: {
          stubs: ["RaIcon"],
        },
      });
      expect(wrapper.classes()).toContain(className);
    }
  );

  // 测试原生 type 属性：验证按钮的 HTML type 属性是否正确设置
  it("should has the correct native type attribute when native-type prop is set", () => {
    const wrapper = mount(Button, {
      props: { nativeType: "submit" },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect((wrapper.element as any).type).toBe("submit");
  });
  // 测试 tag 属性：验证组件根元素能否正确渲染为指定标签
  // Props: tag
  it("should renders the custom tag when tag prop is set", () => {
    const wrapper = mount(Button, {
      props: { tag: "a" },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
  });
  // 测试点击事件：验证按钮点击时能否正确触发 click 事件
  // Events: click
  it("should emits a click event when the button is clicked", async () => {
    const wrapper = mount(Button, {});



    await wrapper.trigger("click");
    expect(wrapper.emitted().click).toHaveLength(1);
  });
});