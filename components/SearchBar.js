import { Button, DatePicker, Radio, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const SearchBar = () => {
    const router = useRouter();
    const onSearch = () => {
        router.push('/searchResult');
    };
    return (
        <Wrapper>
            <h2>어시스턴트 찾기</h2>
            <div>함께 동행할 숙련된 어시스턴트를 찾아보세요</div>
            <Search>
                <Select showSearch style={{ width: 150 }} placeholder="위치 입력" optionFilterProp="children">
                    <Option value="seoul">서울</Option>
                    <Option value="gyeonggi">경기</Option>
                    <Option value="incheon">인천</Option>
                </Select>
                <DatePicker placeholder="날짜 선택" />
                <Radio.Group defaultValue="am" size="middle">
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
