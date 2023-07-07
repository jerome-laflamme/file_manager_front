import { useDropzone } from 'react-dropzone'
import { useEffect, useMemo } from 'react';
import axios from 'axios';

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

export default function Dropzone({ title, acceptedObject, project }) {
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
            // upload to server
            const formData = new FormData();
            formData.append('file', file);
            axios.post(`http://localhost:3000/projects/${project.name}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res.data);
                }
                )
                .catch(err => console.log(err));

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
                {file ? <h1>File saved!</h1> : <h1>NOT SET</h1>}
                {file ? <p>{file.path}</p> : <p>Drag/Drop</p>}
            </div>
        </div>
    );

}