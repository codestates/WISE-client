import moment from 'moment';
import { Button, DatePicker, Radio, RadioChangeEvent, Select } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { loadSearchServicesRequest } from '../../actions/service';

const SearchBar = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { searchQuery } = useSelector((state: RootState) => state.service);

    const [location, setLocation] = useState(searchQuery?.location || '');
    const [date, setDate] = useState(searchQuery?.date || '');
    const [time, setTime] = useState(searchQuery?.time || 'am');

    const onChangeLocation = useCallback((value: string) => {
        setLocation(value);
    }, []);

    const onSearch = useCallback(() => {
        console.log(`location : ${location}, date : ${date}, time : ${time}`);
        dispatch(
            loadSearchServicesRequest({
                location,
                date,
                time,
                page: 1,
            }),
        );
        router.push('/searchResult');
    }, [location, date, time, dispatch, router]);

    const onChangeDate = useCallback((_, dateString: string) => {
        setDate(dateString);
    }, []);

    const onChangeTime = useCallback((e: RadioChangeEvent) => {
        setTime(e.target.value);
    }, []);

    const disabledDate = (current: any) => current < moment().subtract(1, 'days').endOf('day');

    return (
        <Wrapper>
            <h2>어시스턴트 찾기</h2>
            <div>함께 동행할 숙련된 어시스턴트를 찾아보세요</div>
            <Search>
                <Select
                    onChange={onChangeLocation}
                    showSearch
                    style={{ width: 150 }}
                    placeholder="위치 입력"
                    optionFilterProp="children"
                    value={searchQuery?.location}
                >
                    <Select.Option value="서울시 성동구">서울시 성동구</Select.Option>
                    <Select.Option value="서울시 종로구">서울시 종로구</Select.Option>
                    <Select.Option value="서울시 강서구">서울시 강서구</Select.Option>
                    <Select.Option value="서울시 송파구">서울시 송파구</Select.Option>
                </Select>
                <DatePicker onChange={onChangeDate} disabledDate={disabledDate} />
                <Radio.Group onChange={onChangeTime} size="middle">
                    <Radio.Button value="am">오전</Radio.Button>
                    <Radio.Button value="pm">오후</Radio.Button>
                </Radio.Group>
                <Button shape="circle" icon={<SearchOutlined />} onClick={onSearch} />
            </Search>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    // border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 3rem;
    h2 {
        font-weight: bolder;
    }
    div {
        color: #666;
    }
    button {
        background-color: #72cd87;
        margin-left: 1rem;
        color: white;
    }
`;

const Search = styled.div`
    // border: 1px solid black;
    margin: 1rem 0 0 1rem;
`;

export default SearchBar;
