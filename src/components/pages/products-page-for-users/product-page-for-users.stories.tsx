import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductsPageForUsers from '.';

export default {
  title: 'Pages/ProductsPageForUsers',
  component: ProductsPageForUsers,
} as ComponentMeta<typeof ProductsPageForUsers>;

const Template: ComponentStory<typeof ProductsPageForUsers> = () => <ProductsPageForUsers/>;

export const ProductsPageForUsers1 = Template.bind({});

