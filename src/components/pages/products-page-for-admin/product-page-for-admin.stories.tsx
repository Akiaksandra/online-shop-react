import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductsPageForAdmin from '.';

export default {
  title: 'Pages/ProductsPageForAdmin',
  component: ProductsPageForAdmin,
} as ComponentMeta<typeof ProductsPageForAdmin>;

const Template: ComponentStory<typeof ProductsPageForAdmin> = () => <ProductsPageForAdmin/>;

export const ProductsPageForAdmin1 = Template.bind({});

