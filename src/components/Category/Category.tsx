import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import categories from '../../Categories';
import Spinner from '../Spinner/Spinner';
import { PostQuote } from '../../types';

const Category = () => {
  const { category: selectedCategoryParam } = useParams();
  const [quotes, setQuotes] = useState<PostQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryParam || 'all');

  useEffect(() => {
    void getQuotes(selectedCategory);
  }, [selectedCategory]);

  const getQuotes = async (category: string) => {
    let url = '/quotes.json';
    if (category !== 'all') {
      url += `?orderBy="category"&equalTo="${category}"`;
    }

    try {
      const response = await axiosApi.get(url);
      const data = response.data;
      setQuotes(data ? Object.values(data) : []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="offcanvas offcanvas-start show" style={{ marginTop: '63px' }}>
            <div className="offcanvas-body">
              <ul style={{listStyle: 'none'}}>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link to={`/quotes/${category.id}`}>
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {loading ? (
            <Spinner />
          ) : (
            <div>
              <ul style={{listStyle: 'none'}}>
                {quotes.map((quote, index) => (
                  <li key={index}>
                    <h2>{quote.category}</h2>
                    <div>{quote.text}</div>
                    <div><strong>Author: </strong> {quote.author}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
