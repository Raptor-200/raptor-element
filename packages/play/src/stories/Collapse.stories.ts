import type { Meta, StoryObj } from "@storybook/vue3";
import { RaCollapse, RaCollapseItem } from "raptor-element";
import 'raptor-element/dist/theme/Collapse.css';


type Story = StoryObj<typeof RaCollapse>;

const meta: Meta<typeof RaCollapse> = {
  title: "Example/Collapse",
  component: RaCollapse,
  subcomponents: { RaCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      RaCollapse,
      RaCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <ra-collapse v-bind="args">
      <ra-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </ra-collapse-item>
      <ra-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </ra-collapse-item>
      <ra-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </ra-collapse-item>
    </ra-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;