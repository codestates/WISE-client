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
                <SearchInput>
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
                    <Divider />
                    <Radio.Group onChange={onChangeTime} size="middle">
                        <Radio.Button value="am">오전</Radio.Button>
                        <Radio.Button value="pm">오후</Radio.Button>
                    </Radio.Group>
                </SearchInput>
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
        color: white;
        width: 2.5rem;
        height: 2.5rem;
    }
`;

const Search = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;

    // customizing ant-design search bar
    .ant-select-show-search.ant-select:not(.ant-select-customize-input) .ant-select-selector,
    .ant-picker,
    .ant-radio-button-wrapper {
        border: none;
        background: none;
        outline: none;
    }
    .ant-btn:hover,
    .ant-btn:focus,
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover,
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
        color: ${(props) => props.theme.mainColor};
        border-color: ${(props) => props.theme.mainColor};
    }
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover::before,
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {
        background-color: ${(props) => props.theme.mainColor};
    }

    @media ${(props) => props.theme.mobile} {
        margin: 1rem 0;
    }
`;

const SearchInput = styled.div`
    padding: 0.3rem;
    align-items: center;
    border: 1px solid #d0d0d0;
    border-radius: 2rem;
    margin-right: 1rem;

    @media ${(props) => props.theme.mobile} {
        border-radius: 0.6rem;
        width: 18rem;
    }
`;

const Divider = styled.span`
    border-right: 1px solid #d0d0d0;
    margin: 0 0.5rem;
`;

const Header = styled.span`
    font-weight: 800;
    font-size: 1.4rem;
    height: 2.5rem;
    margin-bottom: 1rem;
    margin-top: 2.7rem;
`;

export default SearchBar;
