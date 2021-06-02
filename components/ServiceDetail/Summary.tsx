import styled from 'styled-components';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { DatePicker, Radio, RadioChangeEvent } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { ActionButton } from '../style/style';
import { ShortService } from '../../interfaces/data/service';
import { RootState } from '../../reducers';

type ServiceProps = {
    service: ShortService;
    searchResult: ParsedUrlQuery | null;
};

const Summary = ({ service, searchResult }: ServiceProps) => {
    const { serviceSchedule, searchQuery } = useSelector((state: RootState) => state.service);

    const [availableTime, setAvailableTime] = useState<Array<string>>([]);

    const [date, setDate] = useState(searchQuery?.date || '');
    const [time, setTime] = useState(searchQuery?.time || '');

    const onChangeDate = useCallback(
        (_, dateString: string) => {
            if (
                serviceSchedule.availableDays.includes(`${moment(dateString).format('dddd')} am`) ||
                serviceSchedule.orders.includes(`${dateString} am`)
            ) {
                setAvailableTime(['pm']);
            } else if (
                serviceSchedule.availableDays.includes(`${moment(dateString).format('dddd')} pm`) ||
                serviceSchedule.orders.includes(`${dateString} pm`)
            ) {
                setAvailableTime(['am']);
            } else {
                setAvailableTime(['am', 'pm']);
            }
            setDate(dateString);
        },
        [serviceSchedule],
    );

    const onChangeTime = useCallback((e: RadioChangeEvent) => {
        setTime(e.target.value);
    }, []);

    const disabledDate = (current: any) => {
        // 유효한 요일인지 확인
        const checkDay = (day: string) =>
            serviceSchedule.availableDays.includes(`${day} am`) && serviceSchedule.availableDays.includes(`${day} pm`);

        const checkOrder = (day: string) => {
            if (
                serviceSchedule.orders.includes(`${day} am`) &&
                serviceSchedule.availableDays.includes(`${moment(day).format('dddd')} pm`)
            ) {
                return true;
            }
            if (
                serviceSchedule.orders.includes(`${day} pm`) &&
                serviceSchedule.availableDays.includes(`${moment(day).format('dddd')} am`)
            ) {
                return true;
            }
            return current < moment().subtract(1, 'days').endOf('day');
        };

        if (checkDay(moment(current).format('dddd'))) {
            return true;
        }
        if (checkOrder(moment(current).format('YYYY-MM-DD'))) {
            return true;
        }
        return false;
    };
    return (
        <Wrapper>
            <Bio>
                <h1>{service.assistant.name} 어시스턴트</h1>
                <h3>{service.greetings}</h3>
            </Bio>
            <Info>
                <Text>
                    <span>지역</span> {service.location}
                </Text>
                <Text>
                    <span>날짜</span>
                    {searchResult?.date ? (
                        searchResult?.date
                    ) : (
                        <DatePicker style={{ width: '150px' }} onChange={onChangeDate} disabledDate={disabledDate} />
                    )}
                </Text>
                <Text>
                    <span>시간</span>
                    {searchResult?.time ? (
                        searchResult?.time
                    ) : (
                        <Radio.Group onChange={onChangeTime} size="middle">
                            {availableTime.includes('am') && <Radio.Button value="am">오전</Radio.Button>}
                            {availableTime.includes('pm') && <Radio.Button value="pm">오후</Radio.Button>}
                        </Radio.Group>
                    )}
                </Text>
                <Text>
                    <span>평점</span>
                    <i className="material-icons">star</i> {service.starRating ? service.starRating : 0}
                </Text>
                <Text>
                    <span>비용</span> <strong>{service.wage}</strong>원 / 시간
                </Text>
            </Info>
            <Link
                href={`../reservation/${service._id}?date=${searchResult?.date || date}&time=${
                    searchResult?.time || time
                }`}
            >
                <Button>신청하기</Button>
            </Link>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 2rem;
    height: 30rem;
    margin: 0 2%;
    width: 35%;
    border-radius: 0.4rem;
    box-shadow: 0.1rem 0 0.3rem #f6f6f6, -0.1rem 0 0.3rem #f6f6f6;
    span {
        color: #888;
        font-size: 0.9rem;
        margin-right: 1rem;
    }
    h1 {
        color: #222;
        font-weight: 700;
    }
`;

const Bio = styled.div`
    margin: 0 0 1rem 1rem;
    h2 {
        color: #222;
        font-weight: 700;
        margin: 0;
    }
    h3 {
        color: #555;
    }
`;

const Info = styled.div`
    margin-left: 1rem;
`;

const Text = styled.div`
    font-size: 1rem;
    font-weight: 500;
    padding-bottom: 1rem;
    color: #222;
    i {
        color: #68d480;
        vertical-align: middle;
        margin-top: -0.4rem;
    }
`;

const Button = styled(ActionButton)`
    height: 3.4rem;
`;

export default Summary;
