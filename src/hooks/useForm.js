import {useState} from 'react';


const useForm = (obj = {}) => {
    
    const [formValues, setFormValues] = useState(obj);

    const reset = (newInitialState=obj) => setFormValues(newInitialState);

    const handleInputChange = ({target:{value,name}}) => {

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    return [formValues,handleInputChange,reset];
}
 
export default useForm;