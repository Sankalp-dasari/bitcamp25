import React from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Jane Smith",
      role: "Project Manager",
      email: "jane.smith@company.com",
      linkedin: "https://linkedin.com/in/janesmith",
      image: "/api/placeholder/150/150"
    },
    {
      id: 2,
      name: "John Doe",
      role: "Lead Developer",
      email: "john.doe@company.com",
      linkedin: "https://linkedin.com/in/johndoe",
      image: "/api/placeholder/150/150"
    },
    {
      id: 3,
      name: "Alex Johnson",
      role: "UX Designer",
      email: "alex.johnson@company.com",
      linkedin: "https://linkedin.com/in/alexjohnson",
      image: "/api/placeholder/150/150"
    },
    {
      id: 4,
      name: "Sam Wilson",
      role: "Marketing Specialist",
      email: "sam.wilson@company.com",
      linkedin: "https://linkedin.com/in/samwilson",
      image: "/api/placeholder/150/150"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Meet Our Team</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div 
            key={member.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
          >
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-600 mb-2">{member.role}</p>
            
            <div className="mt-4 flex flex-col w-full">
              <a 
                href={`mailto:${member.email}`}
                className="flex items-center justify-center gap-2 bg-blue-100 text-blue-800 py-2 px-4 rounded-md mb-2 hover:bg-blue-200 transition-colors"
              >
                <FaEnvelope className="text-blue-600" />
                <span>{member.email}</span>
              </a>
              
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                <FaLinkedin />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;