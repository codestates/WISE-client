import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        mainColor: string;
        mainFontColor: string;
        mobile: string;
        tablet: string;
        laptop: string;
    }
}
