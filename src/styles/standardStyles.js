import styled, { css } from "styled-components";
import { animated } from "react-spring";

export const Button = styled.button`
    display: inline-block;
    border-radius: 10px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 8rem;
    background: transparent;
    color: inherit;
    border: 1px solid #505050	;
    &:hover {
        cursor: pointer;
         font-weight: 600;

    }
     ${(props) =>
         props.tiny &&
         css`
             background: #505050;
             color: inherit;
             background: inherit;
             width: 3em;
             padding: none;
         `}
    ${(props) =>
        props.primary &&
        css`
            background: inherit;
            color: inherit;
            width: 14em;
            font-size: 0.8em;
        `}
    ${(props) =>
        props.danger &&
        css`
            background: red;
            color: white;
            border: none;
        `}
         ${(props) =>
             props.success &&
             css`
                 background: green;
                 color: white;
                 border: none;
             `}
             ${(props) =>
                 props.submit &&
                 css`
                     border: 1px solid transparent;
                     color: white;
                     margin: 1em 0;
                     font-weight: 600;
                     background-color: #ed5e93;
                 `}
                 ${(props) =>
                     props.friend &&
                     css`
                         background: #505050;
                         background: inherit;
                         margin: 0;
                         font-size: 0.7em;
                         width: 10rem;
                     `}
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    > label {
        font-size: 1.4em;
    }
`;
export const LinkBox = styled.div`
    display: flex;
    flex-direction: column;
    text-decoration: none;
    margin: 1em 0;
    a {
        text-decoration: none;
        color: #ed5e93;
    }
`;
export const OtherProf = styled.div`
    display: flex;
    flex-direction: column;
    max-width: max-content;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 3em 0;
`;

export const RoundedAvatar = styled.div`
        img {
    width: 150px;
    height: 150px;
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    left: 25em;
    box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
        &:hover {
            cursor: pointer;
        }

`;
export const DivRow = styled.div`
    height: 150px;

    h1 {
        font-size: 36px;
        font-weight: 300;
        letter-spacing: 2px;
    }
    &.avatar-row-bottom {
        padding: 1em;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
`;
export const AvatarDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 25em;
    margin: 0 0 0 3em;
`;

export const Menu = styled(animated.div)`
    position: absolute;
    background-color: inherit;
    color: #fff;
    z-index: 30;
    top: 0;
    right: 0;
    width: 250px;
    height: 100vh;
`;
export const MenuList = styled.ul`
    padding: 0;
    list-style: none;
    margin: 100px 24px;
`;
export const MenuItem = styled.li`
    margin: 24px 0;
    a {
        text-decoration: none;
        color: #efe3e3;
    }
    a:hover {
        font-weight: bold;
    }
`;
export const MenuButton = styled.button`
    z-index: 40;
    position: fixed;
    top: 40px;
    right: 20px;
    padding: 12px;
    font-size: 1em;
    border: 1px solid inherit;
    background: none;
    background: inherit;
    color: inherit;
    transition: background 0.1s linear;
    cursor: pointer;
    :hover {
        background: #fce8f5;
    }
`;

export const ProfileDesign = styled.div`
    display: flex;
    justify-content: center;
    padding: 0.5em;
    img {
        width: 30rem;
        border-radius: 4%;
    }
    img:hover {
        cursor: pointer;
        border: 5px dotted pink;
    }
`;

export const ProfBio = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
export const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        border-radius: 5px;
        width: 10em;
    }
`;

export const ErrorText = styled.h3`
    color: red;
    font-weight: bold;
    padding: 0em 0.5em;
`;

export const UpperNav = styled.div`
    display: flex;
    justify-content: center;
    padding: 1em 0em;
`;

export const UserImage = styled.div`
    display: flex;
    flex-direction: row;
    img {
        padding: 0em 1em;
        border-radius: 50%;
        width: 5em;
        height: 5em;
        &:hover {
            cursor: pointer;
        }
    }
`;
export const NewUsers = styled.div`
    width: 800px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    display: grid;
    margin: auto;
    img {
        border-radius: 5px;
        width: 8em;
        height: 10em;
    }
`;
export const SearchColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 5rem 0;
    align-items: center;
`;

export const Input = styled.input`
    font-size: 16px;
    width: 25rem;
    border: solid 1px #dbdbdb;
    border-radius: 3px;
    color: #1c1c1c;
    padding: 7px 33px;
    border-radius: 3px;
    color: #737373;
    cursor: text;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    background: #fafafa;
    &:active,
    &:focus {
        text-align: left;
        outline-color: #f06c9d;
    }
`;

export const StyledChatArea = styled.div`
    overflow-y: scroll;
    background-color: #fff1f6;
    color: black;
    align-self: center;
    max-height: 300px;
    width: 70%;
    margin: 1em auto;
`;
export const StyledTextInput = styled.input.attrs((props) => ({
    //we can define dynamic ones
    size: props.size || "1em",
}))`
    font-size: 1em;
    border: 2px solid black;
    border-radius: 3px;
    display: flex;
    margin: 1em auto;
    /* here we use the dynamically computed prop */
    padding: ${(props) => props.size};
`;

export const TextInputChild = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;
export const UserImageHolder = styled.div`
    padding: 1em 0em;
    display: flex;
    .message {
        font-weight: 600;
    }
    .message-avatar {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
    }
    .avatar-name {
        font-size: 0.8em;
    }

    .timeposted {
        font-size: 0.8em;
        display: block;
        color: #a8a8a8;
    }
`;

export const WelcomeBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;
export const RegisterText = styled.h2`
    line-height: 1.7;
    font-weight: 200;
`;
export const WelcomeCol = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    height: 100vh;
    &.image-col {
        background-color: pink;
    }
    &.form-col {
        justify-content: center;
        margin-left: 1em;
    }
    &.login-design {
        background-color: #ffffff;
        background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ed5e93' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    &.text-col {
        background-color: #ff136a;
        align-items: center;
        padding: 1em;
        color: white;
    }
`;

export const ResetPasswordContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f94d8d' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;
export const ResetPasswordDiv = styled.div`
    background: white;
    padding: 2em;
    border: 1px solid;
`;
