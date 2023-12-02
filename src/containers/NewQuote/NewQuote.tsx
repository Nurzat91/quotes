import {useCallback, useEffect, useState} from 'react';
import {PostQuote} from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import axiosApi from '../../axiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import categories from '../../Categories';

const NewQuote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState('');
  const [quotes, SetQuotes] = useState<PostQuote>({
    author: '',
    category: '',
    text: '',
  });
  const param = useParams() as { id: string };

  useEffect(() => {
    const getPostData = async () => {
      try {
        if (param.id) {
          const responseData = await axiosApi.get(`/quotes/${param.id}.json`);
          if (responseData.status === 200) {
            SetQuotes(responseData.data);
            setSelectCategory(responseData.data.category);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!param.id) {
      setLoading(false);
    } else {
      void getPostData();
    }
  }, [param.id]);

  const onChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      if (name === 'category') {
        setSelectCategory(value);
      }

      SetQuotes((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (param.id) {
        await axiosApi.put(`/quotes/${param.id}.json`, quotes);
      } else {
        await axiosApi.post('quotes.json', quotes);
      }

      navigate('/quotes');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        {loading ? (
            <Spinner/>
          ) :(
          <form onSubmit={onFormSubmit}>
            <h3>{param.id ? 'Edit quote' : 'A Submit new quote'}</h3>
            <div className="form-group">
              <h6>Category</h6>
              <select
                name="category"
                value={selectCategory}
                onChange={onChanged}
              >
                <option value="" disabled>
                  Выберите категорию
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.title}</option>
                ))}
              </select>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="author" className="mb-1">
                Author
              </label>
              <input
                type="text"
                name="author"
                required
                className="form-control w-50"
                value={quotes.author}
                onChange={onChanged}
              />
            </div>
            <div className="form-group d-flex flex-column w-50 mt-3">
              <label htmlFor="text" className="mb-1">
                Quote text
              </label>
              <textarea
                className="p-2"
                name="text"
                required
                rows={5}
                cols={40}
                value={quotes.text}
                onChange={onChanged}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              {param.id ? 'UPDATE' : 'SAVE'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewQuote;