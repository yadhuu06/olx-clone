import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const PostAd = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  // Function to convert image file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // Base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Image = await convertToBase64(file);
        setImage(base64Image);
      } catch (error) {
        console.error("Error converting image:", error);
        alert("Failed to process image.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to post an ad.");
    if (!image) return alert("Please select an image.");
    setIsPosting(true);

    try {
      await addDoc(collection(db, "ads"), {
        title,
        price,
        image, // Storing the Base64 image string
        userId: user.uid,
        createdAt: new Date(),
      });

      alert("Ad posted successfully!");
      setTitle("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("Error posting ad:", error);
      alert("Something went wrong.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Post an Ad</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          onChange={handleImageChange}
          required
          accept="image/*"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-full h-32 object-cover mt-2 rounded-lg"
          />
        )}
        <button
          type="submit"
          disabled={isPosting}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          {isPosting ? "Posting..." : "Post Ad"}
        </button>
      </form>
    </div>
  );
};

export default PostAd;
