export const Filter = ({ filter, handleChange }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={event => handleChange(event.target.value)}
      />
    </>
  );
};
