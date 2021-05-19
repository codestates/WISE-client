import styled, { createGlobalStyle } from 'styled-components';
import { Form, Input, Button, Checkbox, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useMemo, useState } from 'react';
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
    const [availableDays, setAvailableDays] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [value, onChangeValue] = useInput('');
    const availableDaysOptions = useMemo(() => [
        { label: 'mon', value: '월요일' },
        { label: 'tue', value: '화요일' },
        { label: 'wed', value: '수요일' },
        { label: 'thu', value: '목요일' },
        { label: 'fri', value: '금요일' },
        { label: 'sat', value: '토요일' },
        { label: 'sun', value: '일요일' },
    ]);
    const availableTimesOptions = useMemo(() => [
        { label: 'am', value: '오전' },
        { label: 'pm', value: '오후' },
    ]);
    const onChangeDays = (checkedValues) => {
        setAvailableDays(checkedValues);
    };
    const onChangeTimes = (checkedValues) => {
        setAvailableTimes(checkedValues);
    };
    return (
        <Layout title="WISE | SIGNIN">
            <Global />
            <CoverImg src="/images/wise_bg.png" />
            <Modal>
                <Header>어시스턴트 등록</Header>
                <RegisterForm>
                    <Form.Item label="기관 인증 여부" name="isAuthorized" rules={[{ required: true }]}>
                        <Radio.Group onChange={onChangeValue} value={value}>
                            <Radio value="true">완료</Radio>
                            <Radio value="false">미완료</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="기관 인증 증명 이미지" name="orgAuth">
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Form.Item>
                    <Form.Item label="교육 이수  여부" name="isTrained" rules={[{ required: true }]}>
                        <Radio.Group onChange={onChangeValue} value={value}>
                            <Radio value="true">완료</Radio>
                            <Radio value="false">미완료</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="교육 이수 증명 이미지" name="trainingCert">
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Form.Item>
                    <Form.Item label="서비스 제공 이미지" name="images">
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Form.Item>
                    <div>서비스 제공 가능 지역</div>
                    <Form.Item label="content" name="content" rules={[{ required: true }]}>
                        <TextArea placeholder="서비스설명" />
                    </Form.Item>
                    <Form.Item label="wage" name="wage" rules={[{ required: true }]}>
                        <Input placeholder="서비스 시급" style={{ width: '8rem' }} />
                        /시간
                    </Form.Item>
                    <Form.Item label="availableDays" name="availableDays" rules={[{ required: true }]}>
                        <Checkbox.Group options={availableDaysOptions} onChange={onChangeDays} />
                    </Form.Item>
                    <Form.Item label="availableTimes" name="availableTimes" rules={[{ required: true }]}>
                        <Checkbox.Group options={availableTimesOptions} onChange={onChangeTimes} />
                    </Form.Item>
                    <Form.Item label="greeting" name="greeting" rules={[{ required: true }]}>
                        <Input placeholder="서비스 한줄 소개" />
                    </Form.Item>
                    <Form.Item label="운전 가능 여부" name="isDriver" rules={[{ required: true }]}>
                        <Radio.Group onChange={onChangeValue} value={value}>
                            <Radio value="true">가능</Radio>
                            <Radio value="false">불가능</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Submit</Button>
                    </Form.Item>
                </RegisterForm>
            </Modal>
        </Layout>
    );
};

const RegisterForm = styled(Form)`
    border: 1px solid black;
    margin-top: 2rem;
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
    width: 50rem;
    border-radius: 2rem;
    padding: 2rem 2rem 2rem 2rem;
    z-index: 500;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    box-shadow: 0 0.2rem 0.3rem 0.1rem rgba(85, 85, 85, 0.25);
`;

const Header = styled.div`
    // border: 1px solid black;
    font-size: 1rem;
    font-weight: bolder;
`;

export default registerService;
