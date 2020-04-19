import styled, { css } from "styled-components";

export const Title = styled.h2`
    text-align: center;
    font-size: 26px;
    font-weight: 300;
    letter-spacing: 2px;
`;
export const Navbar = styled.div`
    padding: 2em;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    width: 70%;
    img {
        border: 5px solid;
        width: 15rem;
        height: 15rem;
        border-radius: 50%;
    }
    display: flex;
    margin: auto;
    justify-content: space-between;
`;
export const UploaderWrap = styled.div`
    display: flex;
    padding: 4rem 0;
    transition: cubic-bezier(0.55, 0.06, 0.68, 0.19);
    justify-content: center;
`;
export const UpdateWrap = styled.div`
    padding: 1em 0;
    display: flex;
    flex-direction: column;
`;
export const ProfileWrapper = styled.div`
    padding: 1em 0;
    display: flex;
    justify-content: space-around;
`;
export const StyledContainer = styled.div`
    height: 100vw;
    padding: 20px;
`;

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

export const StyledHeadlinePrimary = styled.h1`
    font-size: 36px;
    font-weight: 300;
    letter-spacing: 2px;
`;
export const ErrorText = styled.h3`
    color: red;
    font-weight: bold;
    padding: 0em 0.5em;
`;

export const StyledItem = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 5px;
`;

export const UpperNav = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2em 1em;
`;

export const UserHolder = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
    padding: 2em 2em;
    justify-items: center;
`;

export const UserImage = styled.div`
    display: flex;
    flex-direction: row;
    img {
        flex: 0 0 35px;
        padding: 0em 1em;
        border-radius: 50%;
        &:hover {
            cursor: pointer;
        }
    }
`;

/* 

div.sc-fzplWN:nth-child(10) > img:nth-child(1) {
  flex: 0 0 35px;
  position: relative;
  width: 6rem;
  border-radius: 50%;
}


div.sc-fzplWN:nth-child(10) {
  display: flex;
  flex-direction: row;
}


div.sc-fzplWN:nth-child(10) > div:nth-child(2) > span:nth-child(3) {
  color: lightgrey;
} */

export const StyledColumn = styled.span`
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    a {
        color: inherit;
    }
    width: ${(props) => props.width};
`;

export const StyledButton = styled.button`
    border: 3px solid #;
    padding: 5px;
    cursor: pointer;
    transition: all 0.1s ease-in;
    background: inherit;
    color: inherit;
`;

export const StyledButtonSmall = styled(StyledButton)`
    padding: 5px;
`;

export const StyledButtonLarge = styled(StyledButton)`
    padding: 10px;
`;

export const StyledSearchForm = styled.form`
    padding: 10px 0 20px 0;
    display: flex;
    align-items: baseline;
`;

export const StyledLabel = styled.label`
    border-top: 1px solid #171212;
    border-left: 1px solid #171212;
    padding-left: 5px;
    font-size: 24px;
`;

export const StyledInput = styled.input`
    border: none;
    border-bottom: 1px solid #171212;
    background-color: transparent;
    font-size: 24px;
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

export const StyledChatContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const StyledChatArea = styled.div`
    overflow-y: scroll;
    background-color: #ffe5d9;
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
