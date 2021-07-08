import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ButtonComponent from '.';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    text: { control: 'text' },
    variant: {options: ["contained", "outlined"], control: { type: 'select' }},
    color: {options:  ["primary","secondary"], control: { type: 'select' }},
    type: {options: ["submit", "reset"], control: { type: 'select' }} ,
    disabled: { control: 'boolean' },
  },
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => <ButtonComponent {...args} />;

export const Buttons = Template.bind({});
Buttons.args = {
  text: "Main Button",
  variant: "contained",
  color: "primary",
  type: "submit",
  disabled: false,
};
