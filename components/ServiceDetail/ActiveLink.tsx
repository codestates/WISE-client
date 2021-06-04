/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { Children } from 'react';

type NavProps = {
    children: any;
    activeClassName: string;
    href: string;
};

const ActiveLink = ({ children, activeClassName, ...props }: NavProps) => {
    const { asPath } = useRouter();
    const child = Children.only(children);
    const childClassName = child.props.className || '';

    const className = asPath === props.href ? `${childClassName} ${activeClassName}`.trim() : childClassName;

    return (
        <Link {...props}>
            {React.cloneElement(child, {
                className: className || null,
            })}
        </Link>
    );
};

export default ActiveLink;
