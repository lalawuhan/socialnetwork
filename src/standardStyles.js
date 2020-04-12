import styled from "styled-components";

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

export const StyledHeadlinePrimary = styled.h1`
    font-size: 36px;
    font-weight: 300;
    letter-spacing: 2px;
`;

export const StyledItem = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 5px;
`;

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
