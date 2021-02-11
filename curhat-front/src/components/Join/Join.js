import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Crypto from 'crypto'
import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  useEffect(()=>{
   const a = Crypto.getDiffieHellman('modp15');
   const b=Crypto.getDiffieHellman('modp15');
   a.generateKeys();
   b.generateKeys();
   console.log(a.getPrivateKey().toString('hex'))
   console.log(b.getPrivateKey().toString('hex'))
   const asecret = a.computeSecret(b.getPublicKey(),null,'hex');
   const bsecret = b.computeSecret(a.getPublicKey(),null,'hex')
   console.log(asecret.toString('hex'))
   console.log(bsecret.toString('hex'))
  },[])
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
