import styled from 'styled-components'

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 5px;
    padding: 30px;
    margin: 80px auto;

    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
            margin-right: 10px;
        }
       
    }
`

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 17px;
    }
`   

export const List = styled.ul`
    list-style: none;
    margin-top: 30px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        & + li {
            border-top: 1px solid #eee;
        }
        a {
            color: #7159c1;
        }
    }

`

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    margin-left: 6px;
    background: transparent;
    border: 0;
    color: #e83f5b;
    font-weight: bold;
    cursor: pointer;
`


export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    background: #7159c1;
    border: 0;
    border-radius: 5px;
    margin-left: 10px; 
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }

`
