import React from 'react';
import { funti3r_backend } from 'declarations/funti3r_backend';
import Dashboard from './Pages/Dashboard';


const App = () => {
    return (
        <div>
            <Dashboard funti3r_backend={funti3r_backend} />
         
        </div>
    );
};

export default App;
