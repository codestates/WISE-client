import { AnyAction } from 'redux';
import { GET_SERVICE_INFO } from '../actions/service';

export type ServiceState = {
    _id: string;
    img: string[];
};

// initial state
export const initialState = {
    services: [
        {
            _id: '1',
            img: ['sample.png', 'sample2.png'],
            assistant: {
                _id: '2',
                name: '김천사',
            },
            greetingsMsg: '안전하고 편안하게 동행',
            description: '안녕하세요 블라블라 저는 김천사라고 합니다.....',
            wage: '17000',
            isDriver: true,
            isEducated: true,
            isAuthorized: true,
            date: '2020-05-05',
            location: '서울시 동작구',
            time: ['am', 'pm'],
            like: '13',
        },
        {
            _id: '2',
            img: ['sample.png'],
            assistant: {
                _id: '3',
                name: '이천사',
            },
            greetingsMsg: '안전하게 동행',
            description: '안녕하세요 블라블라 저는 이천사라고 합니다.....',
            wage: '15000',
            isDriver: true,
            isEducated: true,
            isAuthorized: true,
            date: '2020-05-05',
            location: '서울시 동작구',
            time: ['pm'],
            like: '9',
        },
    ],

    reservation_request: [
        {
            _id: '1',
            customerId: {
                id: '22',
                name: 'ksh',
            },
            assistantId: {
                id: '33',
                name: '김천사',
            },
            date: '2021-05-21',
            pickup: '서울아파트',
            destination: '신촌세브란스병원',
            duration: '3',
            time: 'am',
            message: '저희 어머니 잘 부탁드려요',
            state: '신청',
        },
    ],
    reservation_accepted: [
        {
            _id: '2',
            customerId: '1',
            assistantId: '2',
            date: '2021-05-21',
            pickup: '서울아파트',
            destination: '신촌세브란스병원',
            duration: '3',
            time: 'am',
            message: '저희 어머니 잘 부탁드려요',
            state: '수락',
        },
    ],
    reservation_complete: [
        {
            _id: '3',
            customerId: '1',
            assistantId: '2',
            date: '2021-05-21',
            pickup: '서울아파트',
            destination: '신촌세브란스병원',
            duration: '3',
            time: 'am',
            message: '저희 어머니 잘 부탁드려요',
            state: '완료',
        },
    ],
};

const reducer = (state: ServiceState = initialState, action: AnyAction): ServiceState => {
    switch (action.type) {
        case GET_SERVICE_INFO:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default reducer;
