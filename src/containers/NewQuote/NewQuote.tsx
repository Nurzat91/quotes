
const category = [
  {id: 1, name: 'All'},
  {id: 2, name: 'Star Wars'},
  {id: 3, name: 'Famous people'},
  {id: 4, name: 'Saying'},
  {id: 5, name: 'Humour'},
  {id: 6, name: 'Motivational'},
];
const NewQuote = () => {

  return (
    <div className="row mt-2">
      <div className="col">
        <form>
          <h3>Submit new quote</h3>
          <div className="form-group">
            <h6>Category</h6>
            <select>
              {category.map((categories) => (
                <option key={categories.id}>{categories.name}</option>
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
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewQuote;