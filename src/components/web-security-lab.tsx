import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Step 1: Import useNavigate
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BeakerIcon, CheckIcon } from "@heroicons/react/24/solid";

export default function Lab() {  
  const navigate = useNavigate(); // Step 2: Initialize useNavigate

  const labs = [
    {
      title: "Cross-site scripting",
      exercises: [
        {
          name: "Reflected XSS into HTML context with nothing encoded",
          description: "This lab contains a simple reflected cross-site scripting vulnerability in the search functionality.",
          solution: [
            "Copy and paste the following into the search box:",
            "<script>alert(1)</script>",
            "Click \"Search\".",
          ],
        },
        {
          name: "Stored XSS into HTML context with nothing encoded",
          description: "This lab contains a stored cross-site scripting vulnerability in the comment functionality.",
          solution: [
            "Enter the following into the comment box:",
            "<script>alert(1)</script>",
            "Enter a name, email and website.",
            "Click \"Post comment\".",
            "Go back to the blog.",
          ],
        },
      ],
    },
    {
      title: "SQL injection",
      exercises: [
        {
          name: "SQL injection vulnerability allowing login bypass",
          description: "This lab contains a SQL injection vulnerability in the login function.",
          solution: [
            "Click on the Login Button",
            <>
              Modify the 
              <code className="bg-gray-500 text-white px-2 py-1 rounded-md font-mono">
                username
              </code> parameter, giving it the value: 
              <code className="bg-gray-500 text-white px-2 py-1 rounded-md font-mono">
                administrator'--
              </code>
            </>,
          ],
        },
      ],
    }
    
    
    
    ,
  ];

  return (
    <div className="container mx-auto p-4">
        <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold">SLIIT SICK</h1>
            <div className="flex items-center space-x-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">LAB</span>
            <span className="text-sm text-gray-500">Not solved</span>
            </div>
            <Link to="/login"><button className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
            Login
            </button></Link>
        </div>
        
        </header>
      <h1 className="text-2xl font-bold mb-6">Web Security Labs</h1>
      <Tabs defaultValue="cross-site-scripting" className="w-full">
        <TabsList>
          {labs.map((lab, index) => (
            <TabsTrigger key={index} value={lab.title.toLowerCase().replace(/\s+/g, '-')}>
              {lab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {labs.map((lab, labIndex) => (
          <TabsContent key={labIndex} value={lab.title.toLowerCase().replace(/\s+/g, '-')}>
            {lab.exercises.map((exercise, exerciseIndex) => (
              <Card key={exerciseIndex} className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BeakerIcon className="h-6 w-6 text-blue-500" />
                      <CardTitle>{exercise.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">APPRENTICE</Badge>
                      <Badge variant="success" className="bg-green-500">
                        <CheckIcon className="h-4 w-4 mr-1" />
                        Solved
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{exercise.description}</CardDescription>
                  {exercise.sqlQuery && (
                    <pre className="bg-gray-100 p-2 rounded-md mb-4 overflow-x-auto">
                      <code>{exercise.sqlQuery}</code>
                    </pre>
                  )}
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList>
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="solution">Solution</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description">
                      <p>{exercise.description}</p>
                    </TabsContent>
                    <TabsContent value="solution">
                      <ol className="list-decimal list-inside space-y-2">
                        {exercise.solution.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ol>
                    </TabsContent>
                  </Tabs>
                  <Button className="mt-4" onClick={() => navigate("/home")}>Access the Lab</Button> {/* Navigate to /home */}
                </CardContent>
              </Card>
            ))}  
          </TabsContent>
        ))}  
      </Tabs>
    </div>
  );
}
