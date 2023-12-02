import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import All from './containers/All/All';
import NewQuote from './containers/NewQuote/NewQuote';
import Quotes from './containers/Quotes/Quotes';

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
                    <Route path="/" element={<All/>}/>
                    <Route path="*" element={<All/>}/>
                  </Routes>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <Routes>
                <Route path="/quotes" element={<Quotes/>}/>
                <Route path="/add-quote" element={<NewQuote/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
