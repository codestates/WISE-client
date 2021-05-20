import styled, { createGlobalStyle } from 'styled-components';
import { Button, Checkbox, Radio, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useCallback, useMemo, useRef, useState } from 'react';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
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
    const removeOrgAuthImage = useCallback((name) => {
        const newImages = orgAuth.filter((v) => v.name !== name);
        setOrgAuth(newImages);
    });

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
    const removeTrainingCertImage = useCallback((name) => {
        const newImages = trainingCert.filter((v) => v.name !== name);
        setTrainingCert(newImages);
    });

    // 서비스 제공 이미지
    const [images, setImages] = useState([]);
    const imagesInput = useRef();
    const imagesUpload = useCallback(() => {
        imagesInput.current.click();
    }, [imagesInput.current]);
    const onChangeImages = useCallback((e) => {
        setImages((prev) => [...prev, ...e.target.files]);
    }, []);
    const removeImage = useCallback((name) => {
        const newImages = images.filter((v) => v.name !== name);
        setImages(newImages);
    });

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

    // 한 줄 소개
    const [greeting, onChangeGreeting] = useInput('');

    // 운전 가능 여부
    const [isDriver, setIsDriver] = useState('');
    const onChangeIsDriver = useCallback((e) => {
        setIsDriver(e.target.value);
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('기관 인증 여부 : ', isAuthorized);
        console.log('기관 인증 증명 이미지 : ', orgAuth);
        console.log('교육 이수 여부 : ', isTrained);
        console.log('교육 이수 증명 이미지 : ', trainingCert);
        console.log('서비스 제공 이미지 : ', images);
        console.log('서비스 제공 가능 지역 : ', location);
        console.log('서비스 소개 : ', content);
        console.log('요금 : ', wage);
        console.log('활동 가능 요일 : ', availableDays);
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
                    <InputWrapper>
                        <span>기관 인증 여부</span>
                        <Radio.Group onChange={onChangeIsAuthorized}>
                            <Radio value="true">완료</Radio>
                            <Radio value="false">미완료</Radio>
                        </Radio.Group>
                    </InputWrapper>
                    <InputWrapper>
                        <span>기관 인증 증명 이미지</span>
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
                    </InputWrapper>
                    <ImagesWrapper>
                        {orgAuth.map((ele) => (
                            <div key={ele.name}>
                                {ele.name}
                                <DeleteBtn type="button" onClick={() => removeOrgAuthImage(ele.name)}>
                                    <CloseOutlined />
                                </DeleteBtn>
                            </div>
                        ))}
                    </ImagesWrapper>
                    <InputWrapper>
                        <span>교육 이수 여부</span>
                        <Radio.Group onChange={onChangeIsTrained}>
                            <Radio value="true">완료</Radio>
                            <Radio value="false">미완료</Radio>
                        </Radio.Group>
                    </InputWrapper>
                    <InputWrapper>
                        <span>교육 이수 증명 이미지</span>
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
                    </InputWrapper>
                    <ImagesWrapper>
                        {trainingCert.map((ele) => (
                            <div key={ele.name}>
                                {ele.name}
                                <DeleteBtn type="button" onClick={() => removeTrainingCertImage(ele.name)}>
                                    <CloseOutlined />
                                </DeleteBtn>
                            </div>
                        ))}
                    </ImagesWrapper>
                    <InputWrapper>
                        <span>서비스 제공 이미지</span>
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
                    </InputWrapper>
                    <ImagesWrapper>
                        {images.map((ele) => (
                            <div key={ele.name}>
                                <Image src={URL.createObjectURL(ele)} alt="dlalwl" />
                                <DeleteBtn type="button" onClick={() => removeImage(ele.name)}>
                                    <CloseOutlined />
                                </DeleteBtn>
                            </div>
                        ))}
                    </ImagesWrapper>
                    <InputWrapper>
                        <span>서비스 제공 가능 지역</span>
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
                    </InputWrapper>
                    <InputWrapper>
                        <span>서비스소개</span>
                        <textarea
                            onChange={onChangeContent}
                            placeholder="서비스설명"
                            style={{ width: '35rem' }}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <span>요금</span>
                        <input
                            type="number"
                            onChange={onChangeWage}
                            placeholder="서비스 시급"
                            style={{ width: '8rem' }}
                            required
                        />
                        /시간
                    </InputWrapper>
                    <InputWrapper>
                        <span>활동가능요일</span>
                        <Checkbox.Group options={availableDaysOptions} onChange={onChangeDays} />
                    </InputWrapper>
                    <InputWrapper>
                        <span>한줄소개</span>
                        <input
                            onChange={onChangeGreeting}
                            placeholder="서비스 한줄 소개"
                            style={{ width: '35rem' }}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <span>운전 가능 여부</span>
                        <Radio.Group onChange={onChangeIsDriver}>
                            <Radio value="true">가능</Radio>
                            <Radio value="false">불가능</Radio>
                        </Radio.Group>
                    </InputWrapper>
                    <InputWrapper>
                        <SubmitBtn type="submit" className="submitbtn">
                            어시스턴트 등록
                        </SubmitBtn>
                    </InputWrapper>
                </RegisterForm>
            </Modal>
        </Layout>
    );
};

const Image = styled.img`
    max-width: 22rem;
    max-height: 14rem;
`;

const ImagesWrapper = styled.div`
    // border: 1px solid gray;
    color: #777;
    font-size: 1rem;
    // height: 9.375rem;
    padding: 0.625rem;
`;

const DeleteBtn = styled.button`
    border: none;
    background: none;
    margin-left: 5px;
    cursor: pointer;
    font-size: 1rem;
`;

const InputWrapper = styled.div`
    display: flex;
    & > span:first-child {
        margin-right: 1rem;
    }
    input {
        border: 1px solid #e5e5e5;
        // padding: 0.5rem;
        border-radius: 0.5rem;
    }
    input:focus {
        outline: none;
    }
    margin-bottom: 1.5rem;
    position: relative;
`;

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

const RegisterForm = styled.form`
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
    margin-top: 2rem;
    z-index: 500;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
    // height: 90vh;
`;

const Header = styled.div`
    // border: 1px solid black;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bolder;
`;

export default registerService;
