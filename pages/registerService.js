import styled, { createGlobalStyle } from 'styled-components';
import { Form, Input, Button, Checkbox, Radio, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useCallback, useMemo, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';

import useInput from '../hooks/useInput';

const Global = createGlobalStyle`
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

const registerService = () => {
    // 기관 인증 여부
    const [isAuthorized, setIsAuthorized] = useState('');
    const onChangeIsAuthorized = useCallback((e) => {
        setIsAuthorized(e.target.value);
    }, []);

    // 기관 인증 증명 이미지
    const [orgAuth, setOrgAuth] = useState([]);
    const orgAuthInput = useRef();
    const orgAuthUpload = useCallback(() => {
        orgAuthInput.current.click();
    }, [orgAuthInput.current]);
    const onChangeOrgAuth = useCallback((e) => {
        setOrgAuth((prev) => [...prev, ...e.target.files]);
    }, []);

    // 교육 이수 여부
    const [isTrained, setIsTrained] = useState('');
    const onChangeIsTrained = useCallback((e) => {
        setIsTrained(e.target.value);
    }, []);

    // 교육 이수 증명 이미지
    const [trainingCert, setTrainingCert] = useState([]);
    const trainingCertInput = useRef();
    const trainingCertUpload = useCallback(() => {
        trainingCertInput.current.click();
    }, [trainingCertInput.current]);
    const onChangeTrainingCert = useCallback((e) => {
        setTrainingCert((prev) => [...prev, ...e.target.files]);
    }, []);

    // 서비스 제공 이미지
    const [images, setImages] = useState([]);
    const imagesInput = useRef();
    const imagesUpload = useCallback(() => {
        imagesInput.current.click();
    }, [imagesInput.current]);
    const onChangeImages = useCallback((e) => {
        setImages((prev) => [...prev, ...e.target.files]);
    }, []);

    // 서비스 제공 가능 지역
    const [location, setLocation] = useState('');
    const onChangeLocation = useCallback((value) => {
        setLocation(value);
    }, []);

    // 서비스 소개
    const [content, onChangeContent] = useInput('');

    // 시급
    const [wage, onChangeWage] = useInput('');

    // 활동 가능 요일
    const [availableDays, setAvailableDays] = useState([]);
    const availableDaysOptions = useMemo(() => [
        { label: 'mon', value: '월요일' },
        { label: 'tue', value: '화요일' },
        { label: 'wed', value: '수요일' },
        { label: 'thu', value: '목요일' },
        { label: 'fri', value: '금요일' },
        { label: 'sat', value: '토요일' },
        { label: 'sun', value: '일요일' },
    ]);
    const onChangeDays = useCallback((checkedValues) => {
        setAvailableDays(checkedValues);
    }, []);

    // 활동가능 시간대
    const [availableTimes, setAvailableTimes] = useState([]);
    const availableTimesOptions = useMemo(() => [
        { label: 'am', value: '오전' },
        { label: 'pm', value: '오후' },
    ]);
    const onChangeTimes = useCallback((checkedValues) => {
        setAvailableTimes(checkedValues);
    }, []);

    // 한 줄 소개
    const [greeting, onChangeGreeting] = useInput('');

    // 운전 가능 여부
    const [isDriver, setIsDriver] = useState('');
    const onChangeIsDriver = useCallback((e) => {
        setIsDriver(e.target.value);
    }, []);

    // console.log('기관 인증 여부 : ', isAuthorized);
    // console.log('기관 인증 증명 이미지 : ', orgAuth);
    // console.log('교육 이수 여부 : ', isTrained);
    // console.log('교육 이수 증명 이미지 : ', trainingCert);
    // console.log('서비스 제공 이미지 : ', images);
    // console.log('서비스 제공 가능 지역 : ', location);
    // console.log('서비스 소개 : ', content);
    // console.log('요금 : ', wage);
    // console.log('활동 가능 요일 : ', availableDays);
    // console.log('활동 가능 시간대 : ', availableTimes);
    // console.log('한줄 소개 : ', greeting);
    // console.log('운전 가능 여부 : ', isDriver);
    const onSubmit = useCallback(() => {
        console.log('기관 인증 여부 : ', isAuthorized);
        console.log('기관 인증 증명 이미지 : ', orgAuth);
        console.log('교육 이수 여부 : ', isTrained);
        console.log('교육 이수 증명 이미지 : ', trainingCert);
        console.log('서비스 제공 이미지 : ', images);
        console.log('서비스 제공 가능 지역 : ', location);
        console.log('서비스 소개 : ', content);
        console.log('요금 : ', wage);
        console.log('활동 가능 요일 : ', availableDays);
        console.log('활동 가능 시간대 : ', availableTimes);
        console.log('한줄 소개 : ', greeting);
        console.log('운전 가능 여부 : ', isDriver);
    }, []);

    return (
        <Layout title="WISE | SIGNIN">
            <Global />
            <CoverImg src="/images/wise_bg.png" />
            <Modal>
                <Header>어시스턴트 등록</Header>
                <RegisterForm onSubmit={onSubmit}>
                    <Form.Item label="기관 인증 여부" name="isAuthorized" rules={[{ required: true }]}>
                        <Radio.Group onChange={onChangeIsAuthorized}>
                            <Radio value="true">완료</Radio>
                            <Radio value="false">미완료</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="기관 인증 증명 이미지" name="orgAuth">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            ref={orgAuthInput}
                            onChange={onChangeOrgAuth}
                        />
                        <Button icon={<UploadOutlined />} onClick={orgAuthUpload}>
                            Upload
                        </Button>
                    </Form.Item>
                    <Form.Item label="교육 이수  여부" name="isTrained" rules={[{ required: true }]}>
                        <Radio.Group onChange={onChangeIsTrained}>
                            <Radio value="true">완료</Radio>
                            <Radio value="false">미완료</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="교육 이수 증명 이미지" name="trainingCert">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            ref={trainingCertInput}
                            onChange={onChangeTrainingCert}
                        />
                        <Button icon={<UploadOutlined />} onClick={trainingCertUpload}>
                            Upload
                        </Button>
                    </Form.Item>
                    <Form.Item label="서비스 제공 이미지" name="images" rules={[{ required: true }]}>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            ref={imagesInput}
                            onChange={onChangeImages}
                        />
                        <Button icon={<UploadOutlined />} onClick={imagesUpload}>
                            Upload
                        </Button>
                    </Form.Item>
                    <Form.Item label="서비스 제공 가능 지역" name="location" rules={[{ required: true }]}>
                        <Select
                            onChange={onChangeLocation}
                            showSearch
                            style={{ width: 150 }}
                            placeholder="위치 입력"
                            optionFilterProp="children"
                        >
                            <Select.Option value="seoul">서울</Select.Option>
                            <Select.Option value="gyeonggi">경기</Select.Option>
                            <Select.Option value="incheon">인천</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="서비스소개" name="content" rules={[{ required: true }]}>
                        <TextArea onChange={onChangeContent} placeholder="서비스설명" />
                    </Form.Item>
                    <Form.Item label="요금" name="wage" rules={[{ required: true }]}>
                        <Input
                            type="number"
                            onChange={onChangeWage}
                            placeholder="서비스 시급"
                            style={{ width: '8rem' }}
                        />
                        /시간
                    </Form.Item>
                    <Form.Item label="활동가능요일" name="availableDays" rules={[{ required: true }]}>
                        <Checkbox.Group options={availableDaysOptions} onChange={onChangeDays} />
                    </Form.Item>
                    <Form.Item label="활동가능시간대" name="availableTimes" rules={[{ required: true }]}>
                        <Checkbox.Group options={availableTimesOptions} onChange={onChangeTimes} />
                    </Form.Item>
                    <Form.Item label="한줄소개" name="greeting" rules={[{ required: true }]}>
                        <Input onChange={onChangeGreeting} placeholder="서비스 한줄 소개" />
                    </Form.Item>
                    <Form.Item label="운전 가능 여부" name="isDriver" rules={[{ required: true }]}>
                        <Radio.Group onChange={onChangeIsDriver}>
                            <Radio value="true">가능</Radio>
                            <Radio value="false">불가능</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <SubmitBtn type="submit" className="submitbtn">
                            어시스턴트 등록
                        </SubmitBtn>
                    </Form.Item>
                </RegisterForm>
            </Modal>
        </Layout>
    );
};

const SubmitBtn = styled.button`
    border: none;
    font-weight: 600;
    height: 3rem;
    background-color: #68d480;
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 10rem;
`;

const RegisterForm = styled(Form)`
    // border: 1px solid black;
    margin-top: 1rem;
    display:flex
    padding: 0 3rem;
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
    width: 45rem;
    border-radius: 2rem;
    padding: 1rem 2rem 0 2rem;
    z-index: 500;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
`;

const Header = styled.div`
    // border: 1px solid black;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bolder;
`;

export default registerService;
