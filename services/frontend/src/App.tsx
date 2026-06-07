import { useState } from 'react';
import './App.css';
import GatePage from './pages/GatePage';
import MainSite from './pages/MainSite';

export default function App() {
  const [guestName, setGuestName] = useState<string | null>(
    () => localStorage.getItem('wedding_guest_name')
  );

  const handleAuthenticated = (name: string) => {
    localStorage.setItem('wedding_guest_name', name);
    setGuestName(name);
  };

  if (!guestName) {
    return <GatePage onAuthenticated={handleAuthenticated} />;
  }

  return <MainSite guestName={guestName} />;
}
