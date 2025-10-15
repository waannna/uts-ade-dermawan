import Header from "./Component/Header";
import Card from "./Component/Card";
import Footer from "./Component/Footer";
import phone from "./Data/phone.json";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header>
        <Header />
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-end items-center mb-6">
          <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer border border-gray-600">
            <ShoppingBag className="h-5 w-5 mr-2" />
            <span className="font-medium">Keranjang</span>
            <span className="ml-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {cartCount}
            </span>
          </div>
        </div>
        
        <div className="mb-12 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          <img 
            src="https://asset-2.tribunnews.com/jogja/foto/bank/images/Apple-authorized-reseller-original-Indonesia-siap-menyambut-iPhone-15.jpg" 
            alt="iphone 15 pro max" 
            className="w-full h-64 object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Daftar Produk
        </h1>

        <Card data={phone} AddCart={handleAddToCart} />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;