// Layout.tsx
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div className="App">
        <h1>Host Application (Layout.tsx)</h1>
        <div id="mfe" className="content-container" >
            {children}
        </div>
    </div>
);

export default Layout;