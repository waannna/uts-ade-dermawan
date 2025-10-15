import { ShoppingBag, Heart, Info, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import phone from "../Data/phone.json";

function Card({ data = phone, AddCart }) {
    const [isLiked, setIsLiked] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState("");

    const handleLike = (id) => {
        setIsLiked((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleInfo = (item) => {
        setSelectedProduct(item);
    };

    const handleCloseInfo = () => {
        setSelectedProduct(null);
        setNewComment("");
    };

    const handleCart = (item) => {
        if (AddCart) AddCart(item);
    };

    const handleCommentSubmit = (id, e) => {
        e.preventDefault();
        if (newComment.trim() === "") return;
        
        setComments((prev) => ({
            ...prev,
            [id]: [...(prev[id] || []), newComment],
        }));
        setNewComment("");
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item) => (
                    <div 
                        key={item.id} 
                        className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 
                                  transition-all duration-300 
                                  hover:shadow-xl hover:border-blue-500 hover:transform hover:-translate-y-1"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-white mb-2">
                                {item.name}
                            </h3>
                            <h4 className="text-2xl font-bold text-blue-400 mb-4">
                                {item.price}
                            </h4>

                            <div className="flex justify-between items-center">
                                <div className="flex space-x-2">
                                    <button 
                                        className="p-2 bg-gray-700 rounded-lg transition-all duration-300 
                                                  hover:bg-blue-600 hover:scale-110 transform"
                                        onClick={() => handleInfo(item)}
                                    >
                                        <Info className="h-5 w-5 text-blue-400 hover:text-white" />
                                    </button>
                                    <button 
                                        className="p-2 bg-gray-700 rounded-lg transition-all duration-300 
                                                  hover:bg-green-600 hover:scale-110 transform"
                                        onClick={() => handleInfo(item)}
                                    >
                                        <MessageSquare className="h-5 w-5 text-green-400 hover:text-white" />
                                    </button>
                                    <button 
                                        className={`p-2 rounded-lg transition-all duration-300 transform
                                                  ${isLiked[item.id] 
                                                    ? 'bg-red-500 scale-110' 
                                                    : 'bg-gray-700 hover:bg-red-500 hover:scale-110'}`}
                                        onClick={() => handleLike(item.id)}
                                    >
                                        <Heart className={`h-5 w-5 ${isLiked[item.id] ? 'text-white fill-current' : 'text-red-400'}`} />
                                    </button>
                                </div>
                                <button 
                                    className="p-2 bg-blue-600 rounded-lg transition-all duration-300 
                                              hover:bg-blue-500 hover:scale-110 transform"
                                    onClick={() => handleCart(item)}
                                >
                                    <ShoppingBag className="h-5 w-5 text-white" />
                                </button>
                            </div>

                            {comments[item.id] && comments[item.id].length > 0 && (
                                <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                                    <h5 className="font-semibold text-white mb-2">Komentar:</h5>
                                    {comments[item.id].map((cmt, i) => (
                                        <p key={i} className="text-gray-300 text-sm mb-1 last:mb-0">
                                            {cmt}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Info Produk */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-white">Detail Produk</h2>
                                <button
                                    onClick={handleCloseInfo}
                                    className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-1 transition-colors duration-300"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-64 object-cover rounded-lg mb-4 border border-gray-600"
                            />
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {selectedProduct.name}
                            </h3>
                            <p className="text-gray-300 mb-2">
                                <span className="font-semibold">Brand:</span> {selectedProduct.brand}
                            </p>
                            <h4 className="text-3xl font-bold text-blue-400 mb-4">
                                {selectedProduct.price}
                            </h4>
                            <p className="text-gray-300 mb-6">
                                {selectedProduct.description}
                            </p>

                            {/* Form Komentar */}
                            <div className="mb-6">
                                <h5 className="font-semibold text-white mb-3 text-lg">
                                    Tambah Komentar:
                                </h5>
                                <form
                                    onSubmit={(e) => handleCommentSubmit(selectedProduct.id, e)}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Tulis komentar..."
                                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                                                 text-white placeholder-gray-400 focus:outline-none 
                                                 focus:border-blue-500 transition-colors duration-300"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                                                 transition-colors duration-300 
                                                 hover:bg-blue-500 font-semibold"
                                    >
                                        Kirim
                                    </button>
                                </form>
                            </div>

                            {/* Komentar yang sudah ada */}
                            {comments[selectedProduct.id] && comments[selectedProduct.id].length > 0 && (
                                <div className="mb-6">
                                    <h5 className="font-semibold text-white mb-3 text-lg">Komentar:</h5>
                                    <div className="space-y-3">
                                        {comments[selectedProduct.id].map((cmt, i) => (
                                            <div key={i} className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                                                <p className="text-gray-300">
                                                    {cmt}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-center">
                                <button 
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg 
                                             transition-colors duration-300 
                                             hover:bg-blue-500 font-semibold hover:scale-105 transform"
                                    onClick={() => {
                                        handleCart(selectedProduct);
                                        handleCloseInfo();
                                    }}
                                >
                                    <ShoppingBag className="h-5 w-5" />
                                    Tambah ke Keranjang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Card;