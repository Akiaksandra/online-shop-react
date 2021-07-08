import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CartForm from './cart-form';

export default {
  title: 'Components/CartForm',
  component: CartForm,
} as ComponentMeta<typeof CartForm>;

const Template: ComponentStory<typeof CartForm> = (args) => <CartForm {...args}/>;

export const CartForm1 = Template.bind({});

