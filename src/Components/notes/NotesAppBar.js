import React,{useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { startSaveNote,startUploadingFile } from '../../actions/notes';

export const NotesAppBar = () => {

    const { active:note } = useSelector(state => state.notes)
    const dispatch = useDispatch();
    const inputArchivo = useRef(null);
    const handleUpdate = () => {

        dispatch(startSaveNote(note));
    }

    const handleUploadPicture = () => {

        //llamar el input para cargar la imagen
        //usar useRef para llamar etiquetas html y no usar el DOM de js
       inputArchivo.current.click();
    }

    const handleFileChange = e => {

        const file = e.target.files[0];

        if(file) {
            dispatch(startUploadingFile(file));
        }

    }
    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <input 
                ref = {inputArchivo} // asignar la referencia al elemento html
                type="file" 
                name="file" 
                style={{
                    visibility: 'hidden'
                }}
                onChange={handleFileChange}
            />

            <div>
                <button className="btn"
                
                onClick={handleUploadPicture}>
                    Picture
                </button>

                <button className="btn" onClick={handleUpdate}>
                    Save
                </button>
            </div>
        </div>
    )
}
