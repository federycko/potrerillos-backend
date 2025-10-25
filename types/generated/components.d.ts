import type { Schema, Struct } from '@strapi/strapi';

export interface InformationFaq extends Struct.ComponentSchema {
  collectionName: 'components_information_faqs';
  info: {
    description: 'Question and answer for the FAQ section';
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'information.faq': InformationFaq;
    }
  }
}
