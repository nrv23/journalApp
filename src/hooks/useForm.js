import {useState} from 'react';


const useForm = (obj = {}) => {
    
    const [formValues, setFormValues] = useState(obj);

    const reset = () => setFormValues(obj);

    const handleInputChange = ({target:{value,name}}) => {

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    return [formValues,handleInputChange,reset];
}
 
export default useForm;