'use client'

import ConnectComponent from './components/Connect';
import { useState } from 'react'
import './home.css';

const ConnectedView = () => (
  <div>
    <p>Home Page</p>
    <h1>We're in guys!</h1>
  </div>
);

const NotConnectedView = ({ onConnect }: { onConnect: () => void }) => (
  <div>
    <h1>Welcome to the future of Web3 Connectivity with Immutable</h1>
    <div className="centered">
      <ConnectComponent onConnect={onConnect} />
    </div>
  </div>
);

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  return (
    <div className="centered">
      {isConnected ? <ConnectedView /> : <NotConnectedView onConnect={() => setIsConnected(true)} />}
    </div>
  );
}