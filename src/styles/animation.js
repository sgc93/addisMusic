import { keyframes } from "@emotion/css";

// open with fade
export const fadeOpen = keyframes`
    0%{
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

// close with fade
export const fadeClose = keyframes`
    0%{
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;