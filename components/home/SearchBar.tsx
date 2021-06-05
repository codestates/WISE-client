import moment, { Moment } from 'moment';
import { Button, DatePicker, Radio, RadioChangeEvent, Select } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { SEOULCITY } from '../../utils/data';

const SearchBar = () => {
    const router = useRouter();

    const { searchQuery } = useSelector((state: RootState) => state.service);

    const [location, setLocation] = useState(router.query?.location || '');
    const [date, setDate] = useState(router.query?.date || '');
    const [time, setTime] = useState(router.query?.time || '');

    const onChangeLocation = useCallback((value: string) => {
        setLocation(value);
    }, []);

    const onSearch = useCallback(() => {
        if (!location || !date || !time) {
            return;
        }
        router.push(`/searchResult?location=${location}&date=${date}&time=${time}`);
    }, [location, date, time, router]);

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
                <div>
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
                </div>
                <div>
                    <Radio.Group onChange={onChangeTime} size="middle">
                        <Radio.Button value="am">오전</Radio.Button>
                        <Radio.Button value="pm">오후</Radio.Button>
                    </Radio.Group>
                    <Button shape="circle" icon={<SearchOutlined />} onClick={onSearch} />
                </div>
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
    display: flex;
    @media ${(props) => props.theme.mobile} {
        margin: 1rem 0;
        flex-direction: column;
        justify-content: space-between;
        height: 5rem;
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
