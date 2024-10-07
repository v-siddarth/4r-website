import React, { useEffect, useState } from 'react';
import { ChannelList, SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from '@clerk/clerk-react';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState('');
  const [channelUrl, setChannelUrl] = useState(null);

  useEffect(() => {
    if (user) {
      const id = (user.primaryEmailAddress?.emailAddress).split('@')[0];
      setUserId(id);
    } else {
      console.warn("User not found");
    }
  }, [user]);

  if (!userId) {
    return <div>Loading...</div>; // or return a loading spinner
  }

  return (
    <div>
      <div style={{ width: '100%', height: '500px' }}>
        <SendBirdProvider
          appId={import.meta.env.VITE_SENDBIRD_APP_ID}
          userId={userId}
          nickname={user?.fullName}
          profileUrl={user?.imageUrl}
          allowProfileEdit={true}
        >
          <div className='grid grid-cols-1 gap-5 md:grid-cols-3 h-full'>
            {/* Channel List */}
            <div className='p-5 border shadow-lg'>
              <GroupChannelList
                onChannelSelect={(channel) => {
                  setChannelUrl(channel?.url);
                }}
                channelListQueryParams={{
                  includeEmpty: true,
                }}
              />
            </div>
            {/* Channel / Message Area */}
            <div className='md:col-span-2 shadow-lg'>
              {channelUrl ? (
                <GroupChannel channelUrl={channelUrl} />
              ) : (
                <div>Select a channel to view messages</div>
              )}
            </div>
          </div>
        </SendBirdProvider>
      </div>
    </div>
  );
}

export default Inbox;
