import styled, { css } from "styled-components";
import { animated } from "react-spring";

export const Button = styled.button`
    display: inline-block;
    border-radius: 10px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 11rem;
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
            width: 16em;
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
    background-color: #c72863;
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
        color: #fff;
    }
`;
export const MenuButton = styled.button`
    z-index: 40;
    border: none;
    position: fixed;
    top: 40px;
    right: 20px;
    padding: 12px;
    font-size: 1em;
    background: none;
    background: #fff;
    color: #ed5e93;
    transition: background 0.1s linear;
    cursor: pointer;
    :hover {
        background: #fce8f5;
    }
`;

export const ProfileDesign = styled.div`
    display: flex;
    justify-content: center;
    padding: 1em;
    img {
        width: 45rem;
        border-radius: 4%;
    }
    img:hover {
        cursor: pointer;
        border: 5px dotted pink;
    }
`;
export const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
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
    justify-content: space-between;
    padding: 2em 1em;
`;

export const UserImage = styled.div`
    display: flex;
    flex-direction: row;
    img {
        padding: 0em 1em;
        border-radius: 50%;
        width: 5em;
        &:hover {
            cursor: pointer;
        }
    }
`;
export const NewUsers = styled.div`
    width: 600px;
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
    color: #262626;
    padding: 7px 33px;
    border-radius: 3px;
    color: #999;
    cursor: text;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    background: #fafafa;
    &:active,
    &:focus {
        text-align: left;
        outline-color: #8e24aa;
    }
`;

export const StyledChatArea = styled.div`
    overflow-y: scroll;
    background-color: #fff1f6;
    color: black;
    align-self: center;
    max-height: 300px;
    width: 70%;
    margin: auto;
`;
export const StyledTextInput = styled.input.attrs((props) => ({
    //we can define dynamic ones
    size: props.size || "1em",
}))`
    font-size: 1em;
    border: 2px solid black;
    border-radius: 3px;
    display: flex;
    margin: 2em auto;
    /* here we use the dynamically computed prop */
    padding: ${(props) => props.size};
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
