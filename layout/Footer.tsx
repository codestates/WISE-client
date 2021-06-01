import Link from 'next/link';
import styled from 'styled-components';

const FooterComponent = () => (
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
    width: 100%;
    padding: 2rem 0;
`;

export default FooterComponent;
