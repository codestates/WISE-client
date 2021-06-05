import moment, { Moment } from 'moment';
import { Button, DatePicker, Radio, RadioChangeEvent, Select } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { loadSearchServicesRequest } from '../../actions/service';
import { SEOULCITY } from '../../utils/data';

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

    const disabledDate = (current: Moment) => current < moment().subtract(1, 'days').endOf('day');

    return (
        <Wrapper>
            <Header>어시스턴트 찾기</Header>
            <div style={{ fontSize: '1rem' }}>&nbsp;함께 동행할 숙련된 어시스턴트를 찾아보세요</div>
            <Search>
                <Select
                    onChange={onChangeLocation}
                    showSearch
                    style={{ width: '150px', borderRadius: '1rem' }}
                    placeholder="위치 입력"
                    optionFilterProp="children"
                    value={searchQuery?.location}
                >
                    {SEOULCITY.map((ele) => (
                        <Select.Option key={ele} value={ele}>
                            {ele}
                        </Select.Option>
                    ))}
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 3.5rem;
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
    margin: 1rem 0 0 1rem;
    @media ${(props) => props.theme.mobile} {
        margin: 1rem 0;
    }
`;

const Header = styled.span`
    font-weight: 800;
    font-size: 1.4rem;
    height: 2.5rem;
    margin-bottom: 1rem;
    margin-top: 2.7rem;
`;

export default SearchBar;
