import { createGlobalStyle } from 'styled-components';

export const AuthGlobal = createGlobalStyle`
    header {
        background: rgba(255, 255, 255, 1);
    }
    footer {
        position: absolute;
        visibility:hidden;
    }
`;

export const Global = createGlobalStyle`
    body{
        // letter-spacing: -75px;
        color: #191919;
    }
   
    a:hover {
     color: #222;
    }
    textarea:focus,
    input:focus,
    button:focus{
        outline:none;
    }
`;
