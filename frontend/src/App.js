import { BrowserRouter, Routes, Route } from 'react-router';
import Lesson from './pages/Lesson';
import Home from './pages/Home';


// The main component for the multi-page app
export default function App() {
    return ( <div>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} /> 
                <Route exact path='/lesson' element={<Lesson />} />
            </Routes>
        </BrowserRouter>
    </div> );
}
