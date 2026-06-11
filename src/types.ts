/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  numericalId: string;
  name: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
  sizes: string[];
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  imageUrl: string;
  description: string;
}

export interface JournalPost {
  id: string;
  tag: string;
  title: string;
  date: string;
  readTime: string;
  imageUrl: string;
}
