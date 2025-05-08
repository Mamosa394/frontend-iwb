import "../styles/querylist.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const QueryList = () => {
  const [queries, setQueries] = useState([]);
  const [editMode, setEditMode] = useState(true); // Toggle for read/write privileges

  const fetchQueries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/client-queries');
      setQueries(res.data);
    } catch (err) {
      console.error('Failed to fetch queries:', err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/client-queries/${id}`, { status: newStatus });
      fetchQueries(); // Refresh list
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const deleteQuery = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/client-queries/${id}`);
      setQueries(prev => prev.filter(q => q._id !== id));
    } catch (err) {
      console.error('Failed to delete query:', err);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div className="query-list">
      <Header />

      <h2 className="heading">Client Queries</h2>
      <button onClick={() => setEditMode(!editMode)} className="toggle-btn">
        Toggle {editMode ? 'Read-Only' : 'Edit'} Mode
      </button>
      <div className="query-table">
        {queries.length === 0 ? (
          <p>No queries found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
                {editMode && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {queries.map(query => (
                <tr key={query._id}>
                  <td>{query.name}</td>
                  <td>{query.email}</td>
                  <td>{query.message}</td>
                  <td>{query.status}</td>
                  {editMode && (
                    <td>
                      <select
                        value={query.status}
                        onChange={(e) => updateStatus(query._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="complete">Complete</option>
                      </select>
                      <button onClick={() => deleteQuery(query._id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default QueryList;
