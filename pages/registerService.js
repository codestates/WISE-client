import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import Layout from '../components/Layout';

const Global = createGlobalStyle`
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

const registerService = () => {
    return (
        <Layout title="WISE | SIGNIN">
            <Global />
            <CoverImg src="/images/wise_bg.png" />
            <Modal>
                <Header>어시스턴트 등록</Header>
                <RegisterForm>
                    <div>기관 인증 증명 사진</div>
                    <div>기관 인증 여부</div>
                    <div>교육 이수 증명 사진</div>
                    <div>교육 이수 여부</div>
                    <div>서비스 제공 이미지</div>
                    <div>서비스 제공 가능 지역</div>
                    <div>서비스 설명</div>
                    <TextArea>hi</TextArea>
                    <div>서비스 시급</div>
                    <div>서비스 제공 가능 요일</div>
                    <div>서비스 제공 가능 시간대</div>
                    <div>서비스 한줄 소개</div>
                    <div>운전 가능 여부</div>
                </RegisterForm>
            </Modal>
        </Layout>
    );
};

const RegisterForm = styled.form`
    border: 1px solid black;
    margin-top: 2rem;
`;

const CoverImg = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    top: 0;
    z-index: -50;
`;

const Modal = styled.div`
    // border: 1px solid gray;
    background: white;
    width: 30rem;
    height: 50rem;
    border-radius: 2rem;
    padding: 2rem 2rem 2rem 2rem;
    z-index: 500;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
`;

const Header = styled.div`
    // border: 1px solid black;
    font-size: 2rem;
    font-weight: bolder;
`;

export default registerService;
