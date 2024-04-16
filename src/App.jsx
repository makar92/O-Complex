import styles from './App.module.scss'
import Cards from './components/Cards/Cards';
import Feedbacks from './components/Feedbacks/Feedbacks';
import Header from './components/Header/Header';
import ShopinCart from './components/ShopinCart/ShopinCart';

function App() {
  
  return (
    <div className={styles.app}>
      <Header className={styles.header}/>
      <Feedbacks className={styles.feedbacks}/>
      <ShopinCart className={styles.shopinCart}/>
      <Cards/>
    </div>
  );
}

export default App;
