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

  it("should has the correct native type attribute when native-type prop is set", () => {
    const wrapper = mount(Button, {
      props: { nativeType: "submit" },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect((wrapper.element as any).type).toBe("submit");
  });

  // Props: tag
  it("should renders the custom tag when tag prop is set", () => {
    const wrapper = mount(Button, {
      props: { tag: "a" },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
  });

  // Events: click
  it("should emits a click event when the button is clicked", async () => {
    const wrapper = mount(Button, {});

    // 确保按钮存在
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true) // 先验证元素存在

    await wrapper.trigger("click");
    expect(wrapper.emitted().click).toHaveLength(1);
  });
});