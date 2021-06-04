/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Radio, RadioChangeEvent, Select } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

import { changeServiceRequest } from '../../actions/service';
import ResultModal from '../ResultModal';
import { RootState } from '../../reducers';
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

const AssistantModify = () => {
    const dispatch = useDispatch();
    const { myService, changeServiceDone, changeServiceError } = useSelector((state: RootState) => state.service);

    const [showModal, setShowModal] = useState(false);
    const onCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    useEffect(() => {
        if (changeServiceDone || changeServiceError) {
            setShowModal(true);
        }
    }, [changeServiceDone, changeServiceError]);

    // 가능 지역
    const [location, setLocation] = useState(myService.location);
    const onChangeLocation = useCallback((value: string) => {
        setLocation(value);
    }, []);
    // 가능 요일
    const [availableDays, setAvailableDays] = useState<Array<CheckboxValueType>>(myService.availableDays);

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
    const [greetings, onChangeGreetings] = useInput(myService.greetings);

    // 가격
    const [wage, onChangeWage] = useInput(myService.wage);

    // 서비스 소개
    const [description, onChangeDescription] = useInput(myService.description);

    // 계좌 번호
    const [bankAccount, onChangeBankAccount] = useInput(myService.bankAccount);

    // 기관 인증
    const [isAuthorized, setIsAuthorized] = useState(String(myService.isAuthorized));
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
    const [isTrained, setIsTrained] = useState(String(myService.isTrained));
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
    const [isDriver, setIsDriver] = useState(String(myService.isDriver));
    const onChangeIsDriver = useCallback((e: RadioChangeEvent) => {
        setIsDriver(e.target.value);
    }, []);

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

            dispatch(changeServiceRequest(myService._id, data));
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
            myService,
            dispatch,
        ],
    );
    return (
        <Wrapper>
            <Title>어시스턴트 수정</Title>
            <RegisterFormWrapper onSubmit={onSubmit} encType="multipart/form-data">
                <InputWrapper>
                    <span>가능 지역</span>
                    <Select
                        style={{ width: '150px' }}
                        onChange={onChangeLocation}
                        showSearch
                        placeholder="위치 입력"
                        optionFilterProp="children"
                        defaultValue={location}
                    >
                        {SEOULCITY.map((ele) => (
                            <Select.Option key={ele} value={ele}>
                                {ele}
                            </Select.Option>
                        ))}
                    </Select>
                </InputWrapper>
                <InputWrapper>
                    <span>가능 요일</span>
                    <Checkbox.Group
                        options={AVAILABLEDAYS}
                        onChange={onChangeDays}
                        defaultValue={myService.availableDays}
                    />
                </InputWrapper>
                <InputWrapper>
                    <span>프로필</span>
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
                    <span>한줄 소개</span>
                    <input onChange={onChangeGreetings} value={greetings} placeholder="본인을 한줄로 설명해 주세요" />
                </InputWrapper>
                <InputWrapper>
                    <span>가격</span>
                    <input
                        className="shortInput"
                        type="number"
                        value={wage}
                        onChange={onChangeWage}
                        placeholder="시급"
                        step={1000}
                    />
                    원/시간
                </InputWrapper>
                <InputWrapper>
                    <span>서비스 소개</span>
                    <textarea value={description} onChange={onChangeDescription} placeholder="서비스설명" />
                </InputWrapper>
                <InputWrapper>
                    <span>계좌 번호</span>
                    <input value={bankAccount} onChange={onChangeBankAccount} placeholder="계좌번호" />
                </InputWrapper>
                <hr />
                <InputWrapper>
                    <span>기관 인증</span>
                    <Radio.Group onChange={onChangeIsAuthorized} defaultValue={isAuthorized}>
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
                    <Radio.Group onChange={onChangeIsTrained} defaultValue={isTrained}>
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
                    <Radio.Group onChange={onChangeIsDriver} defaultValue={isDriver}>
                        <Radio value="true">가능</Radio>
                        <Radio value="false">불가능</Radio>
                    </Radio.Group>
                </InputWrapper>
                <SubmitBtnWrapper>
                    <SubmitBtn type="submit" className="submitbtn">
                        어시스턴트 수정
                    </SubmitBtn>
                </SubmitBtnWrapper>
            </RegisterFormWrapper>
            {showModal && changeServiceDone && (
                <ResultModal
                    onClose={onCloseModal}
                    title="어시스턴트 정보 수정"
                    message="어시스턴트 정보가 변경되었습니다"
                    redirection="none"
                />
            )}
            {showModal && changeServiceError && (
                <ResultModal
                    onClose={onCloseModal}
                    title="어시스턴트 정보 수정"
                    message="로그인이 필요합니다"
                    redirection="signin"
                />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    // border: 1px solid black;
    max-width: 820px;
`;

const Title = styled.div`
    // border: 1px solid black;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2rem;
`;

export default AssistantModify;
