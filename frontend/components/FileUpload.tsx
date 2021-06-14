import React from 'react';

type FileUploadProps = {
    setFile: Function,
    accept: string
}
const FileUpload: React.FC<FileUploadProps> = ({
                                                   setFile,
                                                   accept,
                                                   children
                                               }) => {
    const ref = React.useRef<HTMLInputElement>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0])
    }

    return (
        <div onClick={() => ref.current.click()}>
            <input
                style={{display: 'none'}}
                type="file"
                accept={accept}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;