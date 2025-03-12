import { Routes, Route } from 'react-router';
import './App.scss'
// import Slider from '../slider/Slider'
import MainPage from '../main-page/MainPage'
import { SearchPage } from '../Pages/SearchPage/SearchPage';
import { AboutPage } from '../Pages/AboutPage/AboutPage';
import { Layout } from '../Template/Layout';


function App() {
  return (
    <>
    <Layout />
    <Routes>
      <Route path='/'>
        <Route index path='/' element={<MainPage />}/>
        <Route path='search' element={<SearchPage />}/>
        <Route path='about' element={<AboutPage />}/>
      </Route>
      </Routes>
      {/* <Header /> */}
      {/* <Slider /> */}
      {/* <MainPage /> */}
    </>
  )
}

export default App;
