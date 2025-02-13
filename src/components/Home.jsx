import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Home = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "ads"), (snapshot) => {
      const adsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAds(adsData);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Latest Ads</h2>

      {ads.length === 0 ? (
        <p className="text-center text-gray-500">No ads available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="border rounded-lg p-4 shadow-md">
              <img src={ad.image} alt={ad.title} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-2">{ad.title}</h3>
              <p className="text-gray-700">₹ {ad.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
