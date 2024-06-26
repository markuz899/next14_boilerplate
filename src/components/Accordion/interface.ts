export interface FaqItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  options: FaqItem[];
}

export interface AccordionItemProps {
  faq: FaqItem;
  active: boolean;
  onToggle: () => void;
}
