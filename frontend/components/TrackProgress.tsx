import React from 'react';

type TrackProgressProps = {
    left: number,
    right: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const TrackProgress: React.FC<TrackProgressProps> = ({
                                                         left,
                                                         onChange,
                                                         right
                                                     }) => {
    return (
        <div style={{display: 'flex'}}>
            <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{left} / {right}</div>
        </div>
    );
};

export default TrackProgress;