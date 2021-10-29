import React from 'react'
import { JournalEntries } from './JournalEntries'
import { useDispatch,useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { starNewNote } from '../../actions/notes';

export const Sidebar = () => {

    const {name} = useSelector(state => state.auth);
    const dispatch = useDispatch()

    const handleLogout = () => {

        
        dispatch(startLogout())

    }

    const handleAddNew = () => {

        dispatch(starNewNote())
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <i className="far fa-moon"></i>
                <h3 className="mt-5"> <span>{name}</span> </h3>

                <button  className="btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="journal__new-entry"
             onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New Entrie</p>
            </div>

            <JournalEntries />
        </aside>
    )
}
