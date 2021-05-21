import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import Layout from '../../components/Layout';
import PaymentResult from '../../components/PaymentResult';
import { loadMyInfo, LOG_IN_SUCCESS } from '../../reducers/user';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
    .fxIoCz {
        height: 100%;
        display: flex;
        justify-content: center;
    }
`;

const Payment = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch({
                type: LOG_IN_SUCCESS,
            });
            dispatch(loadMyInfo());
        }
    }, []);
    const router = useRouter();
    const result = router.query;
    console.log(result);

    return (
        <Layout>
            <Global />
            <PaymentResult result={result} />
        </Layout>
    );
};

export default Payment;
