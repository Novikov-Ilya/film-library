import { Routes, Route } from 'react-router';
import './App.scss'
// import Slider from '../slider/Slider'
import MainPage from '../main-page/MainPage.tsx'
import { SearchPage } from '../Pages/SearchPage/SearchPage.tsx';
import { AboutPage } from '../Pages/AboutPage/AboutPage.tsx';
import { Layout } from '../Template/Layout.tsx';


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
