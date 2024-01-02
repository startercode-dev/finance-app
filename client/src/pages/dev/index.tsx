import Nav from '@/components/Nav';
import { useState } from 'react';

export default function Dev() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleUpdateWebhookUrl = async function () {
    try {
      const val = inputValue + '/server/receive_webhook';
      await fetch('/api/update-webhook', {
        method: 'POST',
        body: JSON.stringify({
          newUrl: val,
        }),
      });
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleFireWebhook = async function () {
    try {
      await fetch('/api/fire-webhook', {
        method: 'POST',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center gap-5">
        <button
          onClick={handleFireWebhook}
          className="self-end rounded-md px-7 py-2 border border-dark bg-red-300"
        >
          Fire webhook
        </button>
        <div>
          <p>Update webhook url</p>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="new url...(/server/receive_webhook)"
            className="border border-dark rounded pl-3 py-2 w-[35rem]"
          />
        </div>
        <button
          onClick={handleUpdateWebhookUrl}
          className="self-end rounded-md px-7 py-2 border border-dark bg-emerald-300"
        >
          Update url
        </button>
      </div>
    </>
  );
}
