import styled from "styled-components";

export const Title = styled.h2`
    text-align: center;
    font-size: 26px;
    font-weight: 300;
    letter-spacing: 2px;
`;
export const Navbar = styled.div`
    padding: 2em;
    background: linear-gradient(to left, #b6fbff, #83a4d4);
    img {
        border: 8px solid white;
        width: 12rem;
        height: 12rem;
        border-radius: 50%;
    }
    &:hover {
        background: #171212;
        color: #ffffff;
    }
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
    background: #83a4d4;
`;
export const StyledContainer = styled.div`
    height: 100vw;
    padding: 20px;
    background: #83a4d4;
    background: linear-gradient(to left, #b6fbff, #83a4d4);
    color: #171212;
`;

export const StyledHeadlinePrimary = styled.h1`
    font-size: 48px;
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
    background: transparent;
    border: 1px solid #171212;
    padding: 5px;
    cursor: pointer;
    transition: all 0.1s ease-in;
    &:hover {
        background: #171212;
        color: #ffffff;
    }
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
