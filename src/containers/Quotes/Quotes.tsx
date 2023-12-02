import { useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import {PostQuote} from '../../types';


const Quotes = () => {
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<{ [key: string]: PostQuote }>({});

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

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {Object.keys(quotes).map((postKey) => {
        const post = quotes[postKey];
        return (
          <div key={postKey} className="card my-3 p-3">
            <div>
              <strong>Author</strong> {post.author}
            </div>
            <div>
              <strong>Category:</strong> {post.category}
            </div>
            <div>
              <strong>Text:</strong> {post.text}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Quotes;
