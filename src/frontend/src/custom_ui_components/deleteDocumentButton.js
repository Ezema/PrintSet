import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';

import { makeStyles } from '@material-ui/core/styles';

/**
 * Custom delete document button component.
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.passedDoucumentDeletionHandler - The function to handle document deletion.
 * @param {string} props.passUniqueKeyToProcessDeletion - The unique key to identify the document.
 */
const DeleteDocumentButton = (props) => {
    const classes = useStyles();

    /**
     * Handles the click event of the delete button.
     */
    const handleDeleteClick = () => {
        props.passedDoucumentDeletionHandler(props.passUniqueKeyToProcessDeletion);
    };

    return (
        <div className={classes.container}>
            <Fab
                color="secondary"
                size="small"
                variant="round"
                className={classes.button}
                onClick={handleDeleteClick}
            >
                <ClearIcon />
            </Fab>
        </div>
    );
};

DeleteDocumentButton.propTypes = {
    passedDoucumentDeletionHandler: PropTypes.func.isRequired,
    passUniqueKeyToProcessDeletion: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
        top: '1px',
        left: '1px',
        zIndex: '500',
        border: 'none',
    },
    button: {
        minHeight: '25px',
        minWidth: '25px',
        width: '25px',
        height: '25px',
        maxHeight: '25px',
        maxWidth: '25px',
    },
}));

export default DeleteDocumentButton;