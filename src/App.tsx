import './App.css';

import React, { useCallback, useEffect } from 'react';
import { AiOutlineCloseCircle, AiOutlineDownCircle, AiOutlineMessage } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { loadList } from './features';
import { RootState } from './store';

function App() {
  const issueList = useSelector((state: RootState) => state.list.issueList);
  const dispatch = useDispatch();

  const fetchIssueList = useCallback(async () => {
    let response = await fetch(
      "https://api.github.com/repos/facebook/create-react-app/issues"
    );

    let data = await response.json();
    dispatch(loadList(data));
  }, [dispatch]);

  useEffect(() => {
    fetchIssueList();
  }, [fetchIssueList]);

  return (
    <main>
      <ul className="w-9/12 mx-auto my-10">
        {issueList.map((item) => (
          <li
            key={item.number}
            className="flex items-center justify-between p-4 border border-gray-300 border-b-0 last:border-b first:rounded-t-lg last:rounded-b-lg"
          >
            <div className="w-11/12">
              <h3 className="text-base font-bold text-gray-900  flex items-center gap-1 mb-1">
                <span>
                  {item.state === "open" ? (
                    <AiOutlineDownCircle className="text-green-600" size={24} />
                  ) : (
                    <AiOutlineCloseCircle className="text-gray-500" size={24} />
                  )}
                </span>
                <span className="truncate">{item.title}</span>
              </h3>
              <div className="flex gap-2 ml-7">
                <p className="text-xs text-gray-400">#{item.number}</p>
                <p className="text-xs text-gray-400">{item.created_at}</p>
              </div>
            </div>
            <p className="text-xs min-w-50px text-gray-400 flex items-center gap-1">
              <AiOutlineMessage size={16} />
              {item.comments}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
