import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import NewQuote from './containers/NewQuote/NewQuote';
import Quotes from './containers/Quotes/Quotes';
import Category from './components/Category/Category';

function App() {

  return (
    <>
      <header><Toolbar/></header>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="offcanvas offcanvas-start show" style={{marginTop: '63px'}}>
                <div className="offcanvas-body">
                  <Routes>
                    <Route path="/" element={<Category/>}/>
                    <Route path="*" element={<Category/>}/>
                  </Routes>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <Routes>
                <Route path="/" element={<Quotes/>}/>
                <Route path="/quotes" element={<Quotes/>}/>
                <Route path="/add-quote" element={<NewQuote/>}/>
                <Route path="/quotes/:id/edit" element={<NewQuote/>}/>
                <Route path="/all" element={<Category/>}/>
                <Route path="/quotes/star-wars" element={<Category/>}/>
                <Route path="/quotes/famous-people" element={<Category/>}/>
                <Route path="/quotes/saying" element={<Category/>}/>
                <Route path="/quotes/humour" element={<Category/>}/>
                <Route path="/quotes/motivational" element={<Category/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
