import { Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './Products/Products'
import Markdown from './Markdown/Markdown'
import Forms from './Forms/Forms'
import Nested from './Nested/Nested'
import Dragndrop from './Dragndrop/Dragndrop';
import Users from './Users/Users';
import User from './Users/User';
import NotFound from './NotFound/NotFound';
import PageBuilder from './PageBuilder/PageBuilder';
import UBoard from './UBoard/UBoard';
import Invite from './Invite/Invite';
import Layout from './Layout/Layout';

function App() {

  return (
    <div>
      <main id='app'>
        <Routes>
        <Route exact path='*' element={<NotFound />} />
          <Route path='/home' element={<Layout />}>
            <Route exact path='markdown' element={<Markdown />} />
            <Route exact path='nested' element={<Nested />} />
            <Route exact path='photos' element={<Products />} />
            <Route exact path='dragndrop' element={<Dragndrop />} />
            <Route exact path='users' element={<Users />} />
            <Route exact path='uboard' element={<UBoard />} />
            <Route exact path='pagebuilder' element={<PageBuilder />} />
            <Route exact path='invite' element={<Invite />} />
            <Route exact path='users/user/:id' element={<User />} />
          </Route>
          <Route path='/' element={<Forms />} />
        </Routes>
      </main>
    </div>

  );
}

export default App;
