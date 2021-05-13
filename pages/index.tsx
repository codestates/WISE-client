import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = (): JSX.Element => (
    <Layout>
        <h1>Hello World 👋</h1>
        <p>
            <Link href="/landing">
                <a>About</a>
            </Link>
        </p>
    </Layout>
);

export default IndexPage;
