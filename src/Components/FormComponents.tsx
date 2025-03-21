import styled from "styled-components"

export const Input = styled.input`
  background: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Example shadow */
  border: 1px solid #99a2a5;
  padding: 2px;
  margin: 2px;
`;


export const FileInput = styled.input.attrs({ type: "file" })`
  background: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); 
  border: 1px solid #99a2a5;
  padding: 5px;
  margin: 5px;
  cursor: pointer;

  &::file-selector-button {
    background-color: #d3af35;
    color: black;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: bold;
    border: none;
    padding: 8px 12px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;
  }

  &::file-selector-button:hover {
    opacity: 0.8;
  }
`;


export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;

export const FormContainer = styled.div`

  padding: 10px 40px;
  border-radius: 8px;
 
  width: 100%;
  max-width: 500px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;


export const FormTitle = styled.h2`
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-size: 24px;
  color: #f59e0b;
  margin-bottom: 20px;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f6e9d2;
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f59e0b;
  }

  &::placeholder {
    color: #bbb;
  }
`;

export const SubmitButton = styled.button`

  padding: 12px;
  background-color: #f59e0b;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e07a00;
  }
`;

export const RedButton = styled.button`

  padding: 12px;
  background-color: #f12832;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f14061;
  }
`;

export const CustomCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  background-color: #fbf9f6;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:checked {
    background-color: #f59e0b;
    border-color: #f59e0b;
  }

  &:checked + label {
    color: #f59e0b;
  }
`;
export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  margin: 15px;
`;


export const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
`;


const FormComponents = () => {
  return (
    <div>
      
    </div>
  )
}

export default FormComponents
