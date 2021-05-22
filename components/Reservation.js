import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { CancelButton, ActionButton } from './button-style';

const Reservation = ({ id, handleChangeDuration }) => {
    const [hospital, setHospital] = useState('');
    const onChanageDestination = useCallback((e) => {
        e.preventDefault();
        setHospital(e.target.value);
    }, []);
    const onChangeDuration = useCallback((e) => {
        handleChangeDuration(e.target.value);
    }, []);

    return (
        <Wrapper>
            <Title>
                <Link href={`../detail/${id}`}>
                    <i className="material-icons">chevron_left</i>
                </Link>

                <h1>서비스 신청하기</h1>
            </Title>
            <FormWrapper onSubmit={onsubmit}>
                <h4>방문하실 병원은 어디인가요?</h4>
                <InputWrapper>
                    <input
                        name="destination"
                        type="text"
                        placeholder="ex) 강남세브란스병원"
                        required
                        onChange={onChanageDestination}
                    />
                </InputWrapper>

                <h4>어떤 서비스가 필요한지 말씀해 주세요</h4>
                <InputWrapper>
                    <input
                        name="destination"
                        type="text"
                        placeholder="ex) 진료실 동행, 병원 내에서 휠체어로 동행 등"
                        required
                        onChange={onChanageDestination}
                    />
                </InputWrapper>
                <h4>
                    소요 시간 <span>(최소 1시간 - 모든 이동시간 포함)</span>
                </h4>
                <RadioWrapper required onChange={onChangeDuration}>
                    <label className="container">
                        <input type="radio" name="service-duration" value="1" />
                        <span className="checkmark">1</span>
                    </label>
                    <label className="container">
                        <input type="radio" name="service-duration" value="2" />
                        <span className="checkmark">2</span>
                    </label>
                    <label className="container">
                        <input type="radio" name="service-duration" value="3" />
                        <span className="checkmark">3</span>
                    </label>
                    <label className="container">
                        <input type="radio" name="service-duration" value="4" />
                        <span className="checkmark">4</span>
                    </label>
                    <label className="container">
                        <input type="radio" name="service-duration" value="5" />
                        <span className="checkmark">5</span>
                    </label>
                    <label className="container">
                        <input type="radio" name="service-duration" value="6" />
                        <span className="checkmark">6</span>
                    </label>
                </RadioWrapper>
                <h4>어시스턴트가 참고할 만한 메시지를 남겨주세요</h4>
                <TextareaWrapper>
                    <textarea
                        name="destination"
                        type="text"
                        placeholder="ex) 거동이 불편함, 진료 내용 보호자에게 전달 필요 등"
                        required
                        onChange={onChanageDestination}
                    />
                </TextareaWrapper>
            </FormWrapper>

            <ActionButton>신청하기</ActionButton>
            <Link href="/">
                <CancelButton>취소하기</CancelButton>
            </Link>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 0 3rem 3rem 0;
    margin-right: 2rem;
    align-self: center;
    div {
        color: #333;
    }
    span {
        color: #888;
        font-size: 1rem;
        margin-right: 1rem;
    }
    h1 {
        margin: 0.5rem;
        font-weight: 600;
    }
    h4 {
        font-size: 1rem;
    }
    h4 > span {
        font-size: 0.7rem;
    }
    i {
        font-size: 2rem;
        cursor: pointer;
    }
`;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28rem;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-bottom: 2.5rem;
    input {
        width: 100%;
        border: none;
        border-bottom: 1px solid #e5e5e5;
        height: 3.125rem;
        margin: 0.8rem auto 0 auto;
        padding: 0.5rem;
    }
    input:focus {
        outline: none;
        border-bottom: 2px solid #68d480;
        font-size: 1rem;
    }
`;

const TextareaWrapper = styled.div`
    margin-bottom: 2.5rem;
    textarea {
        width: 100%;
        border: 1px solid #e5e5e5;
        border-radius: 0.3rem;
        height: 3.125rem;
        margin: 0.8rem auto 0 auto;
        padding: 0.5rem;
        height: 10rem;
    }
    textarea:focus {
        outline: none;
        border: 1px solid #68d480;
        font-size: 1rem;
    }
`;

const RadioWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2.5rem;
    .container {
        display: block;
        position: relative;
        padding-left: 3rem;
        margin-bottom: 3rem;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        padding-top: 0.4rem;
        font-size: 1.1rem;
        height: 2.8rem;
        width: 2.8rem;
        background-color: #fff;
        border: 0.15rem solid #ccc;
        color: #c0c0c0;
        border-radius: 50%;
        text-align: center;
    }
    .container:hover input ~ .checkmark {
        border: 0.15rem solid #68d480;
        color: #68d480;
    }
    .container input:checked ~ .checkmark {
        background-color: #68d480;
        border: 0.15rem solid #68d480;
        color: #fff;
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
`;

Reservation.propTypes = {
    id: PropTypes.string.isRequired,
    handleChangeDuration: PropTypes.func.isRequired,
};

export default Reservation;
