import { useCallback, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Navigation from '../../../components/ServiceDetail/Navigation';
import Summary from '../../../components/ServiceDetail/Summary';
import Description from '../../../components/ServiceDetail/Description';
import Review from '../../../components/ServiceDetail/Review';
import { getSingleServiceAction } from '../../../actions/service';
import Loading from '../../../components/Loading';
import FAQ from '../../../components/ServiceDetail/FAQ';
import Refund from '../../../components/ServiceDetail/Refund';

const Global = createGlobalStyle`
    footer {
        padding: 2rem 0;
    }
    .Summary__Wrapper-sc-1wbecrp-0{
      position: sticky;
      top: 0;
      z-index: 10;
    }
`;

const ServiceDetail = () => {
    const IMAGE_URL = process.env.imageURL;
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const { service, review } = useSelector((state) => state.service);
    const dispatch = useDispatch();

    const handleClickServiceDetail = useCallback(() => {
        dispatch(getSingleServiceAction(id));
    }, [id]);

    useEffect(() => {
        if (id) {
            handleClickServiceDetail();
        }
    }, [id]);

    return (
        <>
            {service ? (
                <Layout>
                    <Global />
                    <Wrapper>
                        <Container>
                            <Detail>
                                <CoverImg src={`${IMAGE_URL}${service.images[0]}`} alt="cover images" />
                                <Navigation />
                                <Description service={service} />
                                <Review review={review} />
                                <FAQ />
                                <Refund />
                            </Detail>
                            <Summary service={service} id={id} />
                        </Container>
                    </Wrapper>
                </Layout>
            ) : (
                <Loading />
            )}
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
    margin-bottom: 6rem;
`;
const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const Detail = styled.div`
    flex: 6 1 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const CoverImg = styled.img`
    width: 100%;
    height: 28rem;
    object-fit: cover;
    max-width: 50rem;
`;

export default ServiceDetail;
