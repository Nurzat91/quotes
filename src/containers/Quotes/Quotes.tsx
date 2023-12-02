import { useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import { PostQuote } from '../../types';
import btnDelete from '../../assets/btnDelete.svg';
import btnEdit from '../../assets/btnEdit.svg';
import { useNavigate } from 'react-router-dom';

const Quotes = () => {
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<{ [key: string]: PostQuote }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const getQuotesData = async () => {
      try {
        const responseData = await axiosApi.get('quotes.json');
        if (responseData.status !== 200) {
          throw new Error('ERROR ' + responseData.status);
        }
        setQuotes(responseData.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    void getQuotesData();
  }, []);

  const editPost = (postKey: string) => {

    navigate(`/quotes/${postKey}/edit`, {
      state: { quotes },
    });
  };

  const deletePost = async (postKey: string) => {
    try {
      await axiosApi.delete(`/quotes/${postKey}.json`);

      const updatedQuotes = { ...quotes };
      delete updatedQuotes[postKey];
      setQuotes(updatedQuotes);

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(quotes).map((postKey) => {
            const post = quotes[postKey];
            return (
              <div key={postKey} id={postKey} className="card my-3 p-3 w-75">
                <div>
                  <strong>Category: </strong> {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </div>
                <div className="d-flex flex-row my-3">
                  <div className="w-75 me-3"><strong>Text: </strong>"{post.text}"</div>
                  <div>
                    <button className="m-3" type="button" onClick={() => editPost(postKey)}>
                      <img src={btnEdit} alt="btn Edit" />
                    </button>
                    <button type="button" onClick={() => deletePost(postKey)}>
                      <img src={btnDelete} alt="btn Delete" />
                    </button>
                  </div>
                </div>
                <div>
                  <strong>Author: </strong> {post.author}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Quotes;
