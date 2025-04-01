import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { fn, within, userEvent, expect, clearAllMocks } from "@storybook/test";
import { set } from "lodash-es";

import { RaButton } from "raptor-element";



type Story = StoryObj<typeof RaButton> & { argTypes?: ArgTypes };

const meta: Meta<typeof RaButton> = {
  title: "Example/Button",
  component: RaButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
  args: { onClick: fn() },
};


const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    type: "primary",
    content: "Button",
  },
  render: (args) => ({
    components: { RaButton },
    setup() {
      return { args };
    },
    template: container(
      `<ra-button data-testid="story-test-btn" v-bind="args">{{args.content}}</ra-button>`
    ),
  }),

  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByTestId("story-test-btn");

    await step("When useThrttle is set to true,the onClick should be called once", async () => {
      set(args, "useThrottle", true);
      await userEvent.tripleClick(btn);

      expect(args.onClick).toHaveBeenCalledOnce();
      clearAllMocks();
    });

    await step("When useThrttle is set to false,the onClick should be called three times", async () => {
      set(args, "useThrottle", false);
      await userEvent.tripleClick(btn);

      expect(args.onClick).toHaveBeenCalledTimes(3);
      clearAllMocks();
    });

    await step("When disabled is set to true,the onClick should not be called", async () => {
      set(args, "disabled", true);
      await userEvent.click(btn);

      expect(args.onClick).toHaveBeenCalledTimes(0);
      set(args, "disabled", false);
      clearAllMocks();
    });

    await step("When loading is set to true,the onClick should not be called", async () => {
      set(args, "loading", true);
      await userEvent.click(btn);

      expect(args.onClick).toHaveBeenCalledTimes(0);
      set(args, "loading", false);
      clearAllMocks();
    });

  },
};


export const Autofocus: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },

  args: {
    content: "Button",
    autofocus: true,
  },

  render: (args) => ({
    components: { RaButton },
    setup() {
      return { args };
    },
    template: container(
      `
      <p> 请点击浏览器的刷新页面来获取按钮聚焦</p>
      <ra-button data-testid="story-test-btn" v-bind="args">{{args.content}}</ra-button>
      `
    ),
  }),

  play: async ({ args }) => {
    await userEvent.keyboard("{enter}");

    expect(args.onClick).toHaveBeenCalledOnce();
    clearAllMocks();
  },
};

export const Circle: Story = {
  args: {
    icon: "search",
  },
  render: (args) => ({
    components: { RaButton },
    setup() {
      return { args };
    },
    template: container(`
      <ra-button circle v-bind="args"/>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};
export default meta;