/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Radio, RadioChangeEvent, Select } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import Router from 'next/router';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

import { RootState } from '../../reducers';
import { addServiceRequest } from '../../actions/service';
import {
    RegisterFormWrapper,
    InputWrapper,
    ProfileImagesWrapper,
    DeleteBtn,
    ImagesWrapper,
    SubmitBtnWrapper,
    SubmitBtn,
    Image,
} from '../style/style';
import { AVAILABLEDAYS, SEOULCITY } from '../../utils/data';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { addServiceDone } = useSelector((state: RootState) => state.service);
    // 가능 지역
    const [location, setLocation] = useState('');
    const onChangeLocation = useCallback((value: string) => {
        setLocation(value);
    }, []);
    // 가능 요일
    const [availableDays, setAvailableDays] = useState<Array<CheckboxValueType>>([]);

    const onChangeDays = useCallback((checkedValues: CheckboxValueType[]) => {
        setAvailableDays(checkedValues);
    }, []);

    // 프로필 이미지
    const [images, setImages] = useState<File[]>([]);
    const imagesInput = useRef<HTMLInputElement>(null);
    const imagesUpload = useCallback(() => {
        if (!imagesInput.current) return;
        imagesInput.current.click();
    }, [imagesInput]);
    const onChangeImages = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setImages((prev: File[]) => [...prev, ...Array.from(e.target.files!)]);
    }, []);
    const removeImage = useCallback(
        (name: string) => {
            const newImages = images.filter((v) => v.name !== name);
            setImages(newImages);
        },
        [images],
    );
    // 한 줄 소개
    const [greetings, onChangeGreetings] = useInput('');

    // 가격
    const [wage, onChangeWage] = useInput('');

    // 서비스 소개
    const [description, onChangeDescription] = useInput('');

    // 계좌 번호
    const [bankAccount, onChangeBankAccount] = useInput('');

    // 기관 인증
    const [isAuthorized, setIsAuthorized] = useState('');
    const onChangeIsAuthorized = useCallback((e: RadioChangeEvent) => {
        setIsAuthorized(e.target.value);
    }, []);

    // 기관 인증 증명 이미지
    const [orgAuth, setOrgAuth] = useState<File[]>([]);
    const orgAuthInput = useRef<HTMLInputElement>(null);
    const orgAuthUpload = useCallback(() => {
        if (!orgAuthInput.current) return;
        orgAuthInput.current.click();
    }, [orgAuthInput]);
    const onChangeOrgAuth = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setOrgAuth((prev) => [...prev, ...Array.from(e.target.files!)]);
    }, []);
    const removeOrgAuthImage = useCallback(
        (name: string) => {
            const newImages: File[] = orgAuth.filter((v) => v.name !== name);
            setOrgAuth(newImages);
        },
        [orgAuth],
    );

    // 교육 이수
    const [isTrained, setIsTrained] = useState('');
    const onChangeIsTrained = useCallback((e: RadioChangeEvent) => {
        setIsTrained(e.target.value);
    }, []);

    // 교육 이수 증명 이미지
    const [trainingCert, setTrainingCert] = useState<File[]>([]);
    const trainingCertInput = useRef<HTMLInputElement>(null);
    const trainingCertUpload = useCallback(() => {
        if (!trainingCertInput.current) return;
        trainingCertInput.current.click();
    }, [trainingCertInput]);
    const onChangeTrainingCert = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTrainingCert((prev) => [...prev, ...Array.from(e.target.files!)]);
    }, []);
    const removeTrainingCertImage = useCallback(
        (name: string) => {
            const newImages = trainingCert.filter((v) => v.name !== name);
            setTrainingCert(newImages);
        },
        [trainingCert],
    );

    // 운전 여부
    const [isDriver, setIsDriver] = useState('');
    const onChangeIsDriver = useCallback((e: RadioChangeEvent) => {
        setIsDriver(e.target.value);
    }, []);

    useEffect(() => {
        if (addServiceDone) {
            Router.replace('/home');
        }
    }, [addServiceDone]);

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // string or blob 만 가능
            // 이미지는 배열로 전송, 객체는 JSON으로 전송
            const data = new FormData();
            data.append('location', location);
            data.append('greetings', greetings);
            data.append('description', description);
            data.append('bankAccount', bankAccount);
            data.append('wage', wage);
            data.append('isAuthorized', isAuthorized);
            data.append('isTrained', isTrained);
            data.append('isDriver', isDriver);
            images.map((v) => data.append('images', v));
            orgAuth.map((v) => data.append('orgAuth', v));
            trainingCert.map((v) => data.append('trainingCert', v));
            availableDays.map((v) => data.append('availableDays', v as string));

            dispatch(addServiceRequest(data));
        },
        [
            location,
            availableDays,
            images,
            greetings,
            wage,
            description,
            bankAccount,
            isAuthorized,
            orgAuth,
            isTrained,
            trainingCert,
            isDriver,
            dispatch,
        ],
    );
    return (
        <Wrapper>
            <RegisterFormWrapper onSubmit={onSubmit} encType="multipart/form-data">
                <InputWrapper>
                    <span>✅가능 지역</span>
                    <Select
                        style={{ width: '150px' }}
                        onChange={onChangeLocation}
                        showSearch
                        placeholder="위치 입력"
                        optionFilterProp="children"
                    >
                        {SEOULCITY.map((ele) => (
                            <Select.Option key={ele} value={ele}>
                                {ele}
                            </Select.Option>
                        ))}
                    </Select>
                </InputWrapper>
                <InputWrapper>
                    <span>✅가능 요일</span>
                    <Checkbox.Group options={AVAILABLEDAYS} onChange={onChangeDays} />
                </InputWrapper>
                <InputWrapper>
                    <span>✅프로필</span>
                    <input type="file" accept="image/*" multiple hidden ref={imagesInput} onChange={onChangeImages} />
                    <Button icon={<UploadOutlined />} onClick={imagesUpload}>
                        Upload
                    </Button>
                </InputWrapper>
                <ProfileImagesWrapper>
                    {images.map((ele) => (
                        <div key={ele.name}>
                            <Image src={URL.createObjectURL(ele)} alt="profile" />
                            <DeleteBtn type="button" onClick={() => removeImage(ele.name)}>
                                <CloseOutlined />
                            </DeleteBtn>
                        </div>
                    ))}
                </ProfileImagesWrapper>
                <InputWrapper>
                    <span>✅한줄 소개</span>
                    <input onChange={onChangeGreetings} placeholder="본인을 한줄로 설명해 주세요" required />
                </InputWrapper>
                <InputWrapper>
                    <span>✅가격</span>
                    <input type="number" onChange={onChangeWage} placeholder="시급" step={1000} required />
                    원/시간
                </InputWrapper>
                <InputWrapper>
                    <span>✅서비스 소개</span>
                    <textarea onChange={onChangeDescription} placeholder="서비스설명" required />
                </InputWrapper>
                <InputWrapper>
                    <span>✅계좌 번호</span>
                    <input onChange={onChangeBankAccount} placeholder="계좌번호" required />
                </InputWrapper>
                <hr />
                <InputWrapper>
                    <span>기관 인증</span>
                    <Radio.Group onChange={onChangeIsAuthorized}>
                        <Radio value="true">완료</Radio>
                        <Radio value="false">미완료</Radio>
                    </Radio.Group>
                </InputWrapper>
                <InputWrapper>
                    <span>기관 인증 증명 이미지</span>
                    <input type="file" accept="image/*" multiple hidden ref={orgAuthInput} onChange={onChangeOrgAuth} />
                    <Button icon={<UploadOutlined />} onClick={orgAuthUpload}>
                        Upload
                    </Button>
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
                </InputWrapper>
                <InputWrapper>
                    <span>교육 이수</span>
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
                </InputWrapper>
                <InputWrapper>
                    <span>운전 여부</span>
                    <Radio.Group onChange={onChangeIsDriver}>
                        <Radio value="true">가능</Radio>
                        <Radio value="false">불가능</Radio>
                    </Radio.Group>
                </InputWrapper>
                <SubmitBtnWrapper>
                    <SubmitBtn type="submit" className="submitbtn">
                        어시스턴트 등록
                    </SubmitBtn>
                </SubmitBtnWrapper>
            </RegisterFormWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    max-width: 830px;
    position: relative;
`;

export default RegisterForm;
