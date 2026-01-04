import type { SVGProps } from 'react';

export const GoldBarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2.5 14.5 14.5 2.5l7 7L9.5 21.5l-7-7zM16 4l-1-1-9 9 1 1 9-9z"/>
    <path d="M7.5 10.5l-5 5" />
    <path d="M10.5 13.5l-5 5" />
    <path d="M13.5 16.5l-5 5" />

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
        <path d="m12 1.5-8.5 8.5h4v11h9v-11h4z"/>
    </svg>
)
