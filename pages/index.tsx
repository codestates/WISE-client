import Link from 'next/link';
import { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const IndexPage = (): JSX.Element => (
    // const handleTest = async () => {
    //     const response = await axios.get('https://api-wise.com/');
    //     console.log(response.data);
    // };
    // useEffect(() => {
    //     handleTest();
    // }, []);
    <Layout>
        <h1>Hello World 👋</h1>
        <p>
            <Link href="/landing">
                <a>About</a>
            </Link>
        </p>
        <div />
    </Layout>
);
export default IndexPage;
