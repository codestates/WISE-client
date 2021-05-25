import { Button, DatePicker, Radio, Select } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { loadSearchServiceRequestAction } from '../reducers/service';

const SearchBar = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [location, setLocation] = useState('');
    const [date, setDate] = useState([]);
    const [time, onChangeTime] = useInput('am');

    const onChangeLocation = (value) => {
        setLocation(value);
    };

    const onSearch = () => {
        console.log(`location : ${location}, date : ${date}, time : ${time}`);
        dispatch(
            loadSearchServiceRequestAction({
                location,
                date,
                time,
                page: 1,
            }),
        );
        router.push('/searchResult');
    };

    function onChange(value, dateString) {
        setDate(dateString);
    }

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
                >
                    <Select.Option value="서울시 성동구">서울시 성동구</Select.Option>
                    <Select.Option value="서울시 종로구">서울시 종로구</Select.Option>
                    <Select.Option value="서울시 강서구">서울시 강서구</Select.Option>
                    <Select.Option value="서울시 송파구">서울시 송파구</Select.Option>
                </Select>
                <DatePicker onChange={onChange} />
                <Radio.Group onChange={onChangeTime} defaultValue="am" size="middle">
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