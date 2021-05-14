import styled, { createGlobalStyle } from 'styled-components';
import Layout from '../components/Layout';
import AssistantInfo from '../components/AssistantInfo';
import OrderItem from '../components/orderItem';

const Global = createGlobalStyle`
    /* .dCaWGQ  {
        position: static;
    } */
`;

const Order = (): JSX.Element => (
    <Layout>
        <Global />
        <Wrapper>
            <OrderItem />
            <AssistantInfo />
        </Wrapper>
    </Layout>
);

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3rem;
`;

export default Order;
