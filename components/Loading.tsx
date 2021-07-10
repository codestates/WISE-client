import styled, { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import React from 'react';
import Layout from '../layout/Layout';

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
            <>
                <Global />
                <Wrapper>
                    <div className="progress">
                        <div className="indeterminate" />
                    </div>
                </Wrapper>
            </>
        </Layout>
    </>
);

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    width: 25vw;
    div.progress {
        background-color: rgba(104, 212, 127, 0.5);
    }
    .progress .indeterminate {
        background-color: rgb(104, 212, 127);
    }
`;

export default Loading;
