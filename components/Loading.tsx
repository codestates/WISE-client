import styled, { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { ReactElement } from 'react';
import Layout from './Layout';

const Global = createGlobalStyle`
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

const Loading = () => (
    <>
        <Head>
            {/* Compiled and minified CSS */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
            />
        </Head>

        <Layout title="WISE | HOME">
            <Global />
            <Wrapper>
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-green-only">
                        <div className="circle-clipper left">
                            <div className="circle" />
                        </div>
                        <div className="gap-patch">
                            <div className="circle" />
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle" />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </Layout>
    </>
);

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 90vh;
`;

export default Loading;
