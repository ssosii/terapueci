import { h, render } from 'preact';

export const Icon = ({ isVisible }) => (
    <svg style={{ opacity: isVisible ? 1 : 0,marginRight:5 }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M6.74914 12.1279L3.62164 9.00037L2.55664 10.0579L6.74914 14.2504L15.7491 5.25037L14.6916 4.19287L6.74914 12.1279Z" fill="#0A2100" />
    </svg>
)
