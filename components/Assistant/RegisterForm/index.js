import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Radio, Select } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import useInput from '../../../hooks/useInput';
import { registerServiceRequestAction } from '../../../reducers/user';
import {
    ProfileImagesWrapper,
    Image,
    SubmitBtnWrapper,
    ImagesWrapper,
    DeleteBtn,
    InputWrapper,
    SubmitBtn,
    RegisterFormWrapper,
} from './styles';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.user);

    // 가능 지역
    const [location, setLocation] = useState('');
    const onChangeLocation = useCallback((value) => {
        setLocation(value);
    }, []);
    // 가능 요일
    const [availableDays, setAvailableDays] = useState([]);
    const availableDaysOptions = useMemo(() => [
        { label: '월 오전', value: 'Monday am' },
        { label: '화 오전', value: 'Tuesday am' },
        { label: '수 오전', value: 'Wednesday am' },
        { label: '목 오전', value: 'Thursday am' },
        { label: '금 오전', value: 'Friday am' },
        { label: '토 오전', value: 'Saturday am' },
        { label: '일 오전', value: 'Sunday am' },
        { label: '월 오후', value: 'Monday pm' },
        { label: '화 오후', value: 'Tuesday pm' },
        { label: '수 오후', value: 'Wednesday pm' },
        { label: '목 오후', value: 'Thursday pm' },
        { label: '금 오후', value: 'Friday pm' },
        { label: '토 오후', value: 'Saturday pm' },
        { label: '일 오후', value: 'Sunday pm' },
    ]);
    const onChangeDays = useCallback((checkedValues) => {
        setAvailableDays(checkedValues);
    }, []);

    // 프로필 이미지
    const [images, setImages] = useState([]);
    const imagesInput = useRef();
    const imagesUpload = useCallback(() => {
        imagesInput.current.click();
    }, [imagesInput.current]);
    const onChangeImages = useCallback((e) => {
        setImages((prev) => [...prev, ...e.target.files]);
    }, []);
    const removeImage = useCallback(
        (name) => {
            const newImages = images.filter((v) => v.name !== name);
            setImages(newImages);
        },
        [images],
    );
    // 한 줄 소개
    const [greeting, onChangeGreeting] = useInput('');

    // 가격
    const [wage, onChangeWage] = useInput('');

    // 서비스 소개
    const [description, onChangeDescription] = useInput('');

    // 기관 인증
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

    // 교육 이수
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

    // 운전 여부
    const [isDriver, setIsDriver] = useState('');
    const onChangeIsDriver = useCallback((e) => {
        setIsDriver(e.target.value);
    }, []);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            const data = new FormData();
            data.append('orgAuth', orgAuth);
            data.append('isAuthorized', Boolean(isAuthorized));
            data.append('trainingCert', trainingCert);
            data.append('isTrained', Boolean(isTrained));
            images.forEach((v) => {
                data.append('images', v);
            });
            data.append('location', location);
            data.append('description', description);
            data.append('wage', Number(wage));
            data.append('availableDays', availableDays);
            data.append('greetings', greeting);
            data.append('isDriver', Boolean(isDriver));
            dispatch(registerServiceRequestAction(data, accessToken));
        },
        [
            location,
            availableDays,
            images,
            greeting,
            wage,
            description,
            isAuthorized,
            orgAuth,
            isTrained,
            trainingCert,
            isDriver,
        ],
    );
    return (
        <RegisterFormWrapper onSubmit={onSubmit} encType="multipart/form-data">
            <InputWrapper>
                <span>✅가능 지역</span>
                <Select onChange={onChangeLocation} showSearch placeholder="위치 입력" optionFilterProp="children">
                    <Select.Option value="seoul">서울</Select.Option>
                    <Select.Option value="gyeonggi">경기</Select.Option>
                    <Select.Option value="incheon">인천</Select.Option>
                </Select>
            </InputWrapper>
            <InputWrapper>
                <span>✅가능 요일</span>
                <Checkbox.Group options={availableDaysOptions} onChange={onChangeDays} />
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
                <input onChange={onChangeGreeting} placeholder="본인을 한줄로 설명해 주세요" required />
            </InputWrapper>
            <InputWrapper>
                <span>✅가격</span>
                <input type="number" onChange={onChangeWage} placeholder="시급" required />
                /시간
            </InputWrapper>
            <InputWrapper>
                <span>✅서비스 소개</span>
                <textarea onChange={onChangeDescription} placeholder="서비스설명" required />
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
    );
};

export default RegisterForm;
