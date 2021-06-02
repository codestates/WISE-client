import { DefaultTheme } from 'styled-components';

const size = {
    mobile: '639px',
    tablet: '1023px',
    laptop: '1200px',
};

const theme: DefaultTheme = {
    mainColor: '#68d480',
    mainFontColor: '#191919',
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
};

export default theme;
