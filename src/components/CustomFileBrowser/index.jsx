import React from 'react';
import { MyFileBrowser } from './Components/MyFileBrowser';

const CustomFileBrowser = () => {
    const files = [
        { id: 'lht', name: 'Projects', isDir: true },
        {
            id: 'mcd',
            name: 'chonky-sphere-v2.png',
            thumbnailUrl: 'https://chonky.io/chonky-sphere-v2.png',
        },
    ];
    const folderChain = [{ id: 'xcv', name: 'Demo', isDir: true }];
    return (
        <div className="story-wrapper">
        <div className="story-description">
            <MyFileBrowser />
        </div>
    </div>
    );
};

export default CustomFileBrowser;