import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarr from './components/Navbar';
import Create from './components/Create';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Read from './components/Read';
import Update from './components/Update';


function App() {
    return (
        <>
            <BrowserRouter>
                <Navbarr />
                <Routes>
                    <Route path="/" exact element={<Create />} />
                    <Route path="/create" exact element={<Create />} />
                    <Route path="/read" exact element={<Read />} />
                    <Route path='/update/:userId' element={<Update />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;