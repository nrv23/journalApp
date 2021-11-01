import React,{useEffect, useRef} from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector,useDispatch } from 'react-redux';
import useForm from '../../hooks/useForm';
import { activeNote } from '../../actions/notes';

export const NoteScreen = () => {

    const { active:note } = useSelector(state => state.notes);
    const dispatch = useDispatch();
    const [formValues,handleInputChange,reset] = useForm(note);

    const activeId = useRef(note.id);// el useRef almacena variables mutables que no va redibujar el componente si la variable cambia de valor

    useEffect(() => {
        if(note.id !== activeId.current) { // si el id de la nota actual es diferente a la referencia actual de id nota, resetear el formulario
            reset(note)
            activeId.current = note.id; //actualizar la referencia del id de la nota actual
        }
    }, [note,reset])

    const { body,title } = formValues;

    //actualizar el state de la nota activa

    useEffect(() => {
        dispatch(activeNote(formValues.id,{...formValues}));
    },[formValues,dispatch])

    return (
        <div className="notes__main-content">
            
        <NotesAppBar />

        <div className="notes__content">

            <input 
                type="text"
                name="title"
                placeholder="Some awesome title"
                className="notes__title-input"
                autoComplete="off"
                value={title}
                onChange={handleInputChange}
            />

            <textarea
                name="body"
                placeholder="What happened today"
                className="notes__textarea"
                value={body}
                onChange={handleInputChange}
            ></textarea>

            {
                note.url && 
                (<div className="notes__image">
                    <img 
                        src={`${note.url}`}
                        alt="imagen"
                    />
                </div>)
            }


        </div>

    </div>
    )
}
