import React from 'react';

interface Props {
  id: string,
}

export const ArrowSvg = ({ id }: Props) => {
  switch (id) {
    case 'arrow':
      return (
        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.5 3.1875C13.1783 3.1875 3.1875 13.1783 3.1875 25.5C3.1875 37.8217 13.1783 47.8125 25.5 47.8125C37.8217 47.8125 47.8125 37.8217 47.8125 25.5C47.8125 13.1783 37.8217 3.1875 25.5 3.1875ZM25.5 44.0273C15.2701 44.0273 6.97266 35.7299 6.97266 25.5C6.97266 15.2701 15.2701 6.97266 25.5 6.97266C35.7299 6.97266 44.0273 15.2701 44.0273 25.5C44.0273 35.7299 35.7299 44.0273 25.5 44.0273Z" fill="#FF6501" />
          <path d="M18 22.5L26 31L34 22.5" stroke="#FF6501" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <svg></svg>;
  }
};
