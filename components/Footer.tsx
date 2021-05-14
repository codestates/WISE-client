import React, { ReactElement } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const FooterComponent = (): ReactElement => (
    <>
        <Footer>
            <div>Contact Us</div>
            <div>
                <Link href="https://github.com/codestates/WISE-client">
                    <a>Github</a>
                </Link>
            </div>
        </Footer>
    </>
);

const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 8rem;
    background-color: #222;
    color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
`;

export default FooterComponent;
