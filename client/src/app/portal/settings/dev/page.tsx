'use client';

import { useState } from 'react';
import { FireWebhook, UpdateWebhook } from './actions';

export default function Dev() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleFireWebhook = async function () {
    try {
      const res = await FireWebhook();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateWebhookUrl = async function () {
    try {
      const url = inputValue + '/server/receive_webhook';
      const res = await UpdateWebhook(url);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-5">
      <button
        onClick={handleFireWebhook}
        className="bg-red-300 self-end rounded-md border border-black bg-white px-7 py-2 drop-shadow-card"
      >
        Fire webhook
      </button>
      <div>
        <p className="mb-2">Update webhook url</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="new url...(/server/receive_webhook)"
          className="border-dark w-[35rem] rounded border border-black bg-white py-2 pl-3"
        />
      </div>
      <button
        onClick={handleUpdateWebhookUrl}
        className="border-dark self-end rounded-md border border-black bg-primary px-7 py-2 drop-shadow-card"
      >
        Update url
      </button>
    </div>
  );
}
