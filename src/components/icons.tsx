import type { SVGProps } from 'react';

export const GoldBarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.58 9.085c.34-1.89.03-3.92-.9-5.69a.5.5 0 0 0-.87.49c-.06 1.43-.37 2.83-.92 4.14-.65 1.55-1.55 2.97-2.65 4.2-.4.43-.8.85-1.21 1.25a.5.5 0 0 0 .7.7c1.47-1.47 2.8-3.1 3.96-4.885zm-2.03-6.62a.5.5 0 0 0-.87.49c-.06 1.43-.37 2.83-.92 4.14-.65 1.55-1.55 2.97-2.65 4.2-.4.43-.8.85-1.21 1.25a.5.5 0 0 0 .7.7c1.47-1.47 2.8-3.1 3.96-4.88.33-1.88.02-3.91-.9-5.69z" />
    <path d="M21.8 19.34a.5.5 0 0 0-.4-.4l-5.32-1.33-2.66-5.32a.5.5 0 0 0-.89 0l-2.66 5.32-5.32 1.33a.5.5 0 0 0-.4.4l-1.33 5.32a.5.5 0 0 0 .4.6l5.32 1.33 2.66 5.32a.5.5 0 0 0 .89 0l2.66-5.32 5.32-1.33a.5.5 0 0 0 .4-.6l-1.33-5.32zM14.99 18.2l-1.77 3.54-3.54 1.77-1.77-3.54-3.54-1.77 1.77-3.54 3.54-1.77 1.77 3.54 3.54 1.77z" opacity="0.5"/>
    <path d="M2.5 14.5 14.5 2.5l7 7L9.5 21.5l-7-7zM16 4l-1-1-9 9 1 1 9-9z"/>
  </svg>
);

export const AppLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M3 3v18h18"/>
        <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
)
