import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Comment {
  name: string;
  email: string;
  website: string;
  content: string;
  date: string;
}

const WebSecurityAcademy = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<Comment>({
    name: "",
    email: "",
    website: "",
    content: "",
    date: new Date().toLocaleDateString(),
  });
  const [showBanner, setShowBanner] = useState(false); // New state for the banner
  const [labStatus, setLabStatus] = useState("Not solved"); // State for lab status

  // Load comments from local storage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Save comments to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // Handle form submission to add a new comment
  const handleAddComment = () => {
    if (newComment.content && newComment.name) {
      // Check if the content includes <script> tag
      if (newComment.content.includes("<script>")) {
        alert(
          "Stored XSS into HTML context with nothing encoded attack executed properly your CTF value='rootLand'",
        );
        setShowBanner(true); // Show the banner
        setLabStatus("Lab solved"); // Change lab status to solved
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
        // Hide the banner after a certain duration (optional)
        setTimeout(() => setShowBanner(false), 5000); // Hide after 5 seconds
      }
      setComments([...comments, newComment]);
      setNewComment({
        name: "",
        email: "",
        website: "",
        content: "",
        date: new Date().toLocaleDateString(),
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Banner Section */}
      {showBanner && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          You have successfully completed the Lab: Stored XSS into HTML context
          with nothing encoded.Your CTF value='rootLand'
        </div>
      )}

      {/* Header Section */}
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">SLIIT SICK</h1>
          <div className="flex items-center space-x-2">
            <span
              className={`bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded`}
            >
              {labStatus}
            </span>
          </div>
        </div>
        <nav>
          <a href="/home" className="text-blue-600 hover:underline">
            Home
          </a>
        </nav>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {product ? product.name : "Web Security Academy"}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {product
              ? product.description
              : "Stored XSS into HTML context with nothing encoded"}
          </div>
          <div className="flex items-center mt-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              LAB
            </span>
            <span className="text-sm text-muted-foreground">{labStatus}</span>
          </div>
        </CardHeader>
        <CardContent>
          <img
            src={
              product ? product.image : "/placeholder.svg?height=200&width=400"
            }
            alt={product ? product.name : "Spider Web Security"}
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <h2 className="text-xl font-semibold mb-2">
            {product ? product.name : "Spider Web Security"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {product
              ? product.description
              : "Today the President issued a red warning in relation to the breakdown of spider web security. So far all of the main banks and energy suppliers have been hit by this gang of thieves who are now on the run, believed to be making their way towards the Mexican border."}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <div className="space-y-4 mb-8">
        {comments.map((comment, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {comment.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="text-sm font-medium">{comment.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {comment.date}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Render raw HTML content using dangerouslySetInnerHTML */}
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              ></p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave a comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Write your comment here."
                  value={newComment.content}
                  onChange={(e) =>
                    setNewComment({ ...newComment, content: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={newComment.name}
                  onChange={(e) =>
                    setNewComment({ ...newComment, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Your email"
                  type="email"
                  value={newComment.email}
                  onChange={(e) =>
                    setNewComment({ ...newComment, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="Your website"
                  value={newComment.website}
                  onChange={(e) =>
                    setNewComment({ ...newComment, website: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddComment}>Post Comment</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WebSecurityAcademy;
