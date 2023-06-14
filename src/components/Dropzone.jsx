import { useDropzone } from 'react-dropzone'
import { useEffect, useMemo, useState } from 'react';

const focusedStyle = {
    transform: 'scale(1.05)',
    borderColor: '#2196f3'
};

const acceptStyle = {
    transform: 'scale(1.05)',
    borderColor: '#00e676'
};

const rejectStyle = {
    transform: 'scale(1.05)',
    borderColor: '#ff1744'
};

export default function Dropzone({ title, acceptedObject }) {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: acceptedObject });

    const file = acceptedFiles[0];

    useEffect(() => {
        if (file) {
            //upload to local storage
            


            console.log(file);
        }
    }, [file]);

    const style = useMemo(() => ({
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <div className="drag-drop-inline">
            <div className="drag-drop-box" {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <h1>{title}</h1>
                <p>Drag/Drop</p>
            </div>
            <div className="empty-box">
                {file ? <h1>{file.path}</h1> : <h1>NOT SET</h1>}
                <p>Drag/Drop</p>
            </div>
        </div>
    );

}