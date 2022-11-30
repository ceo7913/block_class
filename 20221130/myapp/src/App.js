
import './App.css';
import AppleShop from './components/AppleShop';
import useWeb3 from './hooks/useWeb3';


function App() {
  // 커스텀 훅에서 web3, account 가져오고
  const [web3,account] = useWeb3();
  if(!account) return <h1>메타마스크를 연결해주세요</h1>
  return (
    <div className="App">
      <h2>사과 앱</h2>
      <AppleShop web3={web3} account={account}/>
    </div>
  );
}

export default App;
