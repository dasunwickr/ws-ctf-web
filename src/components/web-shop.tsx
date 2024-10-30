import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";

// Define a type for the product
interface Product {
  name: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  category: string; // Added category field
}

export default function WebShop() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all"); // State for active category
  const [showBanner, setShowBanner] = useState(false); // State for the banner
  const [labStatus, setLabStatus] = useState("Not solved"); // State for lab status

  // Sample product data with categories
  const products: Product[] = [
    {
      name: "Hand Bag",
      price: 40.41,
      rating: 4,
      description: "A stylish and convenient handbag to complement any outfit.",
      image: "/images/1.jpg",
      category: "accessories",
    },
    {
      name: "Lady shoes",
      price: 39.35,
      rating: 2,
      description: "Elegant shoes for women to make a fashion statement.",
      image: "/src/images/2.avif",
      category: "pets",
    },
    {
      name: "Bracelet",
      price: 83.77,
      rating: 3,
      description: "A beautiful bracelet to enhance your wristwear collection.",
      image: "/src/images/3.jpg",
      category: "corporate",
    },
    {
      name: "Necklace",
      price: 59.94,
      rating: 4,
      description: "An exquisite necklace to elevate your style.",
      image: "/src/images/4.jpg",
      category: "tech",
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleSearch = () => {
    const searchResult = searchTerm.trim();

    // Check if the search term includes a script tag
    if (searchResult.includes("<script>")) {
      alert(
        "Reflected XSS into HTML context with nothing encoded. Your CTF value='betaLand' ",
      );
      setShowBanner(true);
      setLabStatus("Lab solved");

      // Hide the banner after 5 seconds
      setTimeout(() => setShowBanner(false), 5000);
    } else {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchResult.toLowerCase()) &&
          (activeCategory === "all" || product.category === activeCategory), // Apply category filter
      );
      setFilteredProducts(results);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    const filtered =
      category === "all"
        ? products
        : products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner Section */}
      {showBanner && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          You have successfully completed the Lab: Stored XSS into HTML context
          with nothing encoded. Your CTF value='betaLand'
        </div>
      )}

      {/* Header Section */}
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">SLIIT SICK</h1>
          <div className="flex items-center space-x-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {labStatus}
            </span>
          </div>
          <Link to="/login">
            <button className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
              Login
            </button>
          </Link>
        </div>
        <nav className="mt-4">
          <a href="/" className="text-blue-600 hover:underline">
            Back
          </a>
        </nav>
      </header>

      <main>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">BUBBLE</h2>
          <div className="flex justify-center items-center">
            <span className="text-5xl font-bold text-yellow-600">MART</span>
            <ShoppingBag className="w-12 h-12 ml-2 text-red-600" />
          </div>
        </div>

        <div className="mb-4 flex">
          <Input
            type="search"
            placeholder="Search..."
            className="max-w-sm flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch} className="ml-2">
            Search
          </Button>
        </div>

        <div className="mb-4 text-center">
          <span>Search term: {searchTerm}</span>
        </div>

        {/* Tabs for Category Filter */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-muted p-1 rounded-md">
            <TabsTrigger
              value="all"
              onClick={() => handleCategoryChange("all")}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="accessories"
              onClick={() => handleCategoryChange("accessories")}
            >
              Accessories
            </TabsTrigger>
            <TabsTrigger
              value="corporate"
              onClick={() => handleCategoryChange("corporate")}
            >
              Corporate gifts
            </TabsTrigger>
            <TabsTrigger
              value="pets"
              onClick={() => handleCategoryChange("pets")}
            >
              Pets
            </TabsTrigger>
            <TabsTrigger
              value="tech"
              onClick={() => handleCategoryChange("tech")}
            >
              Tech gifts
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-4 object-cover w-full h-32 rounded-md"
                  />
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < product.rating ? "text-yellow-300" : "text-gray-300"}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() =>
                      navigate("/sliit-sick", { state: { product } })
                    }
                  >
                    View details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
