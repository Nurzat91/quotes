import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import categories from '../../Categories';

const Category = () => {
  const navigate = useNavigate();
  const { category: selectedCategoryParam } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryParam || 'all');
  const [quotes, setQuotes] = useState<string>([]);
  const [loading, setLoading] = useState(true);

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
      let fetchedQuotes = data ? Object.values(data) : [];
      console.log('1',data);
      console.log('2',fetchedQuotes);
      console.log('3',quotes);


      if (category === 'all') {
        fetchedQuotes = fetchedQuotes.filter((quote) => quote.category !== undefined);
      }

      setQuotes(fetchedQuotes);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category:string) => {
    setSelectedCategory(category);
    navigate(`/quotes/${category}`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="offcanvas offcanvas-start show" style={{ marginTop: '63px' }}>
            <div className="offcanvas-body">
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/quotes/${category.id}`}
                      onClick={() => handleCategoryClick(category.id)}
                      className={category.id === selectedCategory ? 'active' : ''}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
