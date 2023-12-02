import {useCallback, useEffect, useState} from 'react';
import {PostQuote} from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';

const category = [
  {id: 1, name: 'All'},
  {id: 2, name: 'Star Wars'},
  {id: 3, name: 'Famous people'},
  {id: 4, name: 'Saying'},
  {id: 5, name: 'Humour'},
  {id: 6, name: 'Motivational'},
];
const NewQuote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState('All');
  const [quotes, SetQuotes] = useState<PostQuote>({
    author: '',
    category: '',
    text: '',
  });

  useEffect(() => {
    const postQuoteData = async () => {
      try {
        const responseData = await axiosApi.get(`/quotes.json`);
        if (responseData.status === 200) {
          SetQuotes(responseData.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }finally {
        setLoading(false);
      }
    };
    void postQuoteData();
    setLoading(false);
  }, []);

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
      await axiosApi.post('quotes.json', quotes)
      console.log('Sending data:', quotes);

      navigate('/');
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
            <h3>Submit new quote</h3>
            <div className="form-group">
              <h6>Category</h6>
              <select
                name="category"
                value={selectCategory}
                onChange={onChanged}
              >
                {category.map((categories) => (
                  <option key={categories.id} value={categories.name}>{categories.name}</option>
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
            <button type="submit" className="btn btn-primary mt-3">
              SAVE
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewQuote;