import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ShoppingCartForUsers from './shopping-cart-for-users';

export default {
  title: 'Pages/ShoppingCartForUsers',
  component: ShoppingCartForUsers,
} as ComponentMeta<typeof ShoppingCartForUsers>;

const Template: ComponentStory<typeof ShoppingCartForUsers> = () => <ShoppingCartForUsers/>;

export const ShoppingCartForUsers1 = Template.bind({});

