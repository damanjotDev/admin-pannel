import type { HTMLAttributes } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
    title: string;
    className?: string;
}

// H1
export function TypographyH1({ title, className, ...props }: TypographyProps) {
    return (
        <h1
            className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ${className ?? ''}`}
            {...props}
        >
            {title}
        </h1>
    );
}

// H2
export function TypographyH2({ title, className, ...props }: TypographyProps) {
    return (
        <h2
            className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className ?? ''}`}
            {...props}
        >
            {title}
        </h2>
    );
}

// H3
export function TypographyH3({ title, className, ...props }: TypographyProps) {
    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className ?? ''}`} {...props}>
            {title}
        </h3>
    );
}

// H4
export function TypographyH4({ title, className, ...props }: TypographyProps) {
    return (
        <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className ?? ''}`} {...props}>
            {title}
        </h4>
    );
}

// Paragraph
export function TypographyP({ title, className, ...props }: TypographyProps) {
    return (
        <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className ?? ''}`} {...props}>
            {title}
        </p>
    );
}
