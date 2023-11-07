import Header from './components/ui/header/header'
import Footer from './components/ui/footer/footer'
import Home from './pages/home/home'
import Login from '../src/pages/login/login'
import Perfil from '../src/pages/profile/profile'
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import FaleConosco from './pages/faleconosco/faleconosco'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from '../src/pages/register/register'
import ModalDefaultRegister from './pages/mockModal/modal'
import RecipeList from './pages/recipeList/recipeList'
import ModalDefault from './pages/recipe/recipe/recipe'
import PerfilEditar from '../src/pages/profile/editProfile'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/fale-conosco"
          element={
            <>
              <Header />
              <FaleConosco />
              <Footer />
            </>
          }
        />
        <Route
          path="/perfil"
          element={
            <>
              <Header />
              <Perfil />
            </>
          }
        />
        <Route
          path="/perfil/editar"
          element={
            <>
              <Header />
              <PerfilEditar />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/modalReceita" element={<ModalDefault />} />
        <Route
          path="/receitas"
          element={
            <>
              <Header />
              <RecipeList />
              <Footer />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="/modal" element={<ModalDefaultRegister />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
