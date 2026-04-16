import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages";
import { TimePicker, CustomCalendar,
    UserForm, Confirmation
 } from "./components";

const App = () => { 
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/booking" element={<CustomCalendar />} />
                <Route path="/time-picker" element={<TimePicker />} />
                <Route path="/user-form" element={<UserForm />} />
                <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
        </BrowserRouter>
    )
}            

export default App;